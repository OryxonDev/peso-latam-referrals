'use client';

import Image from 'next/image';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="flex items-center justify-between md:ml-64 px-4 md:px-6 h-16">
        <div className="flex items-center gap-4">
          <MobileMenu />
          <div className="px-4 py-1.5 bg-[#ffdb3a] text-[#082422] text-sm font-bold rounded-full shadow-sm border border-[#ffdb3a]/30">
            Refiere y gana
          </div>
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

