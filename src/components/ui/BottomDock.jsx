import React from "react";
import { User, Briefcase, FolderGit2, Cpu } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "ABOUT", icon: User, progress: 0.16 },
  { id: "experience", label: "EXPERIENCE", icon: Briefcase, progress: 0.34 },
  { id: "projects", label: "PROJECTS", icon: FolderGit2, progress: 0.70 },
  { id: "skills", label: "SKILLS", icon: Cpu, progress: 0.85 },
];

export default function BottomDock({ activeSection, onJumpTo }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <nav className="flex items-center gap-1.5 px-2.5 py-2 rounded-full bg-[#121026]/85 backdrop-blur-xl border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.28)]">
        {NAV_ITEMS.map(({ id, label, icon: Icon, progress }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => onJumpTo(progress)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  : "text-indigo-200/75 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}