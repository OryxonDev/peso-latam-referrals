'use client';

import Image from 'next/image';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        <div className="flex items-center gap-4">
          <MobileMenu />
          <span className="px-3 py-1 bg-[#ffdb3a] text-[#082422] text-sm font-semibold rounded-full">
            Refiere y gana
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/1.jpg"
              alt="Usuario"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

