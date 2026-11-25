import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export default function ExperienceDeck({ position, onSelectItem }) {
  const radarDishRef = useRef();
  const globeRef = useRef();
  const [hoveredId, setHoveredId] = useState(null);
  const { experience } = PORTFOLIO_DATA;

  useFrame((_, delta) => {
    if (radarDishRef.current) radarDishRef.current.rotation.y += delta * 1.2;
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.45;
  });

  return (
    <group position={position}>
      {/* Warm Ceiling Light matching the About Room Lamp */}
      <pointLight position={[0, 3.0, -0.5]} intensity={4.2} distance={12} color="#fbbf24" />
      <pointLight position={[-1.9, 2.2, -1.5]} intensity={2.2} distance={7} color="#38bdf8" />

      {/* Studio Floor & Ceiling */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[8.4, 0.08, 5.8]} />
        <meshStandardMaterial color="#18132e" roughness={0.6} />
      </mesh>
      <mesh position={[0, 3.7, 0]}>
        <boxGeometry args={[8.4, 0.14, 5.8]} />
        <meshStandardMaterial color="#140f24" />
      </mesh>

      {/* Warm Hanging Cone Pendant Lamp right above EXPERIENCE */}
      <mesh position={[0, 3.32, -1.2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.65, 8]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      <mesh position={[0, 2.98, -1.2]}>
        <coneGeometry args={[0.26, 0.2, 20]} />
        <meshStandardMaterial color="#f59e0b" emissive="#fbbf24" emissiveIntensity={1.7} />
      </mesh>

      {/* Back Studio Wall */}
      <mesh position={[0, 1.85, -2.85]}>
        <boxGeometry args={[8.4, 3.6, 0.15]} />
        <meshStandardMaterial color="#1f183d" roughness={0.75} />
      </mesh>

      {/* Left Wall with Open Exit Doorway */}
      <mesh position={[-4.15, 1.85, 1.85]}>
        <boxGeometry args={[0.16, 3.6, 2.1]} />
        <meshStandardMaterial color="#1a1433" roughness={0.75} />
      </mesh>
      <mesh position={[-4.15, 1.85, -1.85]}>
        <boxGeometry args={[0.16, 3.6, 2.1]} />
        <meshStandardMaterial color="#1a1433" roughness={0.75} />
      </mesh>
      <mesh position={[-4.15, 3.05, 0]}>
        <boxGeometry args={[0.18, 1.2, 1.65]} />
        <meshStandardMaterial color="#1a1433" roughness={0.75} />
      </mesh>
      {/* Wooden Door Frame */}
      <mesh position={[-4.12, 1.22, 0.8]}>
        <boxGeometry args={[0.22, 2.45, 0.08]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      <mesh position={[-4.12, 1.22, -0.8]}>
        <boxGeometry args={[0.22, 2.45, 0.08]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      <mesh position={[-4.12, 2.45, 0]}>
        <boxGeometry args={[0.22, 0.08, 1.68]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      <Text
        position={[-4.02, 2.68, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.14}
        letterSpacing={0.12}
        color="#fde68a"
      >
        ROOF STAIRS →
      </Text>

      {/* Right Wall */}
      <mesh position={[4.15, 1.85, 0]}>
        <boxGeometry args={[0.15, 3.6, 5.8]} />
        <meshStandardMaterial color="#17122e" roughness={0.75} />
      </mesh>

      {/* Highlighted Section Title under the Lamp */}
      <Text position={[0, 2.52, -2.7]} fontSize={0.38} letterSpacing={0.22} color="#fde68a">
        EXPERIENCE
      </Text>

      {/* ============================================================ */}
      {/* STATION 1: IMD BHOPAL METEOROLOGICAL & RADAR LAB             */}
      {/* ============================================================ */}
      <group
        position={[-1.95, 0.82, -1.65]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredId("imd");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoveredId(null);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          const item = experience[0];
          onSelectItem({
            badge: item.period,
            title: item.title,
            subtitle: item.org,
            description: item.summary,
            list: item.highlights,
            tech: item.tech,
          });
        }}
      >
        {/* Warm Oak Lab Table */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.55, 0.08, 1.15]} />
          <meshStandardMaterial color="#451a03" roughness={0.45} />
        </mesh>
        {[-1.15, 1.15].map((x, i) => (
          <mesh key={i} position={[x, -0.4, 0]}>
            <boxGeometry args={[0.08, 0.8, 0.95]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} />
          </mesh>
        ))}

        {/* 1. Spinning Atmospheric Weather Globe (Left on Desk) */}
        <group position={[-0.75, 0.36, 0]}>
          <mesh position={[0, -0.28, 0]}>
            <cylinderGeometry args={[0.14, 0.18, 0.06, 16]} />
            <meshStandardMaterial color="#d97706" metalness={0.8} />
          </mesh>
          <mesh ref={globeRef}>
            <sphereGeometry args={[0.24, 20, 20]} />
            <meshStandardMaterial
              color="#0284c7"
              emissive="#38bdf8"
              emissiveIntensity={hoveredId === "imd" ? 0.9 : 0.35}
              wireframe
            />
          </mesh>
        </group>

        {/* 2. 3D Rainfall / ML Prediction Data Bars (Center on Desk) */}
        <group position={[0, 0.05, 0]}>
          {[0.24, 0.42, 0.32, 0.54, 0.38].map((h, idx) => (
            <mesh key={idx} position={[(idx - 2) * 0.14, h / 2, 0]}>
              <boxGeometry args={[0.09, h, 0.09]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive={hoveredId === "imd" ? "#38bdf8" : "#6366f1"}
                emissiveIntensity={hoveredId === "imd" ? 1.1 : 0.45}
              />
            </mesh>
          ))}
        </group>

        {/* 3. Spinning Doppler Radar Dish (Right on Desk) */}
        <group position={[0.78, 0.32, 0]} ref={radarDishRef}>
          <mesh position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.06, 0.12, 0.16, 12]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
          <mesh rotation={[0.45, 0, 0]}>
            <coneGeometry args={[0.28, 0.24, 16, 1, true]} />
            <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.9} wireframe />
          </mesh>
        </group>

        <Text position={[0, 1.18, -0.95]} fontSize={0.18} color="#fde68a" anchorX="center">
          {experience[0].title}
        </Text>
        <Text position={[0, 0.96, -0.95]} fontSize={0.105} color="#cbd5e1" anchorX="center">
          {experience[0].org}
        </Text>

        {hoveredId === "imd" && (
          <Html position={[0, 0.95, 0]} center distanceFactor={8}>
            <div className="px-3 py-1 rounded-full bg-amber-300 text-slate-950 text-xs font-bold shadow-lg whitespace-nowrap">
              Inspect IMD Internship
            </div>
          </Html>
        )}
      </group>

      {/* ============================================================ */}
      {/* STATION 2: COLLEGE FESTIVAL & LOGISTICS COMMAND DESK         */}
      {/* ============================================================ */}
      <group
        position={[1.95, 0.82, -1.65]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredId("events");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoveredId(null);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          const item = experience[1];
          onSelectItem({
            badge: item.period,
            title: item.title,
            subtitle: item.org,
            description: item.summary,
            list: item.highlights,
            tech: item.tech,
          });
        }}
      >
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.55, 0.08, 1.15]} />
          <meshStandardMaterial color="#451a03" roughness={0.45} />
        </mesh>
        {[-1.15, 1.15].map((x, i) => (
          <mesh key={i} position={[x, -0.4, 0]}>
            <boxGeometry args={[0.08, 0.8, 0.95]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} />
          </mesh>
        ))}

        {/* 1. Miniature Illuminated Festival Event Stage Model */}
        <group position={[-0.45, 0.05, -0.05]}>
          {/* Stage Deck */}
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[1.1, 0.08, 0.65]} />
            <meshStandardMaterial color="#1e1b4b" />
          </mesh>
          {/* Stage Truss Pillars & Top Light Bar */}
          {[-0.48, 0.48].map((px, i) => (
            <mesh key={i} position={[px, 0.34, -0.22]}>
              <cylinderGeometry args={[0.025, 0.025, 0.56, 10]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.85} />
            </mesh>
          ))}
          <mesh position={[0, 0.6, -0.22]}>
            <boxGeometry args={[1.05, 0.05, 0.05]} />
            <meshStandardMaterial
              color="#c084fc"
              emissive={hoveredId === "events" ? "#f472b6" : "#a855f7"}
              emissiveIntensity={hoveredId === "events" ? 1.8 : 0.9}
            />
          </mesh>
        </group>

        {/* 2. Event Schedule Clipboard & Walkie-Talkie Beacon (Right on Desk) */}
        <group position={[0.62, 0.06, 0.08]}>
          {/* Clipboard */}
          <mesh rotation={[0, -0.25, 0]}>
            <boxGeometry args={[0.42, 0.03, 0.55]} />
            <meshStandardMaterial color="#f8fafc" emissive="#fbbf24" emissiveIntensity={0.2} />
          </mesh>
          {/* Walkie-Talkie / Command Beacon */}
          <mesh position={[0.35, 0.14, -0.1]}>
            <boxGeometry args={[0.12, 0.26, 0.08]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0.35, 0.32, -0.1]}>
            <cylinderGeometry args={[0.012, 0.012, 0.16, 8]} />
            <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.5} />
          </mesh>
        </group>

        <Text position={[0, 1.18, -0.95]} fontSize={0.17} color="#fde68a" anchorX="center">
          {experience[1].title}
        </Text>
        <Text position={[0, 0.96, -0.95]} fontSize={0.105} color="#cbd5e1" anchorX="center">
          {experience[1].org}
        </Text>

        {hoveredId === "events" && (
          <Html position={[0, 0.95, 0]} center distanceFactor={8}>
            <div className="px-3 py-1 rounded-full bg-amber-300 text-slate-950 text-xs font-bold shadow-lg whitespace-nowrap">
              Inspect Leadership Role
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}