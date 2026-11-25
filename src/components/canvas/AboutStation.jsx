import React, { useState } from "react";
import { Text, Html } from "@react-three/drei";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export default function AboutStation({ position, onSelectItem }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const { about } = PORTFOLIO_DATA;

  return (
    <group position={position}>
      {/* Warm Indoor Room Light */}
      <pointLight position={[0, 3.1, 1.5]} intensity={4.2} distance={12} color="#fbbf24" />
      <pointLight position={[-1.8, 2.2, 0.5]} intensity={2.2} distance={6} color="#fde68a" />

      {/* Floor, Ceiling & Walls */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[7.6, 0.08, 7.6]} />
        <meshStandardMaterial color="#1f172a" roughness={0.65} />
      </mesh>
      <mesh position={[0, 3.75, 0]}>
        <boxGeometry args={[7.6, 0.15, 7.6]} />
        <meshStandardMaterial color="#150f21" />
      </mesh>
      <mesh position={[-3.75, 1.88, 0]}>
        <boxGeometry args={[0.15, 3.7, 7.6]} />
        <meshStandardMaterial color="#231934" roughness={0.75} />
      </mesh>
      <mesh position={[3.75, 1.88, 0]}>
        <boxGeometry args={[0.15, 3.7, 7.6]} />
        <meshStandardMaterial color="#1d142c" roughness={0.75} />
      </mesh>

      {/* Back Wall with Open Doorway */}
      <mesh position={[-2.25, 1.88, -3.75]}>
        <boxGeometry args={[3.1, 3.7, 0.15]} />
        <meshStandardMaterial color="#1b1329" roughness={0.75} />
      </mesh>
      <mesh position={[2.25, 1.88, -3.75]}>
        <boxGeometry args={[3.1, 3.7, 0.15]} />
        <meshStandardMaterial color="#1b1329" roughness={0.75} />
      </mesh>
      <mesh position={[0, 3.15, -3.75]}>
        <boxGeometry args={[1.6, 1.15, 0.15]} />
        <meshStandardMaterial color="#1b1329" roughness={0.75} />
      </mesh>
      <Text position={[0, 2.75, -3.65]} fontSize={0.14} letterSpacing={0.12} color="#fde68a">
        NEXT ROOM →
      </Text>

      {/* Hanging Pendant Lamp */}
      <mesh position={[0, 3.35, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      <mesh position={[0, 2.98, 0]}>
        <coneGeometry args={[0.28, 0.22, 20]} />
        <meshStandardMaterial color="#f59e0b" emissive="#fbbf24" emissiveIntensity={1.6} />
      </mesh>

      {/* ============================================================ */}
      {/* PORTFOLIO CUPBOARD (Left Wall)                               */}
      {/* ============================================================ */}
      <group position={[-3.05, 0.05, 0.2]} rotation={[0, Math.PI / 2.4, 0]}>
        <mesh position={[0, 1.45, -0.25]}>
          <boxGeometry args={[2.35, 2.8, 0.08]} />
          <meshStandardMaterial color="#2c1608" roughness={0.5} />
        </mesh>
        {[-1.14, 1.14].map((xSide, idx) => (
          <mesh key={idx} position={[xSide, 1.45, 0]}>
            <boxGeometry args={[0.08, 2.8, 0.56]} />
            <meshStandardMaterial color="#3f1f0b" roughness={0.45} />
          </mesh>
        ))}
        {[0.1, 0.92, 1.78, 2.65].map((yShelf, idx) => (
          <mesh key={idx} position={[0, yShelf, 0]}>
            <boxGeometry args={[2.32, 0.07, 0.54]} />
            <meshStandardMaterial color="#4a250e" roughness={0.4} />
          </mesh>
        ))}

        <Text position={[0, 3.05, 0.05]} fontSize={0.22} letterSpacing={0.16} color="#fde68a">
          PORTFOLIO CUPBOARD
        </Text>

        {/* TOP SHELF: Achievements & Gamak Trophies */}
        <group
          position={[0, 2.15, 0.05]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredItem("trophies");
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHoveredItem(null);
            document.body.style.cursor = "auto";
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelectItem({
              badge: "Achievements & Milestones",
              title: "Competitive Coding & Gamak Recognition",
              subtitle: about.education.university,
              list: about.achievements,
            });
          }}
        >
          <mesh position={[-0.55, 0.02, 0]}>
            <cylinderGeometry args={[0.16, 0.1, 0.34, 16]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0.1, 0.05, 0]} rotation={[0.3, 0.6, 0]}>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#c084fc" emissive="#9333ea" emissiveIntensity={0.6} />
          </mesh>
          <Text position={[0.68, 0.02, 0.12]} fontSize={0.13} color="#fde68a" anchorX="center">
            Trophies
          </Text>
          {hoveredItem === "trophies" && (
            <Html position={[0, 0.45, 0]} center distanceFactor={8}>
              <div className="px-3 py-1 rounded-full bg-amber-300 text-slate-950 text-xs font-bold shadow-lg whitespace-nowrap">
                Click to View Achievements
              </div>
            </Html>
          )}
        </group>

        {/* MIDDLE SHELF: Bio & Education Plaque */}
        <group
          position={[0, 1.32, 0.06]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredItem("bio");
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHoveredItem(null);
            document.body.style.cursor = "auto";
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelectItem({
              badge: "About Me & Education",
              title: about.name,
              subtitle: `${about.education.degree} • CGPA: ${about.education.cgpa}`,
              description: `${about.bio}\n\n${about.education.university} (${about.education.period})\n${about.education.schooling}`,
              list: about.achievements,
            });
          }}
        >
          <mesh>
            <boxGeometry args={[1.85, 0.56, 0.08]} />
            <meshStandardMaterial
              color="#1e1b4b"
              emissive={hoveredItem === "bio" ? "#6366f1" : "#312e81"}
              emissiveIntensity={hoveredItem === "bio" ? 0.6 : 0.25}
            />
          </mesh>
          <Text position={[0, 0.09, 0.06]} fontSize={0.155} color="#ffffff" anchorX="center">
            {about.name}
          </Text>
          <Text position={[0, -0.1, 0.06]} fontSize={0.095} color="#c4b5fd" anchorX="center">
            {`${about.role} • CGPA ${about.education.cgpa}`}
          </Text>
        </group>

        {/* BOTTOM SHELF LEFT: Resume PDF Binder */}
        <group
          position={[-0.64, 0.36, 0.05]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredItem("resume");
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHoveredItem(null);
            document.body.style.cursor = "auto";
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelectItem({
              isResumeModal: true,
              title: "Samriddhi Agrawal — Resume",
              resumeUrl: about.resumeUrl,
            });
          }}
        >
          <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[0.64, 0.14, 0.42]} />
            <meshStandardMaterial
              color="#f8fafc"
              emissive={hoveredItem === "resume" ? "#38bdf8" : "#000000"}
              emissiveIntensity={0.35}
            />
          </mesh>
          <mesh position={[0, 0.03, 0]}>
            <boxGeometry args={[0.58, 0.1, 0.38]} />
            <meshStandardMaterial color="#4f46e5" />
          </mesh>
          <Text position={[0, 0.24, 0.1]} fontSize={0.12} color="#fde68a" anchorX="center">
            Resume PDF
          </Text>
          {hoveredItem === "resume" && (
            <Html position={[0, 0.5, 0]} center distanceFactor={8}>
              <div className="px-3 py-1 rounded-full bg-amber-300 text-slate-950 text-xs font-bold shadow-lg whitespace-nowrap">
                Open Full Resume
              </div>
            </Html>
          )}
        </group>

        {/* BOTTOM SHELF RIGHT: Separate Direct-Action Buttons for Mail, GitHub & LinkedIn */}
        <group position={[0.48, 0.44, 0.08]}>
          <Text position={[0, 0.3, 0.04]} fontSize={0.11} color="#fde68a" anchorX="center">
            MAIL & SOCIALS
          </Text>

          {/* Direct Mail Button */}
          <group
            position={[0, 0.11, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredItem("mail");
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHoveredItem(null);
              document.body.style.cursor = "auto";
            }}
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `mailto:${about.email}`;
            }}
          >
            <mesh>
              <boxGeometry args={[1.08, 0.14, 0.06]} />
              <meshStandardMaterial
                color="#1e1b4b"
                emissive={hoveredItem === "mail" ? "#fbbf24" : "#f59e0b"}
                emissiveIntensity={hoveredItem === "mail" ? 0.65 : 0.25}
              />
            </mesh>
            <Text position={[0, 0, 0.04]} fontSize={0.058} color="#fef08a" anchorX="center">
              {about.email}
            </Text>
          </group>

          {/* Direct GitHub Button */}
          <group
            position={[-0.28, -0.09, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredItem("github");
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHoveredItem(null);
              document.body.style.cursor = "auto";
            }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(about.github, "_blank", "noopener,noreferrer");
            }}
          >
            <mesh>
              <boxGeometry args={[0.5, 0.14, 0.06]} />
              <meshStandardMaterial
                color="#0f172a"
                emissive={hoveredItem === "github" ? "#c084fc" : "#a855f7"}
                emissiveIntensity={hoveredItem === "github" ? 0.7 : 0.25}
              />
            </mesh>
            <Text position={[0, 0, 0.04]} fontSize={0.075} color="#ffffff" anchorX="center">
              GitHub
            </Text>
          </group>

          {/* Direct LinkedIn Button */}
          <group
            position={[0.28, -0.09, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredItem("linkedin");
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHoveredItem(null);
              document.body.style.cursor = "auto";
            }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(about.linkedin, "_blank", "noopener,noreferrer");
            }}
          >
            <mesh>
              <boxGeometry args={[0.5, 0.14, 0.06]} />
              <meshStandardMaterial
                color="#0c4a6e"
                emissive={hoveredItem === "linkedin" ? "#38bdf8" : "#0284c7"}
                emissiveIntensity={hoveredItem === "linkedin" ? 0.7 : 0.3}
              />
            </mesh>
            <Text position={[0, 0, 0.04]} fontSize={0.075} color="#ffffff" anchorX="center">
              LinkedIn
            </Text>
          </group>
        </group>
      </group>
    </group>
  );
}