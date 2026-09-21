"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/content/projects";

interface ActionItem {
  id: string;
  category: "Navigation" | "Projects" | "Actions" | "Social";
  title: string;
  subtitle?: string;
  badge?: string;
  shortcut?: string;
  onSelect: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, [open]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery("");
    }
  }, [open]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  // Actions list
  const actions: ActionItem[] = [
    // Navigation
    {
      id: "nav-home",
      category: "Navigation",
      title: "Home",
      subtitle: "Return to portfolio overview",
      shortcut: "G H",
      onSelect: () => router.push("/"),
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "Projects & Case Studies",
      subtitle: "Explore 10 production systems",
      shortcut: "G P",
      onSelect: () => router.push("/#projects"),
    },
    {
      id: "nav-resume",
      category: "Navigation",
      title: "View Résumé (ATS)",
      subtitle: "1-Page ATS optimized technical résumé",
      shortcut: "G R",
      onSelect: () => router.push("/resume"),
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Contact & Inquiries",
      subtitle: "Send a message or hire",
      shortcut: "G C",
      onSelect: () => router.push("/#contact"),
    },

    // Fast Actions
    {
      id: "action-download-pdf",
      category: "Actions",
      title: "Download 1-Page Résumé PDF",
      subtitle: "Download official Muhammad_Talha_Resume.pdf",
      badge: "PDF",
      onSelect: () => window.open("/Muhammad_Talha_Resume.pdf", "_blank"),
    },
    {
      id: "action-copy-email",
      category: "Actions",
      title: "Copy Email Address",
      subtitle: "hello@talhaweb.xyz",
      badge: "Copy",
      onSelect: () => {
        navigator.clipboard.writeText("hello@talhaweb.xyz");
        alert("Copied hello@talhaweb.xyz to clipboard!");
      },
    },
    {
      id: "action-toggle-theme",
      category: "Actions",
      title: `Toggle Theme (Current: ${isDark ? "Dark" : "Light"})`,
      subtitle: "Switch between dark and light modes",
      badge: "Theme",
      onSelect: toggleTheme,
    },

    // Projects Quick Jump
    ...projects.map((p) => ({
      id: `proj-${p.slug}`,
      category: "Projects" as const,
      title: p.name,
      subtitle: p.tagline,
      badge: p.category,
      onSelect: () => router.push(p.links.caseStudy || `/#projects`),
    })),

    // Social Links
    {
      id: "social-whatsapp",
      category: "Social",
      title: "WhatsApp Direct",
      subtitle: "+92 312 1964939",
      badge: "Chat",
      onSelect: () => window.open("https://wa.me/923121964939", "_blank"),
    },
    {
      id: "social-github",
      category: "Social",
      title: "GitHub Profile",
      subtitle: "github.com/Talha-Shaikh1",
      badge: "Code",
      onSelect: () => window.open("https://github.com/Talha-Shaikh1", "_blank"),
    },
  ];

  // Filter actions
  const filtered = actions.filter((a) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      a.title.toLowerCase().includes(q) ||
      a.subtitle?.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].onSelect();
        setOpen(false);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm animate-in fade-in duration-150"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-accent/30 bg-[#120f0d] shadow-2xl ring-1 ring-accent/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 border-b border-[#26201b] px-4 py-3.5">
          <span className="text-[#a8a29e] font-mono text-sm">⌘</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownInput}
            placeholder="Type a command or search systems (e.g. 'botaura', 'resume', 'skills')..."
            className="flex-1 bg-transparent text-sm text-[#f5f5f4] placeholder-[#78716c] outline-none"
          />
          <kbd className="rounded border border-[#382f27] bg-[#1c1712] px-1.5 py-0.5 font-mono text-[10px] text-[#a8a29e]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[340px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-accent/20">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#78716c] font-mono">
              No results found for "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.onSelect();
                    setOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                    isSelected
                      ? "bg-accent text-accent-contrast font-medium"
                      : "text-[#d6d3d1] hover:bg-[#1a1511]"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span
                      className={`font-mono text-[10px] uppercase ${
                        isSelected ? "text-accent-contrast/80" : "text-accent"
                      }`}
                    >
                      {item.category}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-semibold truncate">{item.title}</div>
                      {item.subtitle && (
                        <div
                          className={`text-[11px] truncate ${
                            isSelected ? "text-accent-contrast/80" : "text-[#78716c]"
                          }`}
                        >
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span
                        className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                          isSelected
                            ? "bg-black/20 text-white"
                            : "border border-[#382f27] bg-[#1a1511] text-[#a8a29e]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.shortcut && (
                      <span
                        className={`font-mono text-[10px] ${
                          isSelected ? "text-accent-contrast/70" : "text-[#78716c]"
                        }`}
                      >
                        {item.shortcut}
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#26201b] bg-[#0c0a08] px-4 py-2 font-mono text-[10px] text-[#78716c]">
          <div className="flex items-center gap-2">
            <span>Use ↑↓ to navigate</span>
            <span>·</span>
            <span>↵ to select</span>
          </div>
          <span>TalhaOS Command Palette</span>
        </div>
      </div>
    </div>
  );
}
