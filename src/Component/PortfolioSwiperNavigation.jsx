import { ChevronLeft, ChevronRight } from 'lucide-react';

function PortfolioSwiperNavigation({
  prevClassName,
  nextClassName,
  paginationClassName,
  prevLabel = '이전 슬라이드',
  nextLabel = '다음 슬라이드',
  showNavigation = true,
}) {
  return (
    <div className="portfolio-swiper-controls" role="group" aria-label="슬라이드 탐색">
      {showNavigation && (
        <button
          type="button"
          className={`portfolio-swiper-button portfolio-swiper-button-prev ${prevClassName}`}
          aria-label={prevLabel}
        >
          <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
      )}
      <div className={`swiper-pagination portfolio-swiper-pagination ${paginationClassName}`} />
      {showNavigation && (
        <button
          type="button"
          className={`portfolio-swiper-button portfolio-swiper-button-next ${nextClassName}`}
          aria-label={nextLabel}
        >
          <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default PortfolioSwiperNavigation;
