import { useEffect, useRef } from "react";
import * as THREE from "three";

const COLORS = {
  gold: 0xf6c453,
  burnt: 0xe9724c,
  warm: 0xf2a365,
  blue: 0x3b82f6,
};

const SHAPE_COLORS = [COLORS.gold, COLORS.burnt, COLORS.warm, COLORS.gold, COLORS.blue, COLORS.burnt];

interface ProjectsBackground3DProps {
  className?: string;
}

function ProjectsBackground3D({ className = "" }: ProjectsBackground3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      Math.max(container.clientWidth, 1) / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const shapes: { mesh: THREE.LineSegments; speed: THREE.Vector3; floatSeed: number }[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    for (let i = 0; i < 6; i++) {
      const size = 1.1 + Math.random() * 1.6;
      const base =
        i % 2 === 0
          ? new THREE.IcosahedronGeometry(size, 0)
          : new THREE.OctahedronGeometry(size, 0);
      const edges = new THREE.EdgesGeometry(base);
      base.dispose();
      geometries.push(edges);

      const material = new THREE.LineBasicMaterial({
        color: SHAPE_COLORS[i % SHAPE_COLORS.length],
        transparent: true,
        opacity: 0.22 + Math.random() * 0.18,
      });
      materials.push(material);

      const mesh = new THREE.LineSegments(edges, material);
      mesh.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10 - 3
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      group.add(mesh);

      shapes.push({
        mesh,
        speed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.0018,
          (Math.random() - 0.5) * 0.0018,
          0
        ),
        floatSeed: Math.random() * Math.PI * 2,
      });
    }

    const particleCount = 160;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometries.push(particleGeometry);

    const particleMaterial = new THREE.PointsMaterial({
      color: COLORS.gold,
      size: 0.035,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });
    materials.push(particleMaterial);

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    if (prefersReduced) {
      renderer.render(scene, camera);
      return () => {
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        renderer.dispose();
        if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement);
      };
    }

    const mouse = { x: 0, y: 0 };
    function onMouseMove(e: MouseEvent) {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("mousemove", onMouseMove);

    const resizeObserver = new ResizeObserver(() => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    let frameId: number;

    function animate() {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      shapes.forEach(({ mesh, speed, floatSeed }) => {
        mesh.rotation.x += speed.x;
        mesh.rotation.y += speed.y;
        mesh.position.y += Math.sin(t * 0.3 + floatSeed) * 0.0015;
      });

      particles.rotation.y += 0.0004;

      group.rotation.y += (mouse.x * 0.12 - group.rotation.y) * 0.03;
      group.rotation.x += (-mouse.y * 0.08 - group.rotation.x) * 0.03;

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className={`pointer-events-none h-full w-full ${className}`} />;
}

export default ProjectsBackground3D;