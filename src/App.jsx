import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import WorldScene from "./components/canvas/WorldScene";
import BottomDock from "./components/ui/BottomDock";
import DetailModal from "./components/ui/DetailModal";
import TelescopeLensHUD from "./components/ui/TelescopeLensHUD";

export default function App() {
  const scrollProgress = useRef(0);
  const [activeSection, setActiveSection] = useState("about");
  const [selectedItem, setSelectedItem] = useState(null);
  const [lensZoom, setLensZoom] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const t = window.scrollY / maxScroll;
        scrollProgress.current = t;

        const zoomIn = THREE.MathUtils.smoothstep(t, 0.88, 0.93);
        setLensZoom(zoomIn);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleJumpTo = (targetProgress) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetProgress * maxScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full bg-[#06050e] text-slate-100 selection:bg-purple-500/30">
      <div className="fixed inset-0 w-full h-screen z-0">
        <Canvas camera={{ position: [0.35, 1.9, 8.2], fov: 46 }} dpr={[1, 2]}>
          <WorldScene
            scrollProgress={scrollProgress}
            onSelectItem={setSelectedItem}
            onSectionChange={setActiveSection}
          />
        </Canvas>
      </div>

      {/* Circular Telescope Eyepiece Lens View */}
      <TelescopeLensHUD zoomFactor={lensZoom} />

      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <span className="text-xs font-bold tracking-[0.35em] text-indigo-200/80 uppercase">
          SAMRIDDHI AGRAWAL
        </span>
      </header>

      <div className="h-[850vh] w-full pointer-events-none" />

      <BottomDock activeSection={activeSection} onJumpTo={handleJumpTo} />
      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}