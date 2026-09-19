"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CITY_DISTRICTS } from "@/lib/city-layout";
import { DISTRICTS, type DistrictId } from "@/lib/data";

export type CitySceneProps = {
  activeDistrict: DistrictId | null;
  counts: Record<DistrictId, number>;
  onDistrictSelect: (id: DistrictId) => void;
  view: "perspective" | "top";
  zoomCommand: { direction: 1 | -1; id: number } | null;
  resetKey: number;
  onReady?: () => void;
};

type SceneApi = {
  frame: (district: DistrictId | null, view: CitySceneProps["view"]) => void;
  zoom: (direction: 1 | -1) => void;
  invalidate: () => void;
};

const DISTRICT_NAMES = Object.fromEntries(DISTRICTS.map((district) => [district.id, district.name])) as Record<DistrictId, string>;
const DISTRICT_IDS = new Set<string>(CITY_DISTRICTS.map((district) => district.id));
const OVERVIEW_DIRECTION = new THREE.Vector3(32, 36, 40).normalize();
const TOP_DIRECTION = new THREE.Vector3(0, 60, 0.001).normalize();

function disposeObject(object: THREE.Object3D) {
  const materials = new Set<THREE.Material>();
  const geometries = new Set<THREE.BufferGeometry>();
  const textures = new Set<THREE.Texture>();
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    geometries.add(child.geometry);
    const childMaterials = Array.isArray(child.material) ? child.material : [child.material];
    childMaterials.forEach((material) => materials.add(material));
  });
  materials.forEach((material) => {
    Object.values(material).forEach((value: unknown) => {
      if (value instanceof THREE.Texture) textures.add(value);
    });
    material.dispose();
  });
  geometries.forEach((geometry) => geometry.dispose());
  textures.forEach((texture) => texture.dispose());
}

export default function CityScene(props: CitySceneProps) {
  const { activeDistrict, counts, onDistrictSelect, view, zoomCommand, resetKey } = props;
  const hostRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef(new Map<DistrictId, HTMLButtonElement>());
  const latestRef = useRef(props);
  const apiRef = useRef<SceneApi | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    latestRef.current = props;
    apiRef.current?.invalidate();
  }, [props]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let contextLost = false;
    let frameId = 0;
    let model: THREE.Group | null = null;
    let dirty = true;
    let width = Math.max(host.clientWidth, 1);
    let height = Math.max(host.clientHeight, 1);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#eaece8");
    const camera = new THREE.OrthographicCamera(-24, 24, 20, -20, 0.1, 220);
    camera.position.copy(OVERVIEW_DIRECTION).multiplyScalar(68);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "low-power" });
    } catch {
      queueMicrotask(() => {
        if (disposed) return;
        setErrorMessage("이 브라우저에서 3D 지도를 열 수 없어요. 구역 목록으로 계속 둘러볼 수 있어요.");
        setStatus("error");
      });
      return () => { disposed = true; };
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = false;
    renderer.domElement.setAttribute("aria-label", "마우스나 손가락으로 회전하고 확대할 수 있는 BlockMAP 도시 지도");
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.style.touchAction = "none";
    host.prepend(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.09;
    controls.enablePan = true;
    controls.screenSpacePanning = false;
    controls.minPolarAngle = 0.001;
    controls.maxPolarAngle = Math.PI * 0.43;
    controls.minZoom = 0.7;
    controls.maxZoom = 4.5;
    controls.rotateSpeed = 0.55;
    controls.panSpeed = 0.7;
    controls.zoomSpeed = 0.7;
    controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
    controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

    scene.add(new THREE.HemisphereLight("#ffffff", "#c3cec1", 2.4));
    const sun = new THREE.DirectionalLight("#fff7e6", 3.1);
    sun.position.set(-22, 38, 25);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -32;
    sun.shadow.camera.right = 32;
    sun.shadow.camera.top = 32;
    sun.shadow.camera.bottom = -32;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 100;
    sun.shadow.bias = -0.0003;
    sun.shadow.normalBias = 0.08;
    sun.shadow.radius = 3;
    scene.add(sun);
    const fill = new THREE.DirectionalLight("#edf4ff", 0.8);
    fill.position.set(20, 15, -25);
    scene.add(fill);

    type CameraTransition = {
      start: number;
      fromPosition: THREE.Vector3;
      toPosition: THREE.Vector3;
      fromTarget: THREE.Vector3;
      toTarget: THREE.Vector3;
      fromZoom: number;
      toZoom: number;
    };
    let transition: CameraTransition | null = null;
    const projected = new THREE.Vector3();
    const panMinimum = new THREE.Vector3(-26, 0, -24);
    const panMaximum = new THREE.Vector3(26, 0, 24);
    const panOffset = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerStart: { x: number; y: number; time: number } | null = null;
    let lastHoverTime = 0;

    function frame(districtId: DistrictId | null, nextView: CitySceneProps["view"]) {
      const district = CITY_DISTRICTS.find((item) => item.id === districtId);
      const target = district ? new THREE.Vector3(district.position[0], 0, district.position[1]) : new THREE.Vector3();
      const direction = nextView === "top" ? TOP_DIRECTION : OVERVIEW_DIRECTION;
      const position = target.clone().addScaledVector(direction, 68);
      const targetZoom = district ? (width < 640 ? 2.35 : 1.8) : 1;
      controls.enableRotate = nextView !== "top";
      if (reducedMotion.matches) {
        controls.target.copy(target);
        camera.position.copy(position);
        camera.zoom = targetZoom;
        camera.updateProjectionMatrix();
        controls.update();
        transition = null;
      } else {
        transition = {
          start: performance.now(),
          fromPosition: camera.position.clone(),
          toPosition: position,
          fromTarget: controls.target.clone(),
          toTarget: target,
          fromZoom: camera.zoom,
          toZoom: targetZoom,
        };
      }
      dirty = true;
    }

    function resize() {
      width = Math.max(host!.clientWidth, 1);
      height = Math.max(host!.clientHeight, 1);
      const aspect = width / height;
      const worldHeight = Math.max(34, 48 / aspect);
      camera.left = -worldHeight * aspect / 2;
      camera.right = worldHeight * aspect / 2;
      camera.top = worldHeight / 2;
      camera.bottom = -worldHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      dirty = true;
    }

    function updateLabels() {
      const current = latestRef.current;
      const boxes: { left: number; right: number; top: number; bottom: number }[] = [];
      const sorted = [...CITY_DISTRICTS].sort((a, b) => {
        if (a.id === current.activeDistrict) return -1;
        if (b.id === current.activeDistrict) return 1;
        return (current.counts[b.id] > 0 ? 1 : 0) - (current.counts[a.id] > 0 ? 1 : 0);
      });
      sorted.forEach((district) => {
        const button = labelsRef.current.get(district.id);
        if (!button) return;
        projected.set(district.position[0], 3.1, district.position[1]).project(camera);
        const x = (projected.x * 0.5 + 0.5) * width;
        const y = (-projected.y * 0.5 + 0.5) * height;
        const labelWidth = button.offsetWidth || 120;
        const labelHeight = button.offsetHeight || 43;
        const bounds = { left: x - labelWidth / 2, right: x + labelWidth / 2, top: y - labelHeight, bottom: y };
        const isActive = district.id === current.activeDistrict;
        const focused = current.activeDistrict !== null && camera.zoom > 1.4;
        const tooNearSelected = focused && !isActive && controls.target.distanceTo(new THREE.Vector3(district.position[0], 0, district.position[1])) < 9.5;
        const inViewport = projected.z > -1 && projected.z < 1 && bounds.left > 10 && bounds.right < width - 10 && bounds.top > 20 && bounds.bottom < height - 20;
        const overlaps = boxes.some((box) => bounds.left < box.right + 8 && bounds.right > box.left - 8 && bounds.top < box.bottom + 8 && bounds.bottom > box.top - 8);
        const visible = model && inViewport && !tooNearSelected && (!overlaps || isActive);
        button.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -100%)`;
        button.style.visibility = visible ? "visible" : "hidden";
        button.style.pointerEvents = visible ? "auto" : "none";
        button.tabIndex = visible ? 0 : -1;
        if (visible) boxes.push(bounds);
      });
    }

    function districtAt(event: PointerEvent): DistrictId | null {
      if (!model) return null;
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -((event.clientY - bounds.top) / bounds.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(model, true);
      for (const hit of hits) {
        let object: THREE.Object3D | null = hit.object;
        while (object) {
          if (object.name.startsWith("district-")) {
            const id = object.name.slice("district-".length);
            if (DISTRICT_IDS.has(id)) return id as DistrictId;
          }
          object = object.parent;
        }
        // The first visible building or ground surface occludes anything behind it.
        if (hit.object instanceof THREE.Mesh) break;
      }
      return null;
    }

    function onPointerDown(event: PointerEvent) {
      pointerStart = event.isPrimary && event.button === 0 ? { x: event.clientX, y: event.clientY, time: performance.now() } : null;
      renderer.domElement.style.cursor = "grabbing";
    }
    function onPointerUp(event: PointerEvent) {
      const start = pointerStart;
      pointerStart = null;
      renderer.domElement.style.cursor = "grab";
      if (!start || !event.isPrimary || event.button !== 0 || performance.now() - start.time > 650) return;
      if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 6) return;
      const district = districtAt(event);
      if (district) latestRef.current.onDistrictSelect(district);
    }
    function onPointerMove(event: PointerEvent) {
      if (pointerStart || event.pointerType !== "mouse" || performance.now() - lastHoverTime < 90) return;
      lastHoverTime = performance.now();
      renderer.domElement.style.cursor = districtAt(event) ? "pointer" : "grab";
    }
    function onPointerCancel() { pointerStart = null; renderer.domElement.style.cursor = "grab"; }
    function onControlStart() { transition = null; }
    function onControlChange() { dirty = true; }
    function onContextLost(event: Event) {
      event.preventDefault();
      contextLost = true;
      cancelAnimationFrame(frameId);
      labelsRef.current.forEach((label) => { label.style.visibility = "hidden"; });
      setErrorMessage("3D 연결이 잠시 끊겼어요. 지도를 다시 열거나 구역 목록에서 계속 탐색해 주세요.");
      setStatus("error");
    }

    function animate(now: number) {
      if (disposed || contextLost) return;
      frameId = requestAnimationFrame(animate);
      if (document.hidden) return;
      if (transition) {
        const progress = Math.min((now - transition.start) / 850, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        camera.position.lerpVectors(transition.fromPosition, transition.toPosition, eased);
        controls.target.lerpVectors(transition.fromTarget, transition.toTarget, eased);
        camera.zoom = THREE.MathUtils.lerp(transition.fromZoom, transition.toZoom, eased);
        camera.updateProjectionMatrix();
        dirty = true;
        if (progress === 1) transition = null;
      }
      controls.update();
      panOffset.copy(controls.target).clamp(panMinimum, panMaximum).sub(controls.target);
      if (panOffset.lengthSq() > 0) {
        controls.target.add(panOffset);
        camera.position.add(panOffset);
        dirty = true;
      }
      if (!dirty) return;
      renderer.render(scene, camera);
      updateLabels();
      dirty = false;
    }

    apiRef.current = {
      frame,
      zoom(direction) {
        transition = null;
        camera.zoom = THREE.MathUtils.clamp(camera.zoom * (direction === 1 ? 1.25 : 0.8), controls.minZoom, controls.maxZoom);
        camera.updateProjectionMatrix();
        dirty = true;
      },
      invalidate() { dirty = true; },
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointercancel", onPointerCancel);
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    controls.addEventListener("start", onControlStart);
    controls.addEventListener("change", onControlChange);
    resize();
    frame(latestRef.current.activeDistrict, latestRef.current.view);
    frameId = requestAnimationFrame(animate);

    new GLTFLoader().load("/models/blockmap-city.glb", (gltf) => {
      if (disposed || contextLost) { disposeObject(gltf.scene); return; }
      model = gltf.scene;
      const importedSceneObjects: THREE.Object3D[] = [];
      model.traverse((object) => {
        if (object instanceof THREE.Light || object instanceof THREE.Camera) importedSceneObjects.push(object);
        if (!(object instanceof THREE.Mesh)) return;
        object.castShadow = true;
        object.receiveShadow = true;
      });
      importedSceneObjects.forEach((object) => object.removeFromParent());
      scene.add(model);
      renderer.shadowMap.needsUpdate = true;
      dirty = true;
      setStatus("ready");
      latestRef.current.onReady?.();
    }, undefined, () => {
      if (disposed || contextLost) return;
      setErrorMessage("도시 지도를 불러오지 못했어요. 구역 목록으로 탐색하거나 다시 시도해 주세요.");
      setStatus("error");
    });

    return () => {
      disposed = true;
      apiRef.current = null;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointercancel", onPointerCancel);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      controls.removeEventListener("start", onControlStart);
      controls.removeEventListener("change", onControlChange);
      controls.dispose();
      disposeObject(scene);
      sun.shadow.map?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [reloadKey]);

  useEffect(() => {
    apiRef.current?.frame(activeDistrict, view);
  }, [activeDistrict, view, resetKey]);

  useEffect(() => {
    if (zoomCommand) apiRef.current?.zoom(zoomCommand.direction);
  }, [zoomCommand]);

  return (
    <div className="city-scene" ref={hostRef}>
      <div className="city-scene__labels" aria-label="도시 구역">
        {CITY_DISTRICTS.map((district) => (
          <button
            key={district.id}
            ref={(element) => {
              if (element) labelsRef.current.set(district.id, element);
              else labelsRef.current.delete(district.id);
            }}
            type="button"
            className={`city-scene__label${activeDistrict === district.id ? " is-active" : ""}${counts[district.id] === 0 ? " is-empty" : ""}`}
            onClick={() => onDistrictSelect(district.id)}
            aria-label={`${DISTRICT_NAMES[district.id]}, 쓰임처 ${counts[district.id]}곳`}
            aria-pressed={activeDistrict === district.id}
            style={{ "--district-color": district.color } as React.CSSProperties}
          >
            <span className="city-scene__label-dot" />
            <span className="city-scene__label-name">{DISTRICT_NAMES[district.id]}</span>
            <span className="city-scene__label-count">{counts[district.id]}</span>
          </button>
        ))}
      </div>
      {status === "loading" && (
        <div className="city-scene__status" role="status">
          <span className="city-scene__loading-dot" /> 도시를 불러오는 중
        </div>
      )}
      {status === "error" && (
        <div className="city-scene__error" role="status">
          <span className="city-scene__error-title">지도를 잠시 사용할 수 없어요</span>
          <p>{errorMessage}</p>
          <button type="button" onClick={() => { setStatus("loading"); setReloadKey((key) => key + 1); }}>지도 다시 열기</button>
        </div>
      )}
      <style>{`
        .city-scene { position:absolute; inset:0; overflow:hidden; background:#eaece8; }
        .city-scene > canvas { display:block; width:100%; height:100%; cursor:grab; }
        .city-scene__labels { position:absolute; inset:0; pointer-events:none; }
        .city-scene__label { position:absolute; left:0; top:0; display:flex; align-items:center; gap:7px; min-height:35px; padding:7px 9px; white-space:nowrap; border:1px solid rgba(255,255,255,.94); border-radius:9px; background:rgba(255,255,252,.94); color:#33443f; box-shadow:0 3px 10px rgba(30,49,39,.09),0 1px 2px rgba(30,49,39,.06); font-family:inherit; font-size:11px; font-weight:650; letter-spacing:-.03em; pointer-events:auto; visibility:hidden; cursor:pointer; transition:background .18s,box-shadow .18s,color .18s; backdrop-filter:blur(10px); }
        .city-scene__label::after { content:""; position:absolute; top:100%; left:calc(50% - 1px); width:2px; height:9px; background:rgba(73,93,80,.3); }
        .city-scene__label:hover { background:#fff; box-shadow:0 5px 18px rgba(30,49,39,.16); color:#162e25; }
        .city-scene__label:focus-visible { outline:3px solid #1e725b; outline-offset:3px; }
        .city-scene__label.is-active { background:#183e32; border-color:#183e32; color:#fff; box-shadow:0 6px 20px rgba(24,62,50,.2); z-index:2; }
        .city-scene__label.is-empty { color:#7a857d; background:rgba(255,255,252,.84); }
        .city-scene__label.is-active.is-empty { color:#fff; background:#183e32; }
        .city-scene__label-dot { flex-shrink:0; width:6px; height:6px; border-radius:50%; background:var(--district-color); }
        .city-scene__label-count { display:grid; place-items:center; min-width:21px; height:20px; padding:0 5px; border-radius:5px; background:#eef1e9; color:#55675b; font-size:10px; font-variant-numeric:tabular-nums; letter-spacing:0; }
        .city-scene__label.is-active .city-scene__label-count { color:#dcebd8; background:rgba(255,255,255,.12); }
        .city-scene__status { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; gap:9px; color:#64756a; font-size:12px; background:#eaece8; }
        .city-scene__loading-dot { width:6px; height:6px; border-radius:50%; background:#477762; animation:city-scene-pulse 1.2s ease-in-out infinite; }
        .city-scene__error { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:min(330px,calc(100% - 48px)); padding:25px; border:1px solid #d5ddd3; border-radius:16px; background:rgba(255,255,252,.95); box-shadow:0 10px 40px #263f3210; text-align:center; }
        .city-scene__error-title { color:#264437; font-size:14px; font-weight:700; }
        .city-scene__error p { margin:10px 0 18px; color:#748177; font-size:12px; line-height:1.7; }
        .city-scene__error button { padding:9px 14px; border:0; border-radius:7px; background:#254d3e; color:#fff; font-family:inherit; font-weight:600; font-size:12px; cursor:pointer; }
        @keyframes city-scene-pulse { 50% { opacity:.25; } }
        @media(min-width:1024px) { .city-scene__label { min-height:39px; padding:8px 10px; gap:8px; font-size:12px; } }
        @media(prefers-reduced-motion:reduce) { .city-scene__loading-dot { animation:none; } .city-scene__label { transition:none; } }
      `}</style>
    </div>
  );
}
