'use client';

import { useLayoutStore } from '../store/layoutStore';

export function MobileMenu() {
  const { toggleSidebar } = useLayoutStore();

  return (
    <button
      onClick={toggleSidebar}
      className="md:hidden p-2 text-[#082422] hover:bg-gray-100 rounded-lg transition-colors"
      aria-label="Toggle menu"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}

