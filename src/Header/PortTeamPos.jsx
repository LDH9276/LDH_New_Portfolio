import React from 'react';
import Link from 'next/link';

function PortTeamPos( {act, dis, id, reset} ) {
  const items = [
    { id: 5, name: '시드물' },
    { id: 6, name: '넷마블' },
    { id: 7, name: 'LMS관리자' },
    { id: 8, name: 'LMS유저' },
  ];

  return (
    <nav className={`hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-40
      flex-col items-start gap-3
      transition-all duration-500
      ${dis === 'disable' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {items.map((item) => (
        <Link 
          key={item.id}
          href={`/portfolio/${item.id}`}
          onClick={reset}
          className={`flex items-center gap-3 group transition-all duration-300`}
        >
          <span className={`block transition-all duration-300
            ${Number(id) === item.id 
              ? 'w-8 h-[2px] bg-lime' 
              : 'w-4 h-[1px] bg-text-muted-light dark:bg-text-muted-dark group-hover:w-6 group-hover:bg-lime'}`} 
          />
          <span className={`text-[11px] font-medium tracking-wider
            transition-all duration-300
            ${Number(id) === item.id 
              ? 'opacity-100 text-lime' 
              : 'opacity-0 text-text-secondary-light dark:text-text-secondary-dark group-hover:opacity-100'}`}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </nav>
  );
}

export default PortTeamPos;