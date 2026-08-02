import { useEffect, useRef } from "react";
import * as THREE from "three";

interface PolygonExplosionProps {
  className?: string;
}

const COLORS = {
  core: 0xf6c453,
  coreEmissive: 0xe9724c,
  gold: 0xf6c453,
  burnt: 0xe9724c,
  warm: 0xf2a365,
  accent: 0xf8f9fa,
  ambientBlue: 0x1e3a8a,
  fog: 0x0a1128,
};

const SHARD_COUNT = 58; // entre 40 y 60
const SPHERE_RADIUS_MIN = 1.0;
const SPHERE_RADIUS_MAX = 2.9;
const HOVER_RADIUS = 1.4;
const PUSH_DISTANCE = 0.75;
const LERP_SPEED = 0.09;
const PARTICLE_COUNT = 220;

function makeGlowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(246,196,83,0.9)");
  gradient.addColorStop(0.4, "rgba(233,114,76,0.35)");
  gradient.addColorStop(1, "rgba(233,114,76,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function makeTriangleGeometry(size: number): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const r = () => Math.random() - 0.5;

  const v0 = [0, 0, 0];
  const v1 = [size * (0.7 + Math.random() * 0.5), size * r() * 0.6, 0];
  const v2 = [size * r() * 0.6, size * (0.7 + Math.random() * 0.5), 0];

  const vertices = new Float32Array([...v0, ...v1, ...v2]);
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();
  return geometry;
}

type ShardData = {
  basePosition: THREE.Vector3;
  direction: THREE.Vector3;
  baseScale: number;
  baseEmissiveIntensity: number;
  rotSpeed: { x: number; y: number; z: number };
};

function PolygonExplosion({ className = "" }: PolygonExplosionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(COLORS.fog, 0.06);

    const camera = new THREE.PerspectiveCamera(
      50,
      Math.max(container.clientWidth, 1) / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const explosionGroup = new THREE.Group();
    scene.add(explosionGroup);

    const coreLight = new THREE.PointLight(COLORS.core, 2.6, 12, 2);
    coreLight.position.set(0, 0, 0.5);
    explosionGroup.add(coreLight);

    const ambientLight = new THREE.AmbientLight(COLORS.ambientBlue, 0.45);
    scene.add(ambientLight);

    const accentLight = new THREE.PointLight(COLORS.accent, 1.4, 14, 2);
    accentLight.position.set(3.2, 2.4, 4);
    scene.add(accentLight);

    const coreGeometry = new THREE.SphereGeometry(0.34, 32, 32);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: COLORS.core,
      emissive: COLORS.coreEmissive,
      emissiveIntensity: 1.8,
      metalness: 0.3,
      roughness: 0.25,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    explosionGroup.add(core);

    const glowMaterial = new THREE.SpriteMaterial({
      map: makeGlowTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glowSprite = new THREE.Sprite(glowMaterial);
    glowSprite.scale.set(2.3, 2.3, 1);
    explosionGroup.add(glowSprite);

    const shardPalette = [COLORS.gold, COLORS.burnt, COLORS.warm, COLORS.gold, COLORS.burnt];
    const shards: THREE.Mesh[] = [];
    const shardGeometries: THREE.BufferGeometry[] = [coreGeometry];
    const shardMaterials: THREE.Material[] = [coreMaterial, glowMaterial];

    for (let i = 0; i < SHARD_COUNT; i++) {
      const size = 0.22 + Math.random() * 0.42;
      const geometry = makeTriangleGeometry(size);
      shardGeometries.push(geometry);

      const isAccent = Math.random() < 0.12;
      const baseColor = isAccent
        ? COLORS.accent
        : shardPalette[Math.floor(Math.random() * shardPalette.length)];

      const material = new THREE.MeshPhysicalMaterial({
        color: baseColor,
        metalness: 0.75,
        roughness: 0.18,
        clearcoat: 0.4,
        clearcoatRoughness: 0.15,
        emissive: new THREE.Color(baseColor).multiplyScalar(0.15),
        emissiveIntensity: 0.6,
        side: THREE.DoubleSide,
      });
      shardMaterials.push(material);

      const shard = new THREE.Mesh(geometry, material);

      const radius = SPHERE_RADIUS_MIN + Math.random() * (SPHERE_RADIUS_MAX - SPHERE_RADIUS_MIN);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      shard.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      shard.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      const baseScale = 0.7 + Math.random() * 0.7;
      shard.scale.setScalar(baseScale);

      const data: ShardData = {
        basePosition: shard.position.clone(),
        direction: shard.position.clone().normalize(),
        baseScale,
        baseEmissiveIntensity: material.emissiveIntensity,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.004,
          y: (Math.random() - 0.5) * 0.004,
          z: (Math.random() - 0.5) * 0.004,
        },
      };
      shard.userData = data;

      explosionGroup.add(shard);
      shards.push(shard);
    }

    const wireframeLayers: { mesh: THREE.LineSegments; speedY: number; speedX: number }[] = [];
    const wireframeConfigs = [
      { radius: 2.3, detail: 1, speedY: 0.0011, speedX: 0.0006, opacity: 0.55 },
      { radius: 3.0, detail: 1, speedY: -0.0007, speedX: 0.0004, opacity: 0.3 },
    ];

    wireframeConfigs.forEach(({ radius, detail, speedY, speedX, opacity }) => {
      const icoGeometry = new THREE.IcosahedronGeometry(radius, detail);
      const edgesGeometry = new THREE.EdgesGeometry(icoGeometry);
      icoGeometry.dispose();

      const lineMaterial = new THREE.LineBasicMaterial({
        color: COLORS.gold,
        transparent: true,
        opacity,
      });
      const lineMesh = new THREE.LineSegments(edgesGeometry, lineMaterial);
      lineMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      explosionGroup.add(lineMesh);

      shardGeometries.push(edgesGeometry);
      shardMaterials.push(lineMaterial);
      wireframeLayers.push({ mesh: lineMesh, speedY, speedX });
    });

    const sparkleGeometry = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(PARTICLE_COUNT * 3);
    const sparkleColors = new Float32Array(PARTICLE_COUNT * 3);
    const sparklePalette = [
      new THREE.Color(COLORS.gold),
      new THREE.Color(COLORS.warm),
      new THREE.Color(COLORS.accent),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 0.7 + Math.random() * 3.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      sparklePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      sparklePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      sparklePositions[i * 3 + 2] = radius * Math.cos(phi);

      const c = sparklePalette[Math.floor(Math.random() * sparklePalette.length)];
      sparkleColors[i * 3] = c.r;
      sparkleColors[i * 3 + 1] = c.g;
      sparkleColors[i * 3 + 2] = c.b;
    }

    sparkleGeometry.setAttribute("position", new THREE.BufferAttribute(sparklePositions, 3));
    sparkleGeometry.setAttribute("color", new THREE.BufferAttribute(sparkleColors, 3));

    const sparkleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      map: makeGlowTexture(),
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial);
    explosionGroup.add(sparkles);
    shardGeometries.push(sparkleGeometry);
    shardMaterials.push(sparkleMaterial);

    if (prefersReduced) {
      renderer.render(scene, camera);
      return () => {
        renderer.dispose();
        shardGeometries.forEach((g) => g.dispose());
        shardMaterials.forEach((m) => m.dispose());
        if (renderer.domElement.parentElement === container) {
          container.removeChild(renderer.domElement);
        }
      };
    }

    const mouse = new THREE.Vector2(0, 0);
    const targetRotation = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectionPoint = new THREE.Vector3();
    let mouseInside = false;

    function updatePointer(clientX: number, clientY: number) {
      const rect = container!.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      mouseInside = true;
      targetRotation.x = mouse.y * 0.22;
      targetRotation.y = mouse.x * 0.32;
    }

    function onPointerMove(event: MouseEvent) {
      updatePointer(event.clientX, event.clientY);
    }
    function onTouchMove(event: TouchEvent) {
      if (event.touches.length > 0) {
        updatePointer(event.touches[0].clientX, event.touches[0].clientY);
      }
    }
    function onPointerLeave() {
      mouseInside = false;
      targetRotation.set(0, 0);
    }

    container.addEventListener("mousemove", onPointerMove);
    container.addEventListener("mouseleave", onPointerLeave);
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onPointerLeave);

    const resizeObserver = new ResizeObserver(() => {
      const width = Math.max(container!.clientWidth, 1);
      const height = Math.max(container!.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    const tmpVec = new THREE.Vector3();
    const tmpScaleTarget = new THREE.Vector3();
    let frameId: number;

    function animate() {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      const breathe = Math.sin(t * 1.6) * 0.5 + 0.5;
      core.scale.setScalar(1 + breathe * 0.16);
      coreMaterial.emissiveIntensity = 1.5 + breathe * 0.9;
      coreLight.intensity = 2.2 + breathe * 1.1;
      glowMaterial.opacity = 0.75 + breathe * 0.25;
      glowSprite.scale.setScalar(2.1 + breathe * 0.4);

      wireframeLayers.forEach(({ mesh, speedY, speedX }) => {
        mesh.rotation.y += speedY;
        mesh.rotation.x += speedX;
      });

      sparkles.rotation.y += 0.0009;
      sparkleMaterial.opacity = 0.5 + breathe * 0.5;
      sparkleMaterial.size = 0.04 + breathe * 0.025;

      if (mouseInside) {
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(interactionPlane, intersectionPoint);
      }

      for (let i = 0; i < shards.length; i++) {
        const shard = shards[i];
        const data = shard.userData as ShardData;

        shard.rotation.x += data.rotSpeed.x;
        shard.rotation.y += data.rotSpeed.y;
        shard.rotation.z += data.rotSpeed.z;

        let influence = 0;
        if (mouseInside) {
          const dist = intersectionPoint.distanceTo(data.basePosition);
          influence = THREE.MathUtils.clamp(1 - dist / HOVER_RADIUS, 0, 1);
        }

        tmpVec.copy(data.basePosition).addScaledVector(data.direction, influence * PUSH_DISTANCE);
        shard.position.lerp(tmpVec, LERP_SPEED);

        tmpScaleTarget.setScalar(data.baseScale * (1 + influence * 0.35));
        shard.scale.lerp(tmpScaleTarget, LERP_SPEED);

        const material = shard.material as THREE.MeshPhysicalMaterial;
        const targetEmissive = data.baseEmissiveIntensity + influence * 2.2;
        material.emissiveIntensity = THREE.MathUtils.lerp(
          material.emissiveIntensity,
          targetEmissive,
          LERP_SPEED
        );
      }

      const ambientSpin = t * 0.02;
      explosionGroup.rotation.x += (targetRotation.x - explosionGroup.rotation.x) * 0.05;
      explosionGroup.rotation.y +=
        (targetRotation.y + ambientSpin - explosionGroup.rotation.y) * 0.05;
      explosionGroup.position.y = Math.sin(t * 0.6) * 0.05;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("mouseleave", onPointerLeave);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onPointerLeave);

      shardGeometries.forEach((g) => g.dispose());
      shardMaterials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={`h-full w-full ${className}`} />;
}

export default PolygonExplosion;