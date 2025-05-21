"use client";

import React from "react";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function ProfileToggleSection({
  title,
  children,
  defaultOpen = true,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 w-full text-left mb-3 group"
      >
        <span className="text-[#6b7280] dark:text-[#a8a29e] transition-colors">
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
        <h2 className="text-xl font-medium group-hover:text-[#6b7280] dark:group-hover:text-[#a8a29e] transition-colors">
          {title}
        </h2>
      </button>

      {isOpen && (
        <div className="pl-6 animate-in fade-in duration-200">{children}</div>
      )}
    </div>
  );
}
