'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import portfoliodata from '../../src/Component/portfoliodata.json';
import '../../src/Route/css/main.css';
import '../../src/Component/css/portfolio.css';
import Scroll from '../../src/Header/Scroll';

import PortPesronPos from '../../src/Header/PortPersonPos';
import PortTeamPos from '../../src/Header/PortTeamPos';
import ScrollPf from '../../src/Header/ScrollPf';
import { useAppContext } from '../../app/Context';

function PortfolioPage() {
  const { p_slide, setP_slide, isStart, setActiveSlide } = useAppContext();
  const containerRef = useRef(null);
  
  const [tab, setTab] = useState(0);
  const [tab01, setTab01] = useState(0);
  const [img, setImg] = useState(0);
  
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const productID = Number(id);
  
  const act = 'active';
  const dis = 'disable';

  const data = JSON.stringify(portfoliodata.portfolio);
  const totaldata = data.replace(/\n/g, "<br>");
  const portfolio = JSON.parse(totaldata);

  const portfolioItem = portfolio.find(item => item.id === productID);

  // Scroll spy to update p_slide
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setP_slide(index);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      }
    );

    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll('.scroll-section');
      sections.forEach((section) => observer.observe(section));
    }

    return () => observer.disconnect();
  }, [setP_slide]);

  const reset = () => {
    setP_slide(0);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setImg((prevImg) => (prevImg + 1) % 3);
    }, 4500); 
    return () => clearInterval(interval);
  }, []);
  
  const tabChange = (num) => setTab(num);
  const tabChange01 = (num) => setTab01(num);

  const toList = () => {
    setActiveSlide(2);
    router.push('/');
  }
  const toList2 = () => {
    setActiveSlide(3);
    router.push('/');
  }

  if (!portfolioItem) return <div>Loading...</div>;

  return (
    <div className={`main ${isStart}`}>
      <div 
        ref={containerRef}
        className="main-contain h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        <section data-index="0" className="scroll-section snap-start h-screen w-full relative">
          <div className="portfolio-intro">
            <img src={`/portfolio/${portfolioItem.main_img}`} alt={portfolioItem.name} className='intro-main'/>
            <div className="text-wrap">
              <p className='intro-subtitle'>{portfolioItem.family}</p>
              <p className='intro-title'>{portfolioItem.name}</p>
              <p className='intro-subtitle'>{portfolioItem.project_date}</p>
              <p className='intro-subtitle'>{portfolioItem.project_program}</p>
              <p className='intro-btn-wrap'>
                <a href={portfolioItem.homepage} title="포트폴리오 페이지 가기" className='portfolio-btn' target="_blank" rel="noopener noreferrer">페이지 이동</a>
              </p>
            </div>
            <ScrollPf />
          </div>
        </section>

        <section data-index="1" className="scroll-section snap-start h-screen w-full relative">
          <div className={`main-comp banner`}>
            <div className="main-line">&nbsp;</div>
            <div className="main-line02">&nbsp;</div>
            <div className="main-index-wrap" id='banner'>
                {portfolioItem.name}
              <h2 className='main-title'>
                Introduce
              </h2>
              <div className="portfolio-info">
                <img src={`/images/${portfolioItem.textimg01}`} alt={portfolioItem.name + '01'} className='portfolio-mainimg01'/>
                <div>
                  <p className='portfolio-item-title'>{portfolioItem.Headtitle}</p>
                  <pre className='portfolio-text'>
                  {portfolioItem.text01}
                  </pre>
                </div>
              </div>
              <Scroll />
            </div>
          </div>
        </section>

        <section data-index="2" className="scroll-section snap-start h-screen w-full relative">
          <div className={`main-comp banner`}>
            <div className="main-line">&nbsp;</div>
            <div className="main-line02">&nbsp;</div>
            <div className="main-index-wrap" id='banner'>
                {portfolioItem.name}
              <h2 className='main-title'>
                개발환경 및 디자인
              </h2>
              <div className="portfolio-info">
                <div className="design-wrap">
                  <ul className='dev-chapter'>
                    <li className={`dev-chapter-btn ${tab01 === 0 ? 'active' : ''}`} onClick={() => tabChange01(0)}>UI / UX</li>
                    <li className={`dev-chapter-btn ${tab01 === 1 ? 'active' : ''}`} onClick={() => tabChange01(1)}>Library</li>
                  </ul>
                  <ul className="portfolio-item-wrap">
                    <li className={`design-item ${tab01 === 0 ? 'active' : ''}`}>
                    <pre className='portfolio-text'>
                      {portfolioItem.design}
                    </pre>
                    </li>
                    <li className={`design-item ${tab01 === 1 ? 'active' : ''}`}>
                    <pre className='portfolio-text'>
                      {portfolioItem.text03}
                    </pre>
                    </li>
                  </ul>
                </div>

                {(id === '1' || id === '4' || id === '2' || id === '7') && (
                  <div className="design-img_wrap">
                    {img === 0 ? (<img src={`/images/${portfolioItem.textimg02}`} alt="" className='design-image'/>) : (<img src={`/images/${portfolioItem.textimg02}`} alt="" className='design-image disabled'/>)}
                    {img === 1 ? (<img src={`/images/${portfolioItem.textimg03}`} alt="" className='design-image'/>) : (<img src={`/images/${portfolioItem.textimg03}`} alt="" className='design-image disabled'/>)}
                    {img === 2 ? (<img src={`/images/${portfolioItem.textimg04}`} alt="" className='design-image'/>) : (<img src={`/images/${portfolioItem.textimg04}`} alt="" className='design-image disabled'/>)}
                  </div>
                )}

                {(id === '3' || id === '6' || id === '5' || id === '8') && (
                  <div className="design-img_wrap">
                    <img src={`/images/${portfolioItem.textimg02}`} alt="" className='design-image'/>
                  </div>
                )}
              </div>
            </div>
            <Scroll />
          </div>
        </section>

        <section data-index="3" className="scroll-section snap-start h-screen w-full relative">
          <div className={`main-comp banner`}>
            <div className="main-line">&nbsp;</div>
            <div className="main-line02">&nbsp;</div>
            <div className="main-index-wrap" id='banner'>
              <p className='main-subtitle'>
                {portfolioItem.name}
              </p>
              <h2 className='main-title'>
                Develope
              </h2>
              <div className="portfolio-developer">
                <ul className='dev-chapter'>
                  <li className={`dev-chapter-btn ${tab === 0 ? 'active' : ''}`} onClick={() => tabChange(0)}>Chapter01</li>
                  <li className={`dev-chapter-btn ${tab === 1 ? 'active' : ''}`} onClick={() => tabChange(1)}>Chapter02</li>
                  <li className={`dev-chapter-btn ${tab === 2 ? 'active' : ''}`} onClick={() => tabChange(2)}>Chapter03</li>
                  <li className={`dev-chapter-btn ${tab === 3 ? 'active' : ''}`} onClick={() => tabChange(3)}>Chapter04</li>
                </ul>
                <ul className='portfolio-developer-item'>
                  <li className={`portfolio-item ${tab === 0 ? 'active' : ''}`}>
                    <pre className='portfolio-code'>
                      {portfolioItem.code1}
                    </pre>
                    <div className="portfolio-item-wrap">
                      <p className='portfolio-item-title'>{portfolioItem.title01}</p>
                      <pre className='portfolio-text'>
                        {portfolioItem.text02_1}
                      </pre>
                    </div>
                  </li>
                  <li className={`portfolio-item ${tab === 1 ? 'active' : ''}`}>
                    <pre className='portfolio-code'>
                      {portfolioItem.code2}
                    </pre>
                    <div className="portfolio-item-wrap">
                      <p className='portfolio-item-title'>{portfolioItem.title02}</p>
                      <pre className='portfolio-text'>
                        {portfolioItem.text02_2}
                      </pre>
                    </div>
                  </li>
                  <li className={`portfolio-item ${tab === 2 ? 'active' : ''}`}>
                    <pre className='portfolio-code'>
                      {portfolioItem.code3}
                    </pre>
                    <div className="portfolio-item-wrap">
                      <p className='portfolio-item-title'>{portfolioItem.title03}</p>
                      <pre className='portfolio-text'>
                        {portfolioItem.text02_3}
                      </pre>
                    </div>
                  </li>
                  <li className={`portfolio-item ${tab === 3 ? 'active' : ''}`}>
                    <pre className='portfolio-code'>
                      {portfolioItem.code4}
                    </pre>
                    <div className="portfolio-item-wrap">
                      <p className='portfolio-item-title'>{portfolioItem.title04}</p>
                      <pre className='portfolio-text'>
                        {portfolioItem.text02_4}
                      </pre>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <Scroll />
          </div>
        </section>

        <section data-index="4" className="scroll-section snap-start h-screen w-full relative">
          <div className={`main-comp banner`}>
            <div className="main-line">&nbsp;</div>
            <div className="main-line02">&nbsp;</div>
            <div className="main-index-wrap" id='banner'>
              <p className='main-subtitle'>
                {portfolioItem.name}
              </p>
              <h2 className='main-title'>
                후기 및 느낀점
              </h2>
              <div className="portfolio-info">
                <div>
                  <p className='portfolio-item-title'>총평 및 후기</p>
                  <pre className='portfolio-text'>
                  {portfolioItem.text04}
                  </pre>
                </div>
                <img src={`/images/${portfolioItem.textimg01}`} alt={portfolioItem.name + '01'} className='portfolio-mainimg01'/>
              </div>
            </div>
            {productID < 5 ? (<button className='portfolio-tolist' onClick={toList}>목록으로</button>) : (<button className='portfolio-tolist 2' onClick={toList2}>목록으로</button>)}
          </div>
        </section>
      </div>

      {productID < 5 && p_slide > 0 ? (<PortPesronPos id={id} act={act} reset={reset}/>) : (<PortPesronPos dis={dis} id={id} reset={reset}/>)}
      {productID >= 5 && p_slide > 0 ? (<PortTeamPos act={act} id={id} reset={reset}/>) : (<PortTeamPos dis={dis} id={id} reset={reset}/>)}
    </div>
  );
}

export default PortfolioPage;
