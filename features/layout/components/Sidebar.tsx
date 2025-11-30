'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayoutStore } from '../store/layoutStore';
import { Logo } from './Logo';

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useLayoutStore();

  const menuItems = [
    { href: '/', label: 'Listado de Referidos' },
    { href: '/add-referral', label: 'Añadir Referido' },
  ];

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
      <aside
        className={`fixed left-0 top-0 h-full bg-[#082422] text-white z-50 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6">
          <div className="mt-4 mb-6 pb-6 border-b border-white/10 pb-4">
            <Logo className="text-white" />
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#ffdb3a] text-[#082422] font-medium'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

