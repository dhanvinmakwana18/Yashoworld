import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeroCanvasProps {
  isDarkTheme?: boolean;
}

export const ThreeHeroCanvas: React.FC<ThreeHeroCanvasProps> = ({ isDarkTheme = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(isDarkTheme ? 0x221c18 : 0xfff5ea, 1.8);
    scene.add(ambientLight);

    const goldLight = new THREE.DirectionalLight(0xd4af37, 2.5);
    goldLight.position.set(5, 5, 5);
    scene.add(goldLight);

    const softFill = new THREE.DirectionalLight(0xe8d8c4, 1.2);
    softFill.position.set(-5, -3, 2);
    scene.add(softFill);

    const pointLight = new THREE.PointLight(0xfff0dd, 2, 10);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    // Group for 3D resin sculpture
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Outer Glass Resin Frame (Hexagonal / Arch Crystal Slab)
    const resinGeometry = new THREE.CylinderGeometry(2.2, 2.2, 0.8, 6);
    // Rotate to lie as a block facing camera
    resinGeometry.rotateX(Math.PI / 2);

    const resinMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      metalness: 0.05,
      ior: 1.52,
      thickness: 1.5,
      specularIntensity: 1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    const resinMesh = new THREE.Mesh(resinGeometry, resinMaterial);
    mainGroup.add(resinMesh);

    // Inner Flowers & Botanical Elements Group
    const floraGroup = new THREE.Group();

    // Central Dried Rose Sculpture
    const roseStemGeo = new THREE.CylinderGeometry(0.04, 0.05, 1.2, 8);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x4a5d3f, roughness: 0.7 });
    const stemMesh = new THREE.Mesh(roseStemGeo, stemMat);
    stemMesh.position.set(0, -0.4, 0);
    floraGroup.add(stemMesh);

    // Rose Petals Layering
    const petalColors = [0xb83b5e, 0x900c3f, 0xc70039, 0xe85a71, 0xeb96a6];
    const petalGeo = new THREE.SphereGeometry(0.35, 16, 16);
    petalGeo.scale(1, 0.5, 1.2);

    for (let i = 0; i < 14; i++) {
      const petalMat = new THREE.MeshStandardMaterial({
        color: petalColors[i % petalColors.length],
        roughness: 0.4,
        metalness: 0.1,
      });
      const petal = new THREE.Mesh(petalGeo, petalMat);
      const angle = (i / 14) * Math.PI * 2;
      const radius = 0.2 + (i % 3) * 0.1;
      petal.position.set(Math.cos(angle) * radius, 0.2 + (i * 0.03), Math.sin(angle) * radius);
      petal.rotation.set(Math.PI * 0.2 + (i * 0.1), angle, Math.PI * 0.1);
      floraGroup.add(petal);
    }

    // Floating Gold Leaf Flakes inside resin
    const goldGeo = new THREE.DodecahedronGeometry(0.06, 0);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.15,
    });

    const goldInstanced = new THREE.InstancedMesh(goldGeo, goldMat, 45);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < 45; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 3.2,
        (Math.random() - 0.5) * 3.2,
        (Math.random() - 0.5) * 0.6
      );
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const scale = 0.5 + Math.random() * 0.8;
      dummy.scale.set(scale, scale * 0.3, scale);
      dummy.updateMatrix();
      goldInstanced.setMatrixAt(i, dummy.matrix);
    }
    floraGroup.add(goldInstanced);

    mainGroup.add(floraGroup);

    // Wooden Base Support
    const baseGeo = new THREE.BoxGeometry(3.6, 0.4, 1.2);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x5c3d2e,
      roughness: 0.5,
      metalness: 0.1,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.set(0, -1.6, 0);
    mainGroup.add(baseMesh);

    // Orbiting Golden Sparkle Dust Particles
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      scales[i] = Math.random() * 0.08 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xe5c158,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse tracking listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Rotate Main 3D Resin Piece slowly + tilt with mouse
      mainGroup.rotation.y = elapsedTime * 0.3 + mouseRef.current.x * 0.4;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.15 - mouseRef.current.y * 0.3;

      // Slight floating motion
      mainGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12;

      // Move point light with mouse
      pointLight.position.x = mouseRef.current.x * 3;
      pointLight.position.y = mouseRef.current.y * 3;

      // Rotate sparkles
      particles.rotation.y = elapsedTime * 0.08;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });

    resizeObserver.observe(container);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isDarkTheme]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] sm:min-h-[480px] md:min-h-[550px] relative cursor-grab active:cursor-grabbing"
    />
  );
};
