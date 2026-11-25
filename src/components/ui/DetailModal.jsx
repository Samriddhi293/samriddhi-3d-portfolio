import React from "react";
import { X, ExternalLink, Mail, FileDown } from "lucide-react";

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
    </svg>
  );
}

export default function DetailModal({ item, onClose }) {
  if (!item) return null;

  // Full-Screen Clean Resume Viewer
  if (item.isResumeModal && item.resumeUrl) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-5xl h-[94vh] flex flex-col rounded-2xl bg-[#0e0c1e] border border-indigo-500/35 shadow-[0_0_60px_rgba(99,102,241,0.35)] overflow-hidden text-slate-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Compact Top Bar with Download & Close */}
          <div className="flex items-center justify-between px-5 py-3 bg-[#15122b] border-b border-white/10">
            <span className="text-sm font-semibold tracking-wide text-indigo-100">
              {item.title}
            </span>

            <div className="flex items-center gap-3">
              <a
                href={item.resumeUrl}
                download="Samriddhi_Agrawal_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition shadow-md"
              >
                <FileDown className="w-4 h-4" />
                Download Resume PDF
              </a>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Full-Height Clean PDF Frame (No Gray Browser Sidebar/Toolbar) */}
          <iframe
            src={`${item.resumeUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            title="Samriddhi Agrawal Resume"
            className="w-full flex-1 bg-white"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-[#110f24] border border-indigo-500/35 p-6 shadow-[0_0_50px_rgba(99,102,241,0.35)] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {item.badge && (
          <span className="inline-block px-3 py-1 mb-2 text-[11px] font-semibold tracking-wider uppercase rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            {item.badge}
          </span>
        )}

        <h2 className="text-2xl font-bold text-white">{item.title}</h2>
        {item.subtitle && <p className="text-sm text-purple-300 mt-1">{item.subtitle}</p>}

        {item.description && (
          <p className="mt-4 text-sm leading-relaxed text-slate-300 whitespace-pre-line">
            {item.description}
          </p>
        )}

        {item.list && item.list.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-slate-300 list-disc list-inside">
            {item.list.map((point, i) => (
              <li key={i} className="leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
        )}

        {item.tech && item.tech.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-indigo-950/90 text-indigo-200 border border-indigo-500/30"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-3">
          {item.email && (
            <a
              href={`mailto:${item.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition"
            >
              <Mail className="w-3.5 h-3.5" />
              {item.email}
            </a>
          )}

          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition"
            >
              <GithubIcon />
              GitHub
            </a>
          )}

          {item.linkedin && (
            <a
              href={item.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600/80 hover:bg-sky-500 text-white text-xs font-medium transition"
            >
              <LinkedinIcon />
              LinkedIn
            </a>
          )}

          {item.live && (
            <a
              href={item.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}