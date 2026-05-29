import React from 'react';
import portfolio from './person'
import './css/portfolioitem.css'
import Scroll from '../Header/Scroll';
import Link from 'next/link';
import Image from 'next/image';

function PersonProject( {reset} ) {

  return (
    <div className='main-comp person'>
      <div className="main-line">&nbsp;</div>
      <div className="main-line02">&nbsp;</div>
      <div className="main-index-wrap">
        <p className='main-subtitle'>
          The LDH
        </p>
        <h2 className='main-title'>
          Person Project
        </h2>

        <div className="person-portfolio">
          {portfolio.person.slice(0).reverse().map((item, index) => {
            return ( // 결과출력은 반드시 return으로 해야한다.
              <div className="person-portfolio_item" key={index}>
                <Link href={`/portfolio/${item.id}`} className="portfolio_link" key={index} onClick={reset}>
                <Image src={`/images/${item.program}`} alt={item.family} width={800} height={600} className='portfolio-program'/>
                <div className="portfolio-info_wrap">
                  <p className='portfolio-subtitle'>{item.family}</p>
                  <p className='portfolio-title'>{item.name}</p>
                </div>
                <span className="papper-white">&nbsp;</span>
                <span className="papper-fold">&nbsp;</span>
                </Link>
                <div className='papper-thumb'>
                  <Link href ={`/portfolio/${item.id}`} className="portfolio_link" key={index} onClick={reset}>
                  <Image src={`/images/${item.thumb}`} alt={item.family} width={400} height={300} className='portfolio-thumb'/>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Scroll />
    </div>
  );
}

export default PersonProject;