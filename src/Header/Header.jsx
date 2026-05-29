import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import './css/header.css'
import Menus from './Menus';
import { useAppContext } from '../../app/Context';

function Header() {
  const { isStart, setActiveSlide, reset } = useAppContext();
  const [toggle, setToggle] = useState('');
  const [menus , setMenus] = useState(false);
  const router = useRouter();

  const toMainTitle = () => {
    setToggle('');
    setTimeout(() => {
      setMenus(false);
    }, 500);
    setActiveSlide(0);
    router.push('/');
  }

  const menuEvent = () => {
    if (toggle === '') {
      setMenus(true);
      setTimeout(() => {
        setToggle('active');
      }, 0);
    } else {
      setToggle('');
      setTimeout(() => {
        setMenus(false);
      }, 500);
    }
  }
  const toggleHandleClick = () => {
    menuEvent();
  }

  return (
    <header className={`header ${isStart}`}>
      <div className="header-wrap">
        <h1 onClick={toMainTitle}>
            <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="로고" />
        </h1>

        <div className={`toggleBtn ${toggle}`} onClick={toggleHandleClick}>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </div>
      </div>
      {menus === true && <Menus setToggle={setToggle} toggle={toggle} menuEvent={menuEvent} />}
    </header>
  );
}

export default Header;