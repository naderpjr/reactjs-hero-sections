import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uIntensity;
  uniform vec2 uImageAspect;   // image width / height
  uniform vec2 uPlaneAspect;   // plane (screen) width / height

  varying vec2 vUv;

  // Cover UV calculation (no stretch)
  vec2 getCoverUV(vec2 uv) {
    float planeRatio = uPlaneAspect.x / uPlaneAspect.y;
    float imageRatio = uImageAspect.x / uImageAspect.y;

    vec2 ratio = vec2(
      min(planeRatio / imageRatio, 1.0),
      min(imageRatio / planeRatio, 1.0)
    );

    return (uv - 0.5) * ratio + 0.5;
  }

  void main() {
    vec2 uv = getCoverUV(vUv);

    // Distance from mouse
    float dist = distance(vUv, uMouse);

    // Only distort when intensity > 0
    float strength = uIntensity * smoothstep(0.38, 0.0, dist);

    // Liquid waves (only active when strength is high)
    float wave1 = sin(dist * 22.0 - uTime * 3.2) * 0.013 * strength;
    float wave2 = sin(dist * 16.0 - uTime * 2.1) * 0.009 * strength;
    float wave3 = cos(dist * 28.0 - uTime * 3.8) * 0.006 * strength;

    vec2 distortion = vec2(wave1 + wave3, wave2 - wave1 * 0.55);

    // Apply distortion only where needed
    vec2 distortedUv = uv + distortion * step(0.001, strength);

    vec4 color = texture2D(uTexture, distortedUv);

    // Soft vignette
    float vignette = smoothstep(1.35, 0.45, length(vUv - 0.5));
    color.rgb *= mix(0.88, 1.0, vignette);

    gl_FragColor = color;
  }
`;

function LiquidPlane() {
    const materialRef = useRef();
    const { viewport } = useThree();

    const mouse = useRef(new THREE.Vector2(0.5, 0.5));
    const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
    const intensity = useRef(0);
    const lastMoveTime = useRef(0);
    const prevMouse = useRef(new THREE.Vector2(0.5, 0.5));

    
    const { texture, imageAspect } = useMemo(() => {
        const loader = new THREE.TextureLoader();
        const tex = loader.load("/architecture.jpg");
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;

        let aspect = new THREE.Vector2(16 / 9, 1);

        tex.image && (aspect = new THREE.Vector2(tex.image.width, tex.image.height));

        tex.onUpdate = () => {
            if (tex.image) {
                aspect.set(tex.image.width, tex.image.height);
            }
        };

        return { texture: tex, imageAspect: aspect };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX / window.innerWidth;
            const y = 1.0 - e.clientY / window.innerHeight;

            targetMouse.current.set(x, y);
            lastMoveTime.current = performance.now();
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame((state) => {
        if (!materialRef.current) return;

        const now = performance.now();
        const timeSinceMove = now - lastMoveTime.current;

        const velocity = targetMouse.current.distanceTo(prevMouse.current);
        prevMouse.current.copy(targetMouse.current);

        let targetIntensity = 0;
        if (timeSinceMove < 80 && velocity > 0.0008) {
            targetIntensity = 1.0;
        }

        mouse.current.lerp(targetMouse.current, 0.09);

        if (targetIntensity === 0) {
            intensity.current *= 0.88; 
        } else {
            intensity.current += (targetIntensity - intensity.current) * 0.12;
        }

        if (intensity.current < 0.01) intensity.current = 0;

        materialRef.current.uniforms.uMouse.value.copy(mouse.current);
        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        materialRef.current.uniforms.uIntensity.value = intensity.current;
        materialRef.current.uniforms.uImageAspect.value.copy(imageAspect);
        materialRef.current.uniforms.uPlaneAspect.value.set(
            viewport.width,
            viewport.height
        );
    });

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    uTexture: { value: texture },
                    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
                    uTime: { value: 0 },
                    uIntensity: { value: 0 },
                    uImageAspect: { value: new THREE.Vector2(16 / 9, 1) },
                    uPlaneAspect: { value: new THREE.Vector2(1, 1) },
                }}
            />
        </mesh>
    );
}

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 1], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false }}
            style={{ width: "100%", height: "100%" }}
        >
            <LiquidPlane />
        </Canvas>
    );
}