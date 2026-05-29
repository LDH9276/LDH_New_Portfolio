import React from 'react';
import Link from 'next/link';
import portfolio from './team'
import './css/portfolioteam.css'
import Scroll from '../Header/Scroll';
import Image from 'next/image';

function TeamProject({reset}) {
  return (
    <div className='main-comp team'>
      <div className="main-line">&nbsp;</div>
      <div className="main-index-wrap">
        <p className='main-subtitle'>
          The LDH
        </p>
        <h2 className='main-title'>
          Team Project
        </h2>

        <div className="team-portfolio">
        {portfolio.person.slice(0).reverse().map((item, index) => {
            return ( // 결과출력은 반드시 return으로 해야한다.
              <div className="team-portfolio_item" key={index}>
                <Link href={`/portfolio/${item.id}`}  onClick={reset} className="team-portfolio_link" key={index}  >
                <Image src={`/images/${item.program}`} alt={item.family} width={800} height={600} className='portfolio-program'/>
                <div className="team-portfolio-info_wrap">
                  <p className='portfolio-subtitle'>{item.family}</p>
                  <p className='portfolio-title'>{item.name}</p>
                </div>
                <span className="papper-white">&nbsp;</span>
                <span className="papper-fold">&nbsp;</span>
                </Link>
                <div className='papper-thumb'>
                  <Link href={`/portfolio/${item.id}`}  onClick={reset}>
                  <Image src={`/images/${item.thumb}`} alt={item.family} width={400} height={300} className='portfolio-thumb'/>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="main-line02">&nbsp;</div>
      <Scroll />
    </div>
  );
}

export default TeamProject;