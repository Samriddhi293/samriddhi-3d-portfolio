import React, { useState } from "react";
import { Text } from "@react-three/drei";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export default function ProjectsDeck({ position, onSelectItem }) {
  const { projects } = PORTFOLIO_DATA;
  const [activeIndex, setActiveIndex] = useState(0);
  const current = projects[activeIndex];

  return (
    <group position={position}>
      <pointLight position={[0, 3.2, 0.5]} intensity={4} distance={14} color="#fbbf24" />

      {/* Rooftop Terrace Deck — starts cleanly at the top of the stairs (x = -3.55) so nothing overhangs the stairwell! */}
      <mesh position={[0.45, 0.04, 1.5]}>
        <boxGeometry args={[6.8, 0.1, 7.6]} />
        <meshStandardMaterial color="#1a1530" roughness={0.65} />
      </mesh>

      {/* Rooftop Pergola Pillars & Overhead Beam */}
      {[-3.1, 3.1].map((xPos, i) => (
        <mesh key={i} position={[xPos, 1.85, -1.6]}>
          <boxGeometry args={[0.16, 3.6, 0.16]} />
          <meshStandardMaterial color="#272042" metalness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, 3.65, -1.6]}>
        <boxGeometry args={[6.6, 0.2, 0.35]} />
        <meshStandardMaterial color="#1e1938" />
      </mesh>

      <Text position={[0, 3.25, -1.4]} fontSize={0.38} letterSpacing={0.24} color="#fde68a">
        PROJECTS
      </Text>

      {/* Left Side: Full Project Selector Kiosk */}
      <group position={[-1.85, 1.35, -1.1]} rotation={[0, 0.16, 0]}>
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.07, 0.11, 1.3, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <mesh>
          <boxGeometry args={[1.75, 1.65, 0.12]} />
          <meshStandardMaterial color="#141129" roughness={0.4} />
        </mesh>
        <Text position={[0, 0.55, 0.08]} fontSize={0.115} color="#fde68a" anchorX="center">
          SELECT PROJECT
        </Text>

        {projects.map((proj, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <group
              key={proj.id}
              position={[0, 0.12 - idx * 0.52, 0.09]}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(idx);
              }}
              onPointerOver={() => (document.body.style.cursor = "pointer")}
              onPointerOut={() => (document.body.style.cursor = "auto")}
            >
              <mesh>
                <boxGeometry args={[1.48, 0.38, 0.05]} />
                <meshStandardMaterial
                  color={isSelected ? "#6366f1" : "#1e1b4b"}
                  emissive={isSelected ? "#a855f7" : "#000000"}
                  emissiveIntensity={isSelected ? 0.65 : 0}
                />
              </mesh>
              <Text position={[0, 0, 0.035]} fontSize={0.13} color="#ffffff" anchorX="center">
                {proj.title}
              </Text>
            </group>
          );
        })}
      </group>

      {/* Right Side: Showcase Display Board */}
      <group
        position={[0.95, 1.5, -1.25]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectItem({
            badge: `Project 0${activeIndex + 1} / 0${projects.length}`,
            title: current.title,
            subtitle: current.tagline,
            description: current.description,
            tech: current.tech,
            github: current.github,
            live: current.live,
          });
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <mesh>
          <boxGeometry args={[3.45, 2.15, 0.1]} />
          <meshStandardMaterial color="#15122b" emissive="#4f46e5" emissiveIntensity={0.22} />
        </mesh>

        <Text position={[-1.45, 0.8, 0.07]} fontSize={0.11} color="#fbbf24" anchorX="left">
          {`0${activeIndex + 1} / 0${projects.length}`}
        </Text>
        <Text position={[-1.45, 0.45, 0.07]} fontSize={0.23} color="#ffffff" anchorX="left">
          {current.title}
        </Text>
        <Text position={[-1.45, 0.16, 0.07]} fontSize={0.11} color="#c4b5fd" anchorX="left">
          {current.tagline}
        </Text>
        <Text
          position={[-1.45, -0.3, 0.07]}
          fontSize={0.1}
          maxWidth={2.85}
          lineHeight={1.4}
          color="#e2e8f0"
          anchorX="left"
        >
          {current.description}
        </Text>
        <Text position={[-1.45, -0.82, 0.07]} fontSize={0.095} color="#38bdf8" anchorX="left">
          {current.tech.join("  •  ")}
        </Text>
      </group>
    </group>
  );
}