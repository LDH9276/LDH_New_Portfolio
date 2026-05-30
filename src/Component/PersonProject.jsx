import React, { useState, useEffect, useRef, useCallback } from 'react';
import portfolio from './person'
import Link from 'next/link';
import Image from 'next/image';
import { FileCode, Atom, Server, Code2 } from 'lucide-react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const getFamilyIcon = (family) => {
  const f = family.toUpperCase();
  if (f.includes('REACT')) return <Atom size={16} className="text-lime" />;
  if (f.includes('PHP')) return <Server size={16} className="text-lime" />;
  if (f.includes('JQUERY') || f.includes('JAVASCRIPT')) return <FileCode size={16} className="text-lime" />;
  return <Code2 size={16} className="text-lime" />;
};

function ProjectCard({ item, index, isVisible, reset }) {
  const cardRef = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/portfolio/${item.id}`}
      onClick={reset}
      onMouseMove={handleMouseMove}
      className={`card group block relative h-full overflow-hidden
        transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
    >
      {/* Interactive glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(167, 198, 54, 0.15), transparent 70%)`
        }}
      />

      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted-light dark:bg-surface-muted-dark">
        <Image
          src={`/images/${item.thumb}`}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Number overlay */}
        <span className="absolute top-3 right-3 text-[10px] font-mono font-bold text-white/60
          bg-black/30 backdrop-blur-sm px-2 py-0.5 z-10">
          {String(index + 1).padStart(2, '0')}
        </span>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* View label */}
        <div className="absolute bottom-3 left-4 z-10
          opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-300 delay-100">
          <span className="text-xs font-semibold text-white tracking-wider uppercase">View →</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2 relative z-10">
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
  );
}

function PersonProject({ activeSlide, reset }) {
  const [active, setActive] = useState('ready');

  useEffect(() => {
    if (activeSlide === 2) setActive('');
  }, [activeSlide]);

  const isVisible = active === '';
  const items = portfolio.person.slice(0).reverse();

  return (
    <div className={`relative w-full h-full flex items-center transition-opacity duration-[1.8s] ${active === 'ready' ? 'opacity-0' : 'opacity-100'}`}>
      <div className="section-container">
        <div className="mb-10">
          <span className="section-label">The LDH</span>
          <h2 className="section-title">Person Project</h2>
          <div className="accent-line" />
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1.15}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="portfolio-swiper"
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.id} className="h-auto">
              <ProjectCard
                item={item}
                index={index}
                isVisible={isVisible}
                reset={reset}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default PersonProject;
