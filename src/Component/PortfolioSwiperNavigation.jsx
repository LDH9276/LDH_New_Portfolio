import { ChevronLeft, ChevronRight } from 'lucide-react';

function PortfolioSwiperNavigation({
  prevClassName,
  nextClassName,
  prevLabel = '이전 슬라이드',
  nextLabel = '다음 슬라이드',
}) {
  return (
    <>
      <button
        type="button"
        className={`portfolio-swiper-button portfolio-swiper-button-prev ${prevClassName}`}
        aria-label={prevLabel}
      >
        <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
      </button>
      <button
        type="button"
        className={`portfolio-swiper-button portfolio-swiper-button-next ${nextClassName}`}
        aria-label={nextLabel}
      >
        <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
      </button>
    </>
  );
}

export default PortfolioSwiperNavigation;
