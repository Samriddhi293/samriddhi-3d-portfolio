import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text, Line, Sparkles, Html } from "@react-three/drei";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

const CONSTELLATION_LAYOUT = {
  Languages: {
    color: "#fde047",
    anchor: [-2.1, 0.95, 0],
    headerOffset: [0, 1.15, 0],
    offsets: [
      [-0.65, 0.55, 0],
      [0.05, 0.8, 0.05],
      [0.65, 0.42, -0.05],
      [0.45, -0.25, 0],
      [-0.25, -0.45, 0.05],
    ],
  },
  "Libraries & Frameworks": {
    color: "#38bdf8",
    anchor: [2.1, 0.95, 0],
    headerOffset: [0, 1.15, 0],
    offsets: [
      [-0.65, 0.55, 0],
      [0.05, 0.8, -0.05],
      [0.65, 0.42, 0.05],
      [0.25, -0.25, 0],
    ],
  },
  "Tools & Databases": {
    color: "#c084fc",
    anchor: [-1.95, -1.05, 0.1],
    headerOffset: [0, 0.98, 0],
    offsets: [
      [-0.65, 0.35, 0],
      [0.0, 0.58, 0.05],
      [0.65, 0.3, -0.05],
      [0.2, -0.38, 0],
    ],
  },
  "Core Concepts": {
    color: "#f472b6",
    anchor: [1.95, -1.05, 0.1],
    headerOffset: [0, 0.98, 0],
    offsets: [
      [-0.75, 0.42, 0],
      [0.0, 0.62, -0.05],
      [0.75, 0.35, 0.05],
      [0.55, -0.32, 0],
      [-0.1, -0.45, 0.05],
      [-0.65, -0.25, 0],
    ],
  },
};

export default function SkillsConstellation({
  telescopePos,
  constellationCenter,
  scrollProgress,
  onSelectItem,
}) {
  const telescopeGroupRef = useRef();
  const domeGroupRef = useRef();
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const { skills } = PORTFOLIO_DATA;

  const constellations = useMemo(() => {
    const fallbackKeys = Object.keys(CONSTELLATION_LAYOUT);
    return Object.entries(skills).map(([category, items], catIdx) => {
      const cfg =
        CONSTELLATION_LAYOUT[category] ||
        CONSTELLATION_LAYOUT[fallbackKeys[catIdx % fallbackKeys.length]];
      const stars = items.map((skill, idx) => {
        const off = cfg.offsets[idx % cfg.offsets.length];
        return {
          name: skill,
          pos: [cfg.anchor[0] + off[0], cfg.anchor[1] + off[1], cfg.anchor[2] + off[2]],
        };
      });
      const linePoints = stars.map((s) => s.pos);
      return {
        category,
        color: cfg.color,
        anchor: cfg.anchor,
        headerOffset: cfg.headerOffset,
        stars,
        linePoints,
      };
    });
  }, [skills]);

  useFrame((_, delta) => {
    const t = scrollProgress.current;
    const passedThroughLens = t >= 0.89;

    if (telescopeGroupRef.current) {
      telescopeGroupRef.current.visible = !passedThroughLens;
    }

    const lensZoom = THREE.MathUtils.smoothstep(t, 0.89, 0.94);
    if (domeGroupRef.current) {
      domeGroupRef.current.visible = passedThroughLens;
      const s = 0.55 + lensZoom * 0.55;
      domeGroupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 1 - Math.exp(-12 * delta));
    }
  });

  return (
    <group>
      <group
        ref={telescopeGroupRef}
        position={telescopePos}
        onClick={(e) => {
          e.stopPropagation();
          onSelectItem({
            badge: "Rooftop Observatory",
            title: "Technical Skills Constellation",
            subtitle: "Languages, Libraries, Tools & Core CS Concepts",
            tech: Object.values(skills).flat(),
          });
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.42, 0.48, 0.08, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.25} />
        </mesh>

        {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.sin(angle) * 0.24, 0.74, Math.cos(angle) * 0.24]}
            rotation={[Math.cos(angle) * 0.22, 0, -Math.sin(angle) * 0.22]}
          >
            <cylinderGeometry args={[0.026, 0.036, 1.5, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.25} />
          </mesh>
        ))}

        <mesh position={[0, 1.46, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>

        <group position={[0, 1.52, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.32, 0.22, 1.15, 36]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.28} />
          </mesh>

          <mesh position={[0, 0, -0.52]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.36, 0.34, 0.36, 40, 1, true]} />
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.85}
              roughness={0.25}
              side={THREE.DoubleSide}
            />
          </mesh>

          <mesh position={[0, 0, -0.7]}>
            <torusGeometry args={[0.36, 0.02, 16, 48]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.15} />
          </mesh>

          <mesh position={[0, 0, -0.64]}>
            <torusGeometry args={[0.325, 0.012, 12, 48]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
          </mesh>

          <mesh position={[0, 0, -0.63]}>
            <circleGeometry args={[0.325, 48]} />
            <meshStandardMaterial
              color="#0ea5e9"
              emissive="#1d4ed8"
              emissiveIntensity={0.85}
              roughness={0.1}
              metalness={0.2}
              transparent
              opacity={0.82}
            />
          </mesh>

          <mesh position={[-0.28, 0.28, -0.25]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.045, 0.42, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.85} />
          </mesh>
        </group>
      </group>

      <group position={constellationCenter} rotation={[0, Math.PI, 0]} ref={domeGroupRef} visible={false}>
        <Sparkles count={90} scale={[6.5, 4, 2]} size={1.6} speed={0.25} color="#fde68a" />

        <Text
          position={[0, 2.35, 0]}
          fontSize={0.25}
          letterSpacing={0.24}
          color="#fde68a"
          outlineWidth={0.018}
          outlineColor="#070514"
        >
          SKILLS
        </Text>

        {constellations.map(({ category, color, anchor, headerOffset, stars, linePoints }) => (
          <group key={category}>
            <Text
              position={[
                anchor[0] + headerOffset[0],
                anchor[1] + headerOffset[1],
                anchor[2] + headerOffset[2],
              ]}
              fontSize={0.125}
              letterSpacing={0.14}
              color={color}
              anchorX="center"
              outlineWidth={0.014}
              outlineColor="#070514"
            >
              {category.toUpperCase()}
            </Text>

            <Line points={linePoints} color={color} lineWidth={1.4} transparent opacity={0.7} />

            {stars.map((star) => {
              const isHovered = hoveredSkill === star.name;
              return (
                <group
                  key={star.name}
                  position={star.pos}
                  onPointerOver={(e) => {
                    e.stopPropagation();
                    setHoveredSkill(star.name);
                    document.body.style.cursor = "pointer";
                  }}
                  onPointerOut={() => {
                    setHoveredSkill(null);
                    document.body.style.cursor = "auto";
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectItem({
                      badge: `${category} Constellation`,
                      title: star.name,
                      subtitle: `Core proficiency in ${category}`,
                      tech: skills[category],
                    });
                  }}
                >
                  <mesh scale={isHovered ? 1.5 : 1}>
                    <octahedronGeometry args={[0.075, 0]} />
                    <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={2.8} />
                  </mesh>
                  <mesh scale={isHovered ? 2.0 : 1.4}>
                    <sphereGeometry args={[0.09, 12, 12]} />
                    <meshBasicMaterial color={color} transparent opacity={0.25} />
                  </mesh>

                  <Text
                    position={[0, 0.16, 0]}
                    fontSize={isHovered ? 0.15 : 0.125}
                    color={isHovered ? "#ffffff" : "#f8fafc"}
                    anchorX="center"
                    outlineWidth={0.015}
                    outlineColor="#070514"
                  >
                    {star.name}
                  </Text>

                  {isHovered && (
                    <Html position={[0, -0.24, 0]} center distanceFactor={9}>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-950/95 border border-indigo-400 text-[10px] text-indigo-200 whitespace-nowrap">
                        {category}
                      </span>
                    </Html>
                  )}
                </group>
              );
            })}
          </group>
        ))}
      </group>
    </group>
  );
}