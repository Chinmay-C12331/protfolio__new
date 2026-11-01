import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { HOLOGRAPHIC_NODES } from '../data/portfolioData';
import { HolographicNodeInfo, ProjectFilterCategory } from '../types/portfolio';
import {
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Eye,
  Compass,
  ArrowUpRight,
  Layers,
} from 'lucide-react';

interface DeveloperScene3DProps {
  reducedMotion: boolean;
  onSelectHologramNode: (
    targetSection: string,
    filterCategory?: ProjectFilterCategory,
    projectId?: string
  ) => void;
}

type CameraPreset = 'overview' | 'character' | 'holograms';

// Module-scope reusable math objects (Zero GC inside render loop)
const _vec3A = new THREE.Vector3();
const _vec3B = new THREE.Vector3();
const _dummyObj = new THREE.Object3D();
const _pointerNdc = new THREE.Vector2();

function createMonitorCodeTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Deep terminal background
  const grad = ctx.createLinearGradient(0, 0, 1024, 512);
  grad.addColorStop(0, '#070D1D');
  grad.addColorStop(1, '#0D1730');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Subtle grid
  ctx.strokeStyle = 'rgba(34, 211, 238, 0.08)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 1024; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }
  for (let y = 0; y < 512; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Top header bar
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.fillRect(0, 0, 1024, 42);
  ctx.fillStyle = '#22D3EE';
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillText('workspace // chinmay_ai_lab :: rag_pipeline.py', 24, 27);

  // Left pane: Python & Gemini code snippet
  const lines = [
    { text: 'from google import genai', color: '#38BDF8' },
    { text: 'import chromadb, torch', color: '#38BDF8' },
    { text: '', color: '#94A3B8' },
    { text: 'class GroundedRAGPipeline:', color: '#22D3EE' },
    { text: '  def __init__(self, chunk_size=1000, overlap=200):', color: '#E2E8F0' },
    { text: '    self.client = genai.Client()', color: '#A78BFA' },
    { text: '    self.store = chromadb.PersistentClient()', color: '#94A3B8' },
    { text: '', color: '#94A3B8' },
    { text: '  def evaluate_risk(self, evidence):', color: '#22D3EE' },
    { text: '    # Deterministic rule scoring (0-100%)', color: '#64748B' },
    { text: '    return RuleEngine.compute(evidence)', color: '#34D399' },
  ];

  ctx.font = '500 19px "JetBrains Mono", monospace';
  lines.forEach((line, idx) => {
    ctx.fillStyle = '#475569';
    ctx.fillText(String(idx + 1).padStart(2, '0'), 24, 82 + idx * 34);
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, 68, 82 + idx * 34);
  });

  // Right pane: Neural Architecture & Vector Retrieval graph
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.45)';
  ctx.lineWidth = 2;
  ctx.strokeRect(580, 64, 412, 416);

  ctx.fillStyle = '#A78BFA';
  ctx.font = '600 17px "JetBrains Mono", monospace';
  ctx.fillText('BI-LSTM + ATTENTION // 22 FEATURES', 604, 98);

  // Draw neural nodes and connections
  const layerX = [635, 745, 855, 945];
  const layerCounts = [4, 5, 4, 2];
  const nodePositions: Array<Array<[number, number]>> = [];

  layerX.forEach((lx, lIdx) => {
    const count = layerCounts[lIdx];
    const col: Array<[number, number]> = [];
    for (let i = 0; i < count; i++) {
      const ly = 155 + (i * 210) / Math.max(1, count - 1);
      col.push([lx, ly]);
    }
    nodePositions.push(col);
  });

  ctx.strokeStyle = 'rgba(34, 211, 238, 0.28)';
  ctx.lineWidth = 1.5;
  for (let l = 0; l < nodePositions.length - 1; l++) {
    for (const [x1, y1] of nodePositions[l]) {
      for (const [x2, y2] of nodePositions[l + 1]) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }
  }

  for (const col of nodePositions) {
    for (const [nx, ny] of col) {
      ctx.beginPath();
      ctx.arc(nx, ny, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#22D3EE';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#0F172A';
      ctx.stroke();
    }
  }

  // Bottom bar inside right panel
  ctx.fillStyle = 'rgba(34, 211, 238, 0.14)';
  ctx.fillRect(604, 412, 364, 44);
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '500 16px "JetBrains Mono", monospace';
  ctx.fillText('TOP-3 CHUNKS · CHROMADB · ONNX INT8', 618, 439);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  return texture;
}

function createAnimeFaceTexture(maxAnisotropy: number, isBlinking = false): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Warm stylized anime skin tone
  ctx.fillStyle = '#F3DAC6';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle forehead hair shadow
  const shadowGrad = ctx.createLinearGradient(0, 0, 0, 175);
  shadowGrad.addColorStop(0, 'rgba(195, 155, 132, 0.55)');
  shadowGrad.addColorStop(1, 'rgba(243, 218, 198, 0)');
  ctx.fillStyle = shadowGrad;
  ctx.fillRect(0, 0, 512, 175);

  // Confident sharp anime eyebrows
  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 9;
  ctx.lineCap = 'round';
  // Left brow
  ctx.beginPath();
  ctx.moveTo(118, 188);
  ctx.quadraticCurveTo(165, 174, 208, 186);
  ctx.stroke();
  // Right brow
  ctx.beginPath();
  ctx.moveTo(394, 188);
  ctx.quadraticCurveTo(347, 174, 304, 186);
  ctx.stroke();

  const drawAnimeEye = (cx: number, cy: number) => {
    if (isBlinking) {
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(cx - 42, cy + 4);
      ctx.quadraticCurveTo(cx, cy + 18, cx + 42, cy + 4);
      ctx.stroke();
      return;
    }

    // Sclera
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(cx, cy, 42, 31, 0, 0, Math.PI * 2);
    ctx.fill();

    // Iris (Deep indigo-slate with electric cyan lower glow — classic modern anime)
    const irisGrad = ctx.createLinearGradient(cx, cy - 28, cx, cy + 28);
    irisGrad.addColorStop(0, '#0F172A');
    irisGrad.addColorStop(0.55, '#1E3A8A');
    irisGrad.addColorStop(1, '#22D3EE');
    ctx.fillStyle = irisGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 2, 26, 27, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pupil
    ctx.fillStyle = '#090D16';
    ctx.beginPath();
    ctx.arc(cx, cy + 2, 11, 0, Math.PI * 2);
    ctx.fill();

    // Primary anime specular catchlight
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(cx - 10, cy - 9, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Secondary small catchlight
    ctx.beginPath();
    ctx.arc(cx + 11, cy + 10, 4, 0, Math.PI * 2);
    ctx.fill();

    // Crisp upper eyelash arch
    ctx.strokeStyle = '#090D16';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(cx - 44, cy - 4);
    ctx.quadraticCurveTo(cx, cy - 36, cx + 44, cy - 2);
    ctx.stroke();

    // Subtle lower lash line
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy + 27);
    ctx.quadraticCurveTo(cx, cy + 33, cx + 30, cy + 27);
    ctx.stroke();
  };

  drawAnimeEye(166, 242);
  drawAnimeEye(346, 242);

  // Subtle anime nose line & shadow
  ctx.strokeStyle = '#C69C82';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(256, 275);
  ctx.lineTo(250, 314);
  ctx.lineTo(260, 318);
  ctx.stroke();

  // Confident slight smile
  ctx.strokeStyle = '#8C584C';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(222, 366);
  ctx.quadraticCurveTo(256, 381, 290, 364);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  return texture;
}

function createHologramCardTexture(
  node: HolographicNodeInfo,
  isSelected: boolean,
  maxAnisotropy: number
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 192;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 192);

  // Card surface
  ctx.fillStyle = isSelected ? 'rgba(14, 28, 56, 0.94)' : 'rgba(10, 17, 34, 0.86)';
  ctx.beginPath();
  ctx.roundRect(8, 8, 496, 176, 20);
  ctx.fill();

  // Border
  ctx.lineWidth = isSelected ? 5 : 3;
  ctx.strokeStyle = isSelected ? '#22D3EE' : node.color;
  ctx.stroke();

  // Corner tech bracket accents
  ctx.fillStyle = node.color;
  ctx.fillRect(26, 26, 28, 4);
  ctx.fillRect(26, 26, 4, 22);
  ctx.fillRect(458, 162, 28, 4);
  ctx.fillRect(482, 144, 4, 22);

  // Category kicker
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 20px "JetBrains Mono", monospace';
  ctx.fillText(node.category.toUpperCase(), 42, 68);

  // Main Label
  ctx.fillStyle = '#F8FAFC';
  const fontSize = node.label.length > 14 ? 30 : 40;
  ctx.font = `700 ${fontSize}px "Outfit", sans-serif`;
  ctx.fillText(node.label, 42, 122);

  // Interactive prompt hint
  ctx.fillStyle = node.color;
  ctx.font = '500 18px "JetBrains Mono", monospace';
  ctx.fillText('CLICK TO INSPECT →', 42, 156);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  return texture;
}

export const DeveloperScene3D: React.FC<DeveloperScene3DProps> = ({
  reducedMotion,
  onSelectHologramNode,
}) => {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [selectedNode, setSelectedNode] = useState<HolographicNodeInfo>(HOLOGRAPHIC_NODES[0]);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('overview');
  const [hudCollapsed, setHudCollapsed] = useState<boolean>(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Mutable refs for animation loop access without re-initializing WebGL
  const stateRef = useRef({
    reducedMotion,
    cameraPreset: 'overview' as CameraPreset,
    selectedNodeId: HOLOGRAPHIC_NODES[0].id,
    pointerX: 0,
    pointerY: 0,
    dragYaw: 0,
    dragPitch: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    isVisible: true,
  });

  useEffect(() => {
    stateRef.current.reducedMotion = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    stateRef.current.cameraPreset = cameraPreset;
  }, [cameraPreset]);

  useEffect(() => {
    stateRef.current.selectedNodeId = selectedNode.id;
  }, [selectedNode]);

  const handleResetView = useCallback(() => {
    stateRef.current.dragYaw = 0;
    stateRef.current.dragPitch = 0;
    setCameraPreset('overview');
  }, []);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // Probe WebGL2 / WebGL support and detect software renderer
    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const gl =
        probeCanvas.getContext('webgl2') ||
        probeCanvas.getContext('webgl') ||
        probeCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
      const glCtx = gl as WebGLRenderingContext;
      const ext = glCtx.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : glCtx.RENDERER;
      const gpu = String(glCtx.getParameter(param));
      glCtx.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      setWebglSupported(false);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 540;
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    // Scene & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.065);

    // Studio Environment Reflection (Mandatory RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 60);
    camera.position.set(0, 1.35, 5.7);
    camera.lookAt(0, 0.45, 0);

    // 3-Point Studio & Cyber Lab Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x090d1a, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xf8fafc, 2.1);
    keyLight.position.set(3.5, 5.5, 4.2);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 16;
      const d = 3.8;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const cyanRimLight = new THREE.PointLight(0x22d3ee, 4.2, 9);
    cyanRimLight.position.set(-2.8, 2.1, -1.6);
    scene.add(cyanRimLight);

    const violetRimLight = new THREE.PointLight(0x8b5cf6, 3.8, 9);
    violetRimLight.position.set(2.8, 1.9, -1.4);
    scene.add(violetRimLight);

    const screenGlowLight = new THREE.PointLight(0x38bdf8, 1.8, 4.5);
    screenGlowLight.position.set(0, 0.75, 0.35);
    scene.add(screenGlowLight);

    // Root Scene Group (rotates with gentle drag/parallax)
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // =========================================================================
    // 1. GROUND PLATFORM & CONTACT SHADOW GROUNDING
    // =========================================================================
    const platformGeo = new THREE.CylinderGeometry(2.85, 3.05, 0.14, 48);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x0b1120,
      roughness: 0.35,
      metalness: 0.7,
    });
    const platformMesh = new THREE.Mesh(platformGeo, platformMat);
    platformMesh.position.set(0, -1.32, 0);
    platformMesh.receiveShadow = true;
    worldGroup.add(platformMesh);

    // Glowing floor ring (with polygonOffset to avoid Z-fighting)
    const ringGeo = new THREE.RingGeometry(2.62, 2.7, 64);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.45,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const floorRing = new THREE.Mesh(ringGeo, ringMat);
    floorRing.position.set(0, -1.24, 0);
    worldGroup.add(floorRing);

    // Inner violet ring
    const innerRingGeo = new THREE.RingGeometry(1.75, 1.79, 64);
    innerRingGeo.rotateX(-Math.PI / 2);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.35,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const innerFloorRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerFloorRing.position.set(0, -1.238, 0);
    worldGroup.add(innerFloorRing);

    // =========================================================================
    // 2. FUTURISTIC DEVELOPER WORKSTATION DESK & DUAL MONITORS
    // =========================================================================
    const workstationGroup = new THREE.Group();
    worldGroup.add(workstationGroup);

    const deskTopGeo = new THREE.BoxGeometry(2.75, 0.08, 1.15);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.28,
      metalness: 0.78,
    });
    const deskTop = new THREE.Mesh(deskTopGeo, deskMat);
    deskTop.position.set(0, -0.32, -0.15);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    workstationGroup.add(deskTop);

    // Cyan LED front trim along the desk edge
    const deskTrimGeo = new THREE.BoxGeometry(2.77, 0.022, 0.03);
    const deskTrimMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const deskTrim = new THREE.Mesh(deskTrimGeo, deskTrimMat);
    deskTrim.position.set(0, -0.32, 0.425);
    workstationGroup.add(deskTrim);

    // Angled metallic desk legs
    const legGeo = new THREE.BoxGeometry(0.1, 0.96, 0.75);
    const legMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.85,
    });
    const leftLeg = new THREE.Mesh(legGeo, legMat);
    leftLeg.position.set(-1.18, -0.82, -0.15);
    workstationGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, legMat);
    rightLeg.position.set(1.18, -0.82, -0.15);
    workstationGroup.add(rightLeg);

    // Ultrawide Primary Monitor facing forward/slightly angled for viewer clarity
    const monitorTexture = createMonitorCodeTexture(maxAniso);
    const monitorFrameGeo = new THREE.BoxGeometry(1.62, 0.82, 0.05);
    const monitorFrameMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.25,
      metalness: 0.85,
    });
    const mainMonitor = new THREE.Group();
    mainMonitor.position.set(-0.55, 0.28, -0.52);
    mainMonitor.rotation.y = 0.26;
    workstationGroup.add(mainMonitor);

    const monitorFrame = new THREE.Mesh(monitorFrameGeo, monitorFrameMat);
    mainMonitor.add(monitorFrame);

    const monitorScreenGeo = new THREE.PlaneGeometry(1.54, 0.74);
    const monitorScreenMat = new THREE.MeshBasicMaterial({ map: monitorTexture });
    const monitorScreen = new THREE.Mesh(monitorScreenGeo, monitorScreenMat);
    monitorScreen.position.z = 0.028;
    mainMonitor.add(monitorScreen);

    // Monitor stand arm
    const standArmGeo = new THREE.CylinderGeometry(0.035, 0.045, 0.46, 16);
    const standArm = new THREE.Mesh(standArmGeo, legMat);
    standArm.position.set(-0.55, -0.12, -0.58);
    workstationGroup.add(standArm);

    // Mechanical Keyboard with glowing keycap rows on desk
    const keyboardGroup = new THREE.Group();
    keyboardGroup.position.set(0.18, -0.265, 0.02);
    workstationGroup.add(keyboardGroup);

    const kbBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.68, 0.03, 0.26),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.8 })
    );
    keyboardGroup.add(kbBase);

    const kbGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(0.62, 0.2),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.55 })
    );
    kbGlow.rotation.x = -Math.PI / 2;
    kbGlow.position.y = 0.017;
    keyboardGroup.add(kbGlow);

    // =========================================================================
    // 3. ORIGINAL STYLIZED 3D ANIME DEVELOPER CHARACTER (12+ PART HIERARCHY)
    // =========================================================================
    const characterGroup = new THREE.Group();
    characterGroup.position.set(0.22, -0.35, 0.12);
    worldGroup.add(characterGroup);

    // Ergonomic Cyber-Chair behind developer
    const chairBack = new THREE.Mesh(
      new THREE.BoxGeometry(0.68, 1.18, 0.09),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.45, metalness: 0.6 })
    );
    chairBack.position.set(0, 0.28, -0.32);
    characterGroup.add(chairBack);

    const chairAccent = new THREE.Mesh(
      new THREE.BoxGeometry(0.52, 0.95, 0.02),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6 })
    );
    chairAccent.position.set(0, 0.3, -0.27);
    characterGroup.add(chairAccent);

    // Upper Body / Hoodie Torso Group (breathes & leans slightly)
    const upperBodyGroup = new THREE.Group();
    upperBodyGroup.position.set(0, 0.12, -0.06);
    characterGroup.add(upperBodyGroup);

    const hoodieMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.68,
      metalness: 0.15,
    });
    const cyanTrimMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xf3dac6,
      roughness: 0.55,
      metalness: 0.05,
    });

    // Main Hoodie Torso
    const torsoMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.27, 0.24, 0.72, 24),
      hoodieMat
    );
    torsoMesh.scale.set(1.22, 1, 0.78);
    torsoMesh.position.set(0, 0.22, 0);
    torsoMesh.castShadow = true;
    upperBodyGroup.add(torsoMesh);

    // Draped Hoodie Collar & Hood around neck
    const hoodCollar = new THREE.Mesh(
      new THREE.TorusGeometry(0.19, 0.065, 16, 32),
      hoodieMat
    );
    hoodCollar.rotation.x = Math.PI / 2 + 0.18;
    hoodCollar.position.set(0, 0.57, -0.02);
    upperBodyGroup.add(hoodCollar);

    // Cyan Hoodie Drawstrings on chest
    const leftString = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.01, 0.24, 8),
      cyanTrimMat
    );
    leftString.position.set(-0.065, 0.42, 0.185);
    leftString.rotation.x = 0.12;
    upperBodyGroup.add(leftString);

    const rightString = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.01, 0.24, 8),
      cyanTrimMat
    );
    rightString.position.set(0.065, 0.42, 0.185);
    rightString.rotation.x = 0.12;
    upperBodyGroup.add(rightString);

    // Studio Headphones resting around neck
    const headphoneBand = new THREE.Mesh(
      new THREE.TorusGeometry(0.16, 0.022, 12, 28, Math.PI * 1.25),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.25, metalness: 0.85 })
    );
    headphoneBand.rotation.x = Math.PI / 2 + 0.25;
    headphoneBand.rotation.z = -Math.PI * 0.12;
    headphoneBand.position.set(0, 0.6, 0.01);
    upperBodyGroup.add(headphoneBand);

    const earCupGeo = new THREE.CylinderGeometry(0.058, 0.058, 0.035, 20);
    const earCupRingGeo = new THREE.TorusGeometry(0.052, 0.007, 8, 24);
    [-0.155, 0.155].forEach((xPos) => {
      const cup = new THREE.Mesh(
        earCupGeo,
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.9 })
      );
      cup.position.set(xPos, 0.56, 0.11);
      cup.rotation.z = Math.PI / 2;
      cup.rotation.y = 0.35;
      upperBodyGroup.add(cup);

      const cupRing = new THREE.Mesh(earCupRingGeo, cyanTrimMat);
      cupRing.position.set(xPos * 1.08, 0.56, 0.12);
      cupRing.rotation.y = Math.PI / 2 - 0.35;
      upperBodyGroup.add(cupRing);
    });

    // Arms & Hands reaching to Keyboard
    const createArm = (side: -1 | 1) => {
      const armGroup = new THREE.Group();
      armGroup.position.set(side * 0.33, 0.48, 0);

      const upperArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.075, 0.065, 0.38, 16),
        hoodieMat
      );
      upperArm.position.set(side * 0.03, -0.16, 0.06);
      upperArm.rotation.z = side * 0.18;
      upperArm.rotation.x = -0.42;
      armGroup.add(upperArm);

      const forearm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.062, 0.052, 0.34, 16),
        hoodieMat
      );
      forearm.position.set(side * -0.02, -0.34, 0.22);
      forearm.rotation.x = -1.25;
      forearm.rotation.z = side * -0.22;
      armGroup.add(forearm);

      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.052, 16, 16), skinMat);
      hand.scale.set(1, 0.65, 1.25);
      hand.position.set(side * -0.07, -0.39, 0.38);
      armGroup.add(hand);

      return armGroup;
    };

    const leftArmGroup = createArm(-1);
    const rightArmGroup = createArm(1);
    upperBodyGroup.add(leftArmGroup);
    upperBodyGroup.add(rightArmGroup);

    // Neck
    const neckMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.085, 0.095, 0.18, 16),
      skinMat
    );
    neckMesh.position.set(0, 0.65, 0.01);
    upperBodyGroup.add(neckMesh);

    // =========================================================================
    // ANIME HEAD, EXPRESSIVE FACE & LAYERED SPIKY ANIME HAIR
    // =========================================================================
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.91, 0.02);
    upperBodyGroup.add(headGroup);

    // Sculpted Anime Head cranium + tapered jawline
    const headBaseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.255, 32, 32), skinMat);
    headBaseMesh.scale.set(0.95, 1.06, 0.94);
    headBaseMesh.castShadow = true;
    headGroup.add(headBaseMesh);

    // Anime Face Plane curved onto the front of the head
    const openEyesTexture = createAnimeFaceTexture(maxAniso, false);
    const blinkEyesTexture = createAnimeFaceTexture(maxAniso, true);
    const faceGeo = new THREE.SphereGeometry(
      0.257,
      32,
      32,
      -Math.PI * 0.32,
      Math.PI * 0.64,
      Math.PI * 0.25,
      Math.PI * 0.55
    );
    // Rotate so the spherical patch faces +Z directly toward the viewer
    faceGeo.rotateY(-Math.PI / 2);
    const faceMat = new THREE.MeshStandardMaterial({
      map: openEyesTexture,
      roughness: 0.5,
      metalness: 0.02,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    headGroup.add(faceMesh);

    // Ears
    [-1, 1].forEach((side) => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.048, 12, 12), skinMat);
      ear.scale.set(0.45, 1.15, 0.7);
      ear.position.set(side * 0.242, -0.02, -0.01);
      headGroup.add(ear);
    });

    // Dark Slightly Messy Layered Anime Hair (16 sculpted locks + crown base)
    const hairGroup = new THREE.Group();
    headGroup.add(hairGroup);

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.38,
      metalness: 0.32,
    });

    // Back/Crown hair volume cap
    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.272, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.68),
      hairMat
    );
    hairCap.position.set(0, 0.03, -0.02);
    hairCap.rotation.x = -0.22;
    hairGroup.add(hairCap);

    // Sculpted anime bangs, crown spikes, and side locks
    const hairSpikesConfig: Array<{
      pos: [number, number, number];
      rot: [number, number, number];
      scale: [number, number, number];
    }> = [
      // Front messy anime bangs framing forehead & eyes
      { pos: [0.0, 0.2, 0.22], rot: [0.68, 0.0, -0.08], scale: [0.075, 0.24, 0.05] },
      { pos: [-0.09, 0.19, 0.21], rot: [0.62, -0.2, 0.22], scale: [0.08, 0.25, 0.05] },
      { pos: [0.09, 0.19, 0.21], rot: [0.62, 0.2, -0.24], scale: [0.08, 0.24, 0.05] },
      { pos: [-0.17, 0.15, 0.16], rot: [0.45, -0.45, 0.42], scale: [0.075, 0.26, 0.05] },
      { pos: [0.17, 0.15, 0.16], rot: [0.45, 0.45, -0.42], scale: [0.075, 0.26, 0.05] },
      // Side locks near temples
      { pos: [-0.23, 0.05, 0.08], rot: [0.15, -0.6, 0.35], scale: [0.07, 0.28, 0.06] },
      { pos: [0.23, 0.05, 0.08], rot: [0.15, 0.6, -0.35], scale: [0.07, 0.28, 0.06] },
      // Dynamic messy top & crown anime spikes
      { pos: [-0.08, 0.28, 0.04], rot: [-0.35, 0.1, 0.48], scale: [0.09, 0.25, 0.07] },
      { pos: [0.09, 0.29, 0.02], rot: [-0.28, -0.1, -0.52], scale: [0.09, 0.26, 0.07] },
      { pos: [0.0, 0.31, -0.04], rot: [-0.55, 0.0, 0.12], scale: [0.095, 0.24, 0.07] },
      { pos: [-0.18, 0.23, -0.05], rot: [-0.25, 0.3, 0.85], scale: [0.085, 0.24, 0.07] },
      { pos: [0.18, 0.23, -0.05], rot: [-0.25, -0.3, -0.85], scale: [0.085, 0.24, 0.07] },
      // Back nape spikes
      { pos: [-0.14, 0.06, -0.23], rot: [-0.75, -0.25, 0.4], scale: [0.08, 0.22, 0.06] },
      { pos: [0.14, 0.06, -0.23], rot: [-0.75, 0.25, -0.4], scale: [0.08, 0.22, 0.06] },
      { pos: [0.0, 0.08, -0.25], rot: [-0.85, 0.0, 0.0], scale: [0.09, 0.22, 0.06] },
    ];

    const spikeBaseGeo = new THREE.ConeGeometry(1, 1, 6);
    hairSpikesConfig.forEach((cfg) => {
      const spike = new THREE.Mesh(spikeBaseGeo, hairMat);
      spike.position.set(...cfg.pos);
      spike.rotation.set(...cfg.rot);
      spike.scale.set(...cfg.scale);
      hairGroup.add(spike);
    });

    // =========================================================================
    // 4. ABSTRACT 3D NEURAL NETWORK CONSTELLATION (RIGHT FLANK)
    // =========================================================================
    const neuralGroup = new THREE.Group();
    neuralGroup.position.set(1.38, 0.42, -0.32);
    worldGroup.add(neuralGroup);

    const coreOrb = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.24, 1),
      new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x0891b2,
        emissiveIntensity: 0.45,
        wireframe: true,
      })
    );
    neuralGroup.add(coreOrb);

    const innerCoreOrb = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.13, 0),
      new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        emissive: 0x7c3aed,
        emissiveIntensity: 0.7,
        roughness: 0.2,
        metalness: 0.8,
      })
    );
    neuralGroup.add(innerCoreOrb);

    const orbitRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.36, 0.008, 12, 48),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.55 })
    );
    orbitRing.rotation.x = Math.PI / 3;
    neuralGroup.add(orbitRing);

    // =========================================================================
    // 5. SIX INTERACTIVE FLOATING HOLOGRAPHIC DEVELOPMENT CARDS (RAYCAST LAYER 1)
    // =========================================================================
    const hologramMeshes: THREE.Mesh[] = [];
    const hologramTextures = new Map<string, THREE.CanvasTexture>();
    const hologramGroup = new THREE.Group();
    worldGroup.add(hologramGroup);

    const cardPlaneGeo = new THREE.PlaneGeometry(1.18, 0.44);

    HOLOGRAPHIC_NODES.forEach((node) => {
      const isSelected = node.id === stateRef.current.selectedNodeId;
      const tex = createHologramCardTexture(node, isSelected, maxAniso);
      hologramTextures.set(node.id, tex);

      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const cardMesh = new THREE.Mesh(cardPlaneGeo, mat);
      cardMesh.position.set(...node.position);
      cardMesh.lookAt(0, node.position[1] * 0.85, 4.8);
      cardMesh.layers.enable(1);
      cardMesh.userData = {
        nodeId: node.id,
        basePosition: new THREE.Vector3(...node.position),
        phaseOffset: Math.random() * Math.PI * 2,
      };

      hologramGroup.add(cardMesh);
      hologramMeshes.push(cardMesh);
    });

    // =========================================================================
    // 6. INSTANCED GEOMETRIC PARTICLE SYSTEM (OPTIMIZED INSTANCEDMESH)
    // =========================================================================
    const particleCount = isSoftwareGl ? 28 : 48;
    const particleGeo = new THREE.OctahedronGeometry(0.028, 0);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
    });
    const particleInstanced = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    particleInstanced.frustumCulled = false;

    const particleSeeds: Array<{ x: number; y: number; z: number; speed: number; phase: number }> =
      [];
    const colorHelper = new THREE.Color();
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 1.6 + (i % 5) * 0.38;
      const px = Math.cos(angle) * radius;
      const py = -0.9 + (i % 7) * 0.45;
      const pz = Math.sin(angle) * radius * 0.75 - 0.3;

      particleSeeds.push({
        x: px,
        y: py,
        z: pz,
        speed: 0.35 + (i % 4) * 0.12,
        phase: i * 0.7,
      });

      _dummyObj.position.set(px, py, pz);
      const s = 0.75 + (i % 3) * 0.25;
      _dummyObj.scale.set(s, s, s);
      _dummyObj.updateMatrix();
      particleInstanced.setMatrixAt(i, _dummyObj.matrix);

      colorHelper.setHex(i % 2 === 0 ? 0x22d3ee : 0x8b5cf6);
      particleInstanced.setColorAt(i, colorHelper);
    }
    particleInstanced.instanceMatrix.needsUpdate = true;
    if (particleInstanced.instanceColor) particleInstanced.instanceColor.needsUpdate = true;
    particleInstanced.computeBoundingSphere();
    worldGroup.add(particleInstanced);

    // Pre-compile shaders on hardware GPUs
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // =========================================================================
    // 7. RAYCASTING & POINTER / DRAG INTERACTION HANDLERS
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    let lastRaycastTime = 0;

    const getNormalizedPointer = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      _pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      _pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerDown = (e: PointerEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStartX = e.clientX;
      stateRef.current.dragStartY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      getNormalizedPointer(e.clientX, e.clientY);
      stateRef.current.pointerX = _pointerNdc.x;
      stateRef.current.pointerY = _pointerNdc.y;

      if (stateRef.current.isDragging) {
        const dx = (e.clientX - stateRef.current.dragStartX) * 0.005;
        const dy = (e.clientY - stateRef.current.dragStartY) * 0.004;
        stateRef.current.dragStartX = e.clientX;
        stateRef.current.dragStartY = e.clientY;
        stateRef.current.dragYaw = THREE.MathUtils.clamp(
          stateRef.current.dragYaw + dx,
          -0.55,
          0.55
        );
        stateRef.current.dragPitch = THREE.MathUtils.clamp(
          stateRef.current.dragPitch + dy,
          -0.22,
          0.28
        );
      }

      // Throttled raycast for hover state
      const now = performance.now();
      if (now - lastRaycastTime > 50) {
        lastRaycastTime = now;
        raycaster.setFromCamera(_pointerNdc, camera);
        const hits = raycaster.intersectObjects(hologramMeshes, false);
        if (hits.length > 0) {
          const hitId = hits[0].object.userData.nodeId as string;
          setHoveredNodeId(hitId);
          renderer.domElement.style.cursor = 'pointer';
        } else {
          setHoveredNodeId(null);
          renderer.domElement.style.cursor = stateRef.current.isDragging ? 'grabbing' : 'grab';
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      const moveDist = Math.hypot(
        e.clientX - stateRef.current.dragStartX,
        e.clientY - stateRef.current.dragStartY
      );
      stateRef.current.isDragging = false;
      renderer.domElement.style.cursor = 'grab';

      if (moveDist < 6) {
        getNormalizedPointer(e.clientX, e.clientY);
        raycaster.setFromCamera(_pointerNdc, camera);
        const hits = raycaster.intersectObjects(hologramMeshes, false);
        if (hits.length > 0) {
          const hitId = hits[0].object.userData.nodeId as string;
          const found = HOLOGRAPHIC_NODES.find((n) => n.id === hitId);
          if (found) {
            setSelectedNode(found);
          }
        }
      }
    };

    const domElem = renderer.domElement;
    domElem.style.cursor = 'grab';
    domElem.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);

    // Pause rendering when scrolled out of view or tab hidden
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          stateRef.current.isVisible = entries[0].isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 640;
      const h = container.clientHeight || 540;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // =========================================================================
    // 8. ANIMATION LOOP WITH SOFTWARE-WEBGL FENCE PACING & DAMPING
    // =========================================================================
    let frameId = 0;
    let isDisposed = false;
    const clock = new THREE.Clock();
    let prevSelectedId = stateRef.current.selectedNodeId;
    let isCurrentlyBlinking = false;

    function afterDraw(cb: () => void) {
      if (isDisposed) return;
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (isDisposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    function tick() {
      if (isDisposed) return;

      if (!stateRef.current.isVisible || document.hidden) {
        frameId = window.setTimeout(tick, 200);
        return;
      }

      const rawDelta = clock.getDelta();
      const delta = Math.min(rawDelta, 0.1);
      const elapsed = clock.getElapsedTime();
      const isReduced = stateRef.current.reducedMotion;

      // Update hologram card texture if selection changed
      if (prevSelectedId !== stateRef.current.selectedNodeId) {
        prevSelectedId = stateRef.current.selectedNodeId;
        HOLOGRAPHIC_NODES.forEach((node, idx) => {
          const oldTex = hologramTextures.get(node.id);
          const newTex = createHologramCardTexture(
            node,
            node.id === prevSelectedId,
            maxAniso
          );
          hologramTextures.set(node.id, newTex);
          const meshMat = hologramMeshes[idx].material as THREE.MeshBasicMaterial;
          meshMat.map = newTex;
          meshMat.needsUpdate = true;
          oldTex?.dispose();
        });
      }

      // Smooth Camera Preset Interpolation
      const preset = stateRef.current.cameraPreset;
      if (preset === 'character') {
        _vec3A.set(0.22, 0.85, 3.35);
        _vec3B.set(0.2, 0.55, 0);
      } else if (preset === 'holograms') {
        _vec3A.set(0, 0.95, 6.35);
        _vec3B.set(0, 0.45, 0.25);
      } else {
        _vec3A.set(0, 1.25, 5.55);
        _vec3B.set(0, 0.35, 0);
      }

      camera.position.x = THREE.MathUtils.damp(camera.position.x, _vec3A.x, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _vec3A.y, 4, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _vec3A.z, 4, delta);
      camera.lookAt(_vec3B);

      // Scene Drag & Mouse Parallax Rotation
      const targetWorldYaw =
        stateRef.current.dragYaw + (isReduced ? 0 : stateRef.current.pointerX * 0.14);
      const targetWorldPitch =
        stateRef.current.dragPitch + (isReduced ? 0 : -stateRef.current.pointerY * 0.08);
      worldGroup.rotation.y = THREE.MathUtils.damp(
        worldGroup.rotation.y,
        targetWorldYaw,
        5,
        delta
      );
      worldGroup.rotation.x = THREE.MathUtils.damp(
        worldGroup.rotation.x,
        targetWorldPitch,
        5,
        delta
      );

      // Character Head Mouse-Tracking & Idle Breathing/Typing/Blinking
      const targetHeadYaw = isReduced ? 0 : stateRef.current.pointerX * 0.32;
      const targetHeadPitch = isReduced
        ? 0.05
        : -stateRef.current.pointerY * 0.2 + Math.sin(elapsed * 1.6) * 0.03;
      headGroup.rotation.y = THREE.MathUtils.damp(headGroup.rotation.y, targetHeadYaw, 6, delta);
      headGroup.rotation.x = THREE.MathUtils.damp(
        headGroup.rotation.x,
        targetHeadPitch,
        6,
        delta
      );

      if (!isReduced) {
        // Subtle breathing & typing motion
        upperBodyGroup.position.y = 0.12 + Math.sin(elapsed * 2.1) * 0.012;
        leftArmGroup.rotation.x = Math.sin(elapsed * 6.5) * 0.025;
        rightArmGroup.rotation.x = Math.cos(elapsed * 6.5) * 0.025;

        // Periodic natural anime eye blink every ~4.2 seconds
        const blinkCycle = elapsed % 4.2;
        const shouldBlink = blinkCycle > 4.04;
        if (shouldBlink !== isCurrentlyBlinking) {
          isCurrentlyBlinking = shouldBlink;
          faceMat.map = shouldBlink ? blinkEyesTexture : openEyesTexture;
          faceMat.needsUpdate = true;
        }

        // Neural network rotation
        coreOrb.rotation.y = elapsed * 0.45;
        coreOrb.rotation.x = elapsed * 0.25;
        innerCoreOrb.rotation.y = -elapsed * 0.7;
        orbitRing.rotation.z = elapsed * 0.35;

        // Floating Holographic Cards + Parallax
        hologramMeshes.forEach((mesh) => {
          const base = mesh.userData.basePosition as THREE.Vector3;
          const phase = mesh.userData.phaseOffset as number;
          const isSelected = mesh.userData.nodeId === stateRef.current.selectedNodeId;
          mesh.position.y = base.y + Math.sin(elapsed * 1.7 + phase) * 0.065;
          mesh.position.x = base.x + stateRef.current.pointerX * 0.06;
          const targetScale = isSelected ? 1.12 : 1.0;
          const s = THREE.MathUtils.damp(mesh.scale.x, targetScale, 6, delta);
          mesh.scale.set(s, s, 1);
        });

        // Gentle particle drift
        for (let i = 0; i < particleCount; i++) {
          const seed = particleSeeds[i];
          const py = seed.y + Math.sin(elapsed * seed.speed + seed.phase) * 0.14;
          _dummyObj.position.set(seed.x, py, seed.z);
          _dummyObj.rotation.y = elapsed * 0.4 + seed.phase;
          const s = 0.75 + (i % 3) * 0.22;
          _dummyObj.scale.set(s, s, s);
          _dummyObj.updateMatrix();
          particleInstanced.setMatrixAt(i, _dummyObj.matrix);
        }
        particleInstanced.instanceMatrix.needsUpdate = true;

        // Soft lighting response to cursor interaction
        cyanRimLight.position.x = -2.8 + stateRef.current.pointerX * 0.6;
        violetRimLight.position.y = 1.9 + stateRef.current.pointerY * 0.5;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      observer.disconnect();
      domElem.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);

      monitorTexture.dispose();
      openEyesTexture.dispose();
      blinkEyesTexture.dispose();
      hologramTextures.forEach((t) => t.dispose());
      envTexture.dispose();
      renderer.dispose();
    };
  }, []);

  const handleSelectNodeAndNavigate = (node: HolographicNodeInfo) => {
    setSelectedNode(node);
    onSelectHologramNode(node.targetSection, node.filterCategory, node.projectId);
  };

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[600px] rounded-2xl bg-[#090E1D] border border-slate-800/80 overflow-hidden select-none">
      {/* Top-Left Minimal Spec Header (100% Unobstructed Center) */}
      <div className="absolute top-3.5 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#060913]/85 px-3 py-1.5 rounded-lg border border-slate-800/80">
          <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>3D AI WORKSPACE</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-300 hidden sm:inline">DRAG TO ROTATE · CLICK NODES</span>
          <span className="text-slate-300 sm:hidden">INTERACTIVE</span>
        </div>

        <button
          type="button"
          onClick={handleResetView}
          className="pointer-events-auto inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-[#060913]/90 hover:bg-slate-900 rounded-lg border border-slate-800 transition-colors cursor-pointer"
          title="Reset 3D camera angle"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span className="whitespace-nowrap">Reset View</span>
        </button>
      </div>

      {/* Dedicated Isolated WebGL Canvas Mount Ref */}
      {webglSupported ? (
        <div
          ref={canvasMountRef}
          className="w-full h-full"
          aria-label="Interactive 3D anime-inspired developer workstation scene with floating technology nodes"
          role="img"
        />
      ) : (
        /* Graceful Static Visual Fallback if WebGL is unavailable */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#080E1E] to-[#0D162C]">
          <div className="w-24 h-24 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4">
            <Layers className="w-10 h-10 text-cyan-400" />
          </div>
          <p className="font-display text-lg font-semibold text-white mb-1">
            Chinmay Choudhari · AI &amp; Software Workstation
          </p>
          <p className="text-sm text-slate-400 max-w-md mb-4">
            Interactive node explorer active in lightweight 2D mode. Select any domain node below to jump directly to matching projects and skills.
          </p>
        </div>
      )}

      {/* Hover Tooltip Banner (Top-Center when hovering a 3D hologram) */}
      {hoveredNodeId && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-10 pointer-events-none px-3 py-1 rounded-md bg-[#060913]/90 border border-cyan-500/40 text-xs font-mono text-cyan-300 whitespace-nowrap">
          Click node to inspect {HOLOGRAPHIC_NODES.find((n) => n.id === hoveredNodeId)?.label}
        </div>
      )}

      {/* Unified Collapsible Bottom HUD Dock (Zero Center Viewport Occlusion) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 w-[94%] max-w-[600px]">
        <div className="flex justify-center mb-1">
          <button
            type="button"
            onClick={() => setHudCollapsed((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono text-slate-300 hover:text-white bg-[#060913]/95 border border-slate-800 rounded-t-lg transition-colors cursor-pointer"
            aria-expanded={!hudCollapsed}
          >
            {hudCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                <span className="whitespace-nowrap">Show Scene Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                <span className="whitespace-nowrap">Hide Scene Controls</span>
              </>
            )}
          </button>
        </div>

        {!hudCollapsed && (
          <div className="bg-[#060913]/95 border border-slate-800/90 rounded-xl p-3 shadow-2xl">
            {/* Selected Holographic Node Inspector Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-800/80">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span>{selectedNode.label}</span>
                  <span aria-hidden="true" className="text-slate-600">
                    ·
                  </span>
                  <span className="text-slate-400">{selectedNode.category}</span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                  {selectedNode.summary}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleSelectNodeAndNavigate(selectedNode)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Explore Section</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Interactive Hologram Node Selector + Camera Presets */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Holographic nodes">
                {HOLOGRAPHIC_NODES.map((node) => {
                  const isActive = selectedNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setSelectedNode(node)}
                      className={`px-2 py-1 text-[11px] font-mono rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                          : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {node.label === 'SOFTWARE ENGINEERING' ? 'SDE' : node.label}
                    </button>
                  );
                })}
              </div>

              {/* Camera Angle Switcher */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-900/90 p-0.5 rounded-lg border border-slate-800">
                <Eye className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
                {(['overview', 'character', 'holograms'] as CameraPreset[]).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setCameraPreset(preset)}
                    className={`px-2 py-1 text-[11px] font-mono rounded-md capitalize transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      cameraPreset === preset
                        ? 'bg-violet-500/25 text-violet-200 border border-violet-400/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperScene3D;
