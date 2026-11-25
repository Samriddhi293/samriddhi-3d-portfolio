import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import AboutStation from "./AboutStation";
import ExperienceDeck from "./ExperienceDeck";
import SkillsConstellation from "./SkillsConstellation";
import ProjectsDeck from "./ProjectsDeck";

function WalkingGirl({ pathCurve, scrollProgress }) {
  const groupRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const prevT = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = THREE.MathUtils.clamp(scrollProgress.current, 0, 1);

    // Visible indoors; from stairs onward (t >= 0.45) we switch to pure First-Person POV
    groupRef.current.visible = t < 0.45;

    const walkT = THREE.MathUtils.clamp(t / 0.45, 0, 1);
    const pos = pathCurve.getPointAt(walkT);
    const tangent = pathCurve.getTangentAt(walkT);

    groupRef.current.position.lerp(pos, 1 - Math.exp(-8 * delta));
    const targetAngle = Math.atan2(tangent.x, tangent.z);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetAngle, 0.18);

    const speed = Math.abs(walkT - prevT.current) * 220;
    prevT.current = walkT;
    const swing = Math.min(speed, 0.65) * Math.sin(state.clock.elapsedTime * 8.5);

    if (leftLegRef.current) leftLegRef.current.rotation.x = swing;
    if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;
    if (leftArmRef.current) leftArmRef.current.rotation.x = -swing * 0.75;
    if (rightArmRef.current) rightArmRef.current.rotation.x = swing * 0.75;
  });

  return (
    <group ref={groupRef} position={[0.35, 0, 5.5]}>
      {/* Head */}
      <mesh position={[0, 1.48, 0]}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial color="#e0ac69" roughness={0.55} />
      </mesh>

      {/* Hair Crown */}
      <mesh position={[0, 1.53, -0.02]}>
        <sphereGeometry args={[0.148, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
        <meshStandardMaterial color="#0f0e17" roughness={0.85} />
      </mesh>

      {/* Long Flowing Hair at Back & Sides */}
      <mesh position={[0, 1.32, -0.09]}>
        <capsuleGeometry args={[0.115, 0.28, 10, 16]} />
        <meshStandardMaterial color="#0f0e17" roughness={0.85} />
      </mesh>

      {/* High Ponytail */}
      <mesh position={[0, 1.54, -0.15]} rotation={[0.45, 0, 0]}>
        <capsuleGeometry args={[0.045, 0.22, 8, 12]} />
        <meshStandardMaterial color="#0f0e17" roughness={0.85} />
      </mesh>

      {/* Fitted Plum/Violet Top */}
      <mesh position={[0, 1.12, 0]}>
        <capsuleGeometry args={[0.125, 0.3, 10, 16]} />
        <meshStandardMaterial color="#6b21a8" roughness={0.45} />
      </mesh>

      {/* Flared Tunic / Skirt Accent */}
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.125, 0.175, 0.24, 20]} />
        <meshStandardMaterial color="#7e22ce" roughness={0.45} />
      </mesh>

      {/* Arms */}
      <group ref={leftArmRef} position={[-0.175, 1.24, 0]}>
        <mesh position={[0, -0.17, 0]}>
          <capsuleGeometry args={[0.036, 0.28, 8, 12]} />
          <meshStandardMaterial color="#9333ea" />
        </mesh>
      </group>
      <group ref={rightArmRef} position={[0.175, 1.24, 0]}>
        <mesh position={[0, -0.17, 0]}>
          <capsuleGeometry args={[0.036, 0.28, 8, 12]} />
          <meshStandardMaterial color="#9333ea" />
        </mesh>
      </group>

      {/* Legs */}
      <group ref={leftLegRef} position={[-0.07, 0.76, 0]}>
        <mesh position={[0, -0.34, 0]}>
          <capsuleGeometry args={[0.046, 0.5, 8, 12]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>
      <group ref={rightLegRef} position={[0.07, 0.76, 0]}>
        <mesh position={[0, -0.34, 0]}>
          <capsuleGeometry args={[0.046, 0.5, 8, 12]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>
    </group>
  );
}

export default function WorldScene({ scrollProgress, onSelectItem, onSectionChange }) {
  const { camera } = useThree();
  const lastSectionRef = useRef("about");

  const walkCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.35, 0, 5.5),    // Inside Room 1 (About)
      new THREE.Vector3(0.25, 0, 2.2),    // Passing Portfolio Cupboard
      new THREE.Vector3(0.0, 0, -1.5),    // Entering Room 2 (Experience)
      new THREE.Vector3(-0.8, 0, -3.7),   // Turning toward Left Exit Doorway
      new THREE.Vector3(-4.35, 0, -3.7),  // Stepping out door to stairs
    ]);
  }, []);

  // Straight, steady stair climb along x = -4.35 without sideways spline wobble
  const cameraCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.35, 1.9, 8.2),     // 0.00: Room 1 (About)
      new THREE.Vector3(0.85, 1.85, 4.2),    // 0.16: Portfolio Cupboard
      new THREE.Vector3(0.0, 1.9, 0.8),      // 0.32: Room 2 (Experience)
      new THREE.Vector3(-2.6, 1.85, -3.7),   // 0.42: Exiting Left Doorway
      new THREE.Vector3(-4.35, 1.6, -1.6),   // 0.48: Bottom of stairs
      new THREE.Vector3(-4.35, 3.6, 0.7),    // 0.56: Straight climb up the illuminated stairs
      new THREE.Vector3(-3.6, 5.3, 3.2),     // 0.62: Stepping smoothly onto rooftop terrace
      new THREE.Vector3(-0.6, 5.4, 6.2),     // 0.69: Rooftop Projects Showcase
      new THREE.Vector3(2.0, 5.30, 2.35),    // 0.80: Standing straight in front of Telescope's circular Aperture
      new THREE.Vector3(2.0, 5.30, 3.30),    // 0.87: Just in front of the blue optical glass before passing through
      new THREE.Vector3(2.0, 5.35, 4.85),    // 0.95: Passed through aperture -> full Skills Constellation
    ]);
  }, []);

  const lookAtCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.2, 1.5, 2.5),
      new THREE.Vector3(-1.4, 1.75, 2.2),    // Portfolio Cupboard
      new THREE.Vector3(0.8, 1.65, -5.2),    // Experience Desks
      new THREE.Vector3(-4.35, 1.55, -2.2),  // Looking out doorway toward stairs
      new THREE.Vector3(-4.35, 3.2, 1.6),    // Looking straight UP the stairs
      new THREE.Vector3(-4.35, 5.15, 3.2),   // Cresting straight onto the top step
      new THREE.Vector3(-1.2, 5.15, 0.8),    // Turning cleanly toward Rooftop Projects Showcase
      new THREE.Vector3(-0.6, 5.15, 0.2),    // Rooftop Projects Showcase
      new THREE.Vector3(2.0, 5.30, 3.50),    // Dead-center on the front of the circular Aperture
      new THREE.Vector3(2.0, 5.30, 5.50),    // Straight through the center of the lens
      new THREE.Vector3(2.0, 5.45, 9.2),     // Centered directly on the full-screen Skills Constellation
    ]);
  }, []);

  useFrame((_, delta) => {
    const t = THREE.MathUtils.clamp(scrollProgress.current, 0, 1);
    const targetPos = cameraCurve.getPointAt(t);
    const targetLook = lookAtCurve.getPointAt(t);

    camera.position.lerp(targetPos, 1 - Math.exp(-6.5 * delta));
    camera.lookAt(targetLook);

    let active = "about";
    if (t >= 0.76) active = "skills";
    else if (t >= 0.60) active = "projects";
    else if (t >= 0.28) active = "experience";

    if (active !== lastSectionRef.current) {
      lastSectionRef.current = active;
      onSectionChange(active);
    }
  });

  return (
    <>
      <color attach="background" args={["#070514"]} />
      <fog attach="fog" args={["#070514", 18, 52]} />

      <Stars radius={85} depth={45} count={2800} factor={3} saturation={0.75} fade speed={0.5} />
      <ambientLight intensity={0.65} color="#cbd5e1" />
      <directionalLight position={[10, 22, 12]} intensity={1.4} color="#fde68a" />

      <pointLight position={[-4.35, 2.5, 0.8]} intensity={3.5} distance={10} color="#fbbf24" />
      <pointLight position={[-0.6, 7.2, 2.0]} intensity={4.5} distance={16} color="#a855f7" />
      <pointLight position={[2.0, 5.6, 2.6]} intensity={5.0} distance={8} color="#38bdf8" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -4]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#0f0c1d" roughness={0.85} />
      </mesh>

      <group position={[-4.35, 0, -1.4]}>
        {[-0.68, 0.68].map((xRail, idx) => (
          <mesh key={idx} position={[xRail, 2.1, 2.1]} rotation={[0.72, 0, 0]}>
            <boxGeometry args={[0.06, 0.08, 5.8]} />
            <meshStandardMaterial color="#78350f" metalness={0.5} roughness={0.4} />
          </mesh>
        ))}

        {Array.from({ length: 12 }).map((_, step) => (
          <group key={step} position={[0, step * 0.315 + 0.15, step * 0.35]}>
            <mesh>
              <boxGeometry args={[1.35, 0.12, 0.38]} />
              <meshStandardMaterial color="#1e1b4b" roughness={0.45} metalness={0.4} />
            </mesh>
            <mesh position={[0, 0.065, -0.17]}>
              <boxGeometry args={[1.28, 0.018, 0.03]} />
              <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.6} />
            </mesh>
          </group>
        ))}
      </group>

      <Sparkles count={160} scale={[26, 18, 34]} position={[-1, 6, 0]} size={1.8} speed={0.25} color="#fde68a" />

      <WalkingGirl pathCurve={walkCurve} scrollProgress={scrollProgress} />

      <AboutStation position={[0, 0, 3.0]} onSelectItem={onSelectItem} />
      <ExperienceDeck position={[1.0, 0, -3.7]} onSelectItem={onSelectItem} />
      <ProjectsDeck position={[-0.6, 3.78, 0.2]} onSelectItem={onSelectItem} />

      <SkillsConstellation
        telescopePos={[2.0, 3.78, 4.2]}
        constellationCenter={[2.0, 5.45, 9.2]}
        scrollProgress={scrollProgress}
        onSelectItem={onSelectItem}
      />
    </>
  );
}