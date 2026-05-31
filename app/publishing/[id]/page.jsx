'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Building2, Clock3, PanelsTopLeft } from 'lucide-react';
import companydata from '../../../src/Component/companydata.json';
import { useAppContext } from '../../Context';

function PublishingPage() {
  const { isStart, setPendingScrollIndex } = useAppContext();
  const params = useParams();
  const router = useRouter();
  const portfolioItem = companydata.portfolio.find((item) => item.id === Number(params.id));

  const toList = () => {
    setPendingScrollIndex(4);
    router.push('/');
  };

  if (!portfolioItem) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-text-muted-light dark:text-text-muted-dark">해당 작업을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-[2.5s] ${isStart === 'ready' ? 'opacity-0' : 'opacity-100'}`}>
      <div className="min-h-screen pt-28 pb-20">
        <div className="section-container">
          <button type="button" className="btn-outline mb-12" onClick={toList}>
            ← 목록으로
          </button>

          <div className="mb-12">
            <span className="section-label">Publishing Works</span>
            <h1 className="section-title mb-4">{portfolioItem.name}</h1>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              {portfolioItem.client}
            </p>
            <div className="accent-line mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            <div className="card p-5">
              <Building2 size={18} className="text-lime mb-4" />
              <span className="block text-[11px] uppercase tracking-[0.2em] text-text-muted-light dark:text-text-muted-dark mb-2">
                Type
              </span>
              <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
                {portfolioItem.family}
              </p>
            </div>

            <div className="card p-5">
              <Clock3 size={18} className="text-lime mb-4" />
              <span className="block text-[11px] uppercase tracking-[0.2em] text-text-muted-light dark:text-text-muted-dark mb-2">
                Duration
              </span>
              <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
                {portfolioItem.duration}
              </p>
            </div>

            <div className="card p-5">
              <PanelsTopLeft size={18} className="text-lime mb-4" />
              <span className="block text-[11px] uppercase tracking-[0.2em] text-text-muted-light dark:text-text-muted-dark mb-2">
                Pages
              </span>
              <ul className="space-y-1">
                {portfolioItem.pages.map((page) => (
                  <li key={page} className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
                    {page}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <section>
            <span className="section-label">Preview</span>
            <h2 className="text-subheading text-text-primary-light dark:text-text-primary-dark mb-6">
              이미지 샘플
            </h2>
            <div className="space-y-6">
              {portfolioItem.samples.map((sample) => (
                <div key={sample.src} className="card p-2">
                  <Image
                    src={sample.src}
                    alt={sample.alt}
                    width={1880}
                    height={866}
                    className="block w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PublishingPage;
