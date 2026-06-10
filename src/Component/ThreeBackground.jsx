'use client';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Floating particles with ambient drift ── */
function Particles({ count = 800 }) {
  const meshRef = useRef();
  const lightRef = useRef();
  const bounds = useMemo(() => ({ centerX: 2.2, x: 6.4, y: 5.2, z: 4.4 }), []);

  const { positions, velocities, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = bounds.centerX + (Math.random() - 0.5) * bounds.x * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z * 2;

      velocities[i * 3]     = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;

      scales[i] = Math.random() * 0.5 + 0.2;
    }
    return { positions, velocities, scales };
  }, [bounds, count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      let x = posAttr.array[i * 3];
      let y = posAttr.array[i * 3 + 1];
      let z = posAttr.array[i * 3 + 2];

      // Gentle drift
      x += velocities[i * 3] + Math.sin(time * 0.3 + i) * 0.001;
      y += velocities[i * 3 + 1] + Math.cos(time * 0.2 + i) * 0.001;
      z += velocities[i * 3 + 2];

      // Boundaries wrap
      if (x > bounds.centerX + bounds.x) x = bounds.centerX - bounds.x;
      if (x < bounds.centerX - bounds.x) x = bounds.centerX + bounds.x;
      if (y > bounds.y) y = -bounds.y;
      if (y < -bounds.y) y = bounds.y;
      if (z > bounds.z) z = -bounds.z;
      if (z < -bounds.z) z = bounds.z;

      posAttr.array[i * 3] = x;
      posAttr.array[i * 3 + 1] = y;
      posAttr.array[i * 3 + 2] = z;
    }
    posAttr.needsUpdate = true;

    if (lightRef.current) {
      lightRef.current.position.x = 2.4;
      lightRef.current.position.y = 0.2;
    }
  });

  return (
    <>
      <pointLight ref={lightRef} color="#A7C636" intensity={3} distance={12} />
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={count}
          />
          <bufferAttribute
            attach="attributes-aScale"
            args={[scales, 1]}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#A7C636"
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

/* ── Connected Lines between close particles ── */
function ConnectionLines({ maxDist = 2 }) {
  const lineRef = useRef();

  // We share particle positions with the Particles component via a shared buffer
  // Instead, we create our own smaller set of "anchor" points for lines
  const anchors = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 60; i++) {
      pts.push(new THREE.Vector3(
        2.2 + (Math.random() - 0.5) * 9.5,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5
      ));
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.elapsedTime;
    const positions = [];

    // Update anchor positions with slow drift
    for (let i = 0; i < anchors.length; i++) {
      anchors[i].x += Math.sin(time * 0.15 + i * 0.7) * 0.003;
      anchors[i].y += Math.cos(time * 0.12 + i * 0.5) * 0.003;
    }

    // Connect close nodes
    for (let i = 0; i < anchors.length; i++) {
      for (let j = i + 1; j < anchors.length; j++) {
        const d = anchors[i].distanceTo(anchors[j]);
        if (d < maxDist) {
          positions.push(anchors[i].x, anchors[i].y, anchors[i].z);
          positions.push(anchors[j].x, anchors[j].y, anchors[j].z);
        }
      }
    }

    const geo = lineRef.current.geometry;
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.computeBoundingSphere();
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#A7C636" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

/* ── Central Floating Wireframe Shape ── */
function FloatingShape({ compact }) {
  const meshRef = useRef();
  const { viewport } = useThree();
  const baseX = 3.35;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const compactRadius = viewport.width * 0.85;
    const radius = compact ? compactRadius : 1.6;

    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.3;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
    meshRef.current.position.x = compact
      ? viewport.width / 2 + radius * 0.12
      : baseX;
    meshRef.current.position.y = compact
      ? -viewport.height / 2 + radius * 0.58
      : Math.sin(t * 0.5) * 0.3;
    meshRef.current.scale.setScalar(radius / 1.6);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial color="#A7C636" wireframe transparent opacity={0.32} />
    </mesh>
  );
}

/* ── Scene Wrapper ── */
function Scene({ compact }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <Particles count={600} />
      <ConnectionLines />
      <FloatingShape compact={compact} />
    </>
  );
}

/* ── Exported Canvas Component ── */
export default function ThreeBackground() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)');
    const updateCompact = () => setCompact(media.matches);

    updateCompact();
    media.addEventListener('change', updateCompact);
    return () => media.removeEventListener('change', updateCompact);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene compact={compact} />
      </Canvas>
    </div>
  );
}
