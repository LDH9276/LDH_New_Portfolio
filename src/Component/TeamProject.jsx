import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import portfolio from './team'
import Scroll from '../Header/Scroll';
import Image from 'next/image';
import { FileCode, Atom, Server, Code2 } from 'lucide-react';

const getFamilyIcon = (family) => {
  const f = family.toUpperCase();
  if (f.includes('REACT')) return <Atom size={16} className="text-lime" />;
  if (f.includes('PHP')) return <Server size={16} className="text-lime" />;
  if (f.includes('JQUERY') || f.includes('JAVASCRIPT')) return <FileCode size={16} className="text-lime" />;
  return <Code2 size={16} className="text-lime" />;
};

function TeamProject({activeSlide, reset}) {
  const [active, setActive] = useState('ready');

  useEffect(() => {
    if (activeSlide === 3) setActive('');
  }, [activeSlide]);

  return (
    <div className={`relative w-full h-full flex items-center transition-opacity duration-[1.8s] ${active === 'ready' ? 'opacity-0' : 'opacity-100'}`}>
      <div className="section-container py-20">
        <div className="mb-10">
          <span className="section-label">The LDH</span>
          <h2 className="section-title">Team Project</h2>
          <div className="accent-line" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolio.person.slice(0).reverse().map((item, index) => (
            <Link 
              href={`/portfolio/${item.id}`} 
              key={index} 
              onClick={reset}
              className="card group block"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted-light dark:bg-surface-muted-dark">
                <Image 
                  src={`/images/${item.thumb}`} 
                  alt={item.name} 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-lime/0 group-hover:bg-lime/10 transition-colors duration-300" />
              </div>
              
              {/* Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  {getFamilyIcon(item.family)}
                  <span className="text-[10px] uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark">
                    {item.family}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark
                  group-hover:text-lime transition-colors duration-300">
                  {item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Scroll />
    </div>
  );
}

export default TeamProject;