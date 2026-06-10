'use client';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Floating Particles that react to mouse ── */
function Particles({ mouse, count = 800 }) {
  const meshRef = useRef();
  const lightRef = useRef();

  const { positions, velocities, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i * 3]     = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;

      scales[i] = Math.random() * 0.5 + 0.2;
    }
    return { positions, velocities, scales };
  }, [count]);

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

      // Mouse attraction
      const mx = mouse.current.x * 6;
      const my = mouse.current.y * 4;
      const dx = mx - x;
      const dy = my - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 4) {
        const force = (4 - dist) * 0.0008;
        x += dx * force;
        y += dy * force;
      }

      // Boundaries wrap
      if (x > 10) x = -10;
      if (x < -10) x = 10;
      if (y > 6) y = -6;
      if (y < -6) y = 6;
      if (z > 5) z = -5;
      if (z < -5) z = 5;

      posAttr.array[i * 3] = x;
      posAttr.array[i * 3 + 1] = y;
      posAttr.array[i * 3 + 2] = z;
    }
    posAttr.needsUpdate = true;

    // Light follows mouse
    if (lightRef.current) {
      lightRef.current.position.x = mouse.current.x * 5;
      lightRef.current.position.y = mouse.current.y * 3;
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
function ConnectionLines({ mouse, count = 800, maxDist = 2 }) {
  const lineRef = useRef();
  const particleRef = useRef();

  // We share particle positions with the Particles component via a shared buffer
  // Instead, we create our own smaller set of "anchor" points for lines
  const anchors = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 60; i++) {
      pts.push(new THREE.Vector3(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6
      ));
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.elapsedTime;
    const mx = mouse.current.x * 6;
    const my = mouse.current.y * 4;
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
      // Connect to mouse if close
      const dMouse = Math.sqrt((anchors[i].x - mx) ** 2 + (anchors[i].y - my) ** 2);
      if (dMouse < 3) {
        positions.push(anchors[i].x, anchors[i].y, anchors[i].z);
        positions.push(mx, my, 0);
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
function FloatingShape({ mouse }) {
  const meshRef = useRef();
  const baseX = 3.35;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.3 + mouse.current.y * 0.3;
    meshRef.current.rotation.y = t * 0.15 + mouse.current.x * 0.3;
    meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
    meshRef.current.position.x = baseX + mouse.current.x * 0.2;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial color="#A7C636" wireframe transparent opacity={0.32} />
    </mesh>
  );
}

/* ── Scene Wrapper ── */
function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <Particles mouse={mouse} count={600} />
      <ConnectionLines mouse={mouse} />
      <FloatingShape mouse={mouse} />
    </>
  );
}

/* ── Exported Canvas Component ── */
export default function ThreeBackground({ mousePos, containerRef }) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef?.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalize mouse to -1..1
    mouse.current.x = (mousePos.x / rect.width) * 2 - 1;
    mouse.current.y = -((mousePos.y / rect.height) * 2 - 1);
  }, [mousePos, containerRef]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
