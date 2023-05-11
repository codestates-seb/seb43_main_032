import LogoImage from '../public/images/main_logo2.png';
import Image from 'next/image';
import { FaUserAlt } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isLoggedInState } from '@/recoil/atom';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { DefaultObj } from '@/types/types';

const Header = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const router = useRouter();

  //네비
  const navArr: DefaultObj = {
    home: '/',
    community: '/community',
    projects: '/project',
    users: '/users',
    mypage: '/mypage',
    logout: '/',
    login: '/login',
    signUp: '/signUp',
  };

  //네비 이름 배열
  const navNames = useMemo(() => Object.keys(navArr), []);

  //스크롤 높이 상태
  const [isScrolled, setIsScrolled] = useState(false);

  //스크롤 높이 상태 핸들러
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  //스크롤이 10이상 내려오면 네비바의 배경을 입혀주기 위한 이펙트
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (window.scrollY > 10) {
      setIsScrolled(true);
    }
  }, []);

  return (
    <>
      <Nav isScrolled={isScrolled}>
        <NavLink href="/">
          <Image src={LogoImage} alt="logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          {navNames.slice(0, 4).map((name) => (
            <li key={name}>
              <a
                onClick={() => router.push(navArr[name])}
                className="nanum-regular sub-btn"
              >
                <span className="sub-btn-top">{name.toUpperCase()}</span>
              </a>
            </li>
          ))}
          {isLoggedIn
            ? navNames.slice(4, 6).map((name) =>
                name === 'mypage' ? (
                  <li key={name}>
                    <Link href={navArr[name]}>
                      <FaUserAlt size={20} />
                    </Link>
                  </li>
                ) : (
                  <li key={name}>
                    <Link
                      href={navArr[name]}
                      className="nanum-regular main-btn"
                    >
                      <span>{name.toUpperCase()}</span>
                    </Link>
                  </li>
                )
              )
            : navNames.slice(6).map((name) => (
                <li key={name}>
                  <Link
                    href={`/users${navArr[name]}`}
                    className="nanum-regular main-btn"
                  >
                    <span>{name.toUpperCase()}</span>
                  </Link>
                </li>
              ))}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Header;

type NavProps = {
  isScrolled: boolean;
};

const Nav = styled.nav<NavProps>`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  background: #fff;
  height: 80px;
  display: flex;
  padding: 0px calc((100% - 1280px) / 2);
  box-shadow: ${(props) => props.isScrolled && '0 2px 4px rgba(0, 0, 0, 0.2)'};
  z-index: 10;
`;

const NavLink = styled(Link)`
  width: auto;
  color: #000f;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding-left: 20px;
  height: 100%;
  cursor: pointer;
  &.active {
    background-color: #15cdfc;
  }
`;

const Bars = styled(FiMenu)`
  display: none;
  color: #000;
  @media screen and (max-width: 980px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: end;
  white-space: nowrap;
  padding-right: 20px;

  > li {
    margin-left: 24px;
    color: #000f;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    height: 50%;
    cursor: pointer;
    &.active {
      background-color: #15cdfc;
    }
  }

  @media screen and (max-width: 980px) {
    display: none;
  }
`;
