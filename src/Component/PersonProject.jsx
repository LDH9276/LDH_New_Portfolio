import React from 'react';
import portfolio from './person'
import Scroll from '../Header/Scroll';
import Link from 'next/link';
import Image from 'next/image';

function PersonProject( {reset} ) {
  return (
    <div className="relative w-full h-full flex items-center">
      <div className="section-container py-20">
        <div className="mb-10">
          <span className="section-label">The LDH</span>
          <h2 className="section-title">Person Project</h2>
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
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-lime/0 group-hover:bg-lime/10 transition-colors duration-300" />
              </div>
              
              {/* Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Image src={`/images/${item.program}`} alt={item.family} width={16} height={16} 
                    className="dark:invert" />
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

export default PersonProject;