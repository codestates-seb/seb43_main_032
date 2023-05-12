import Image from 'next/image';
import { FaUserAlt } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { isLoggedInState } from '@/recoil/atom';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { DefaultObj } from '@/types/types';
import logo from '../public/images/logo.svg';
import logoWhite from '../public/images/logoSymbolWhite.svg';
import Slider from './Slider';

const Header = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const router = useRouter();

  //네비
  const navArr: DefaultObj = {
    community: '/community',
    project: '/project',
    users: '/users',
    mypage: '/mypage',
    logout: '/',
    login: '/login',
    signUp: '/signup',
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

  //모달 네비
  const [nav, setNav] = useState(false);

  const navHandler = () => {
    setNav(!nav);
  };

  return (
    <>
      <Nav isScrolled={isScrolled}>
        <NavLink href="/">
          <Image src={isScrolled ? logoWhite : logo} alt="logo" />
        </NavLink>
        <Bars onClick={navHandler} />
        <NavMenu>
          {navNames.slice(0, 3).map((name) => (
            <li key={name}>
              <a
                onClick={() => router.push(navArr[name])}
                className="noto-regular-12 sub-btn"
              >
                <span className="sub-btn-top">{name.toUpperCase()}</span>
              </a>
            </li>
          ))}
          {isLoggedIn
            ? navNames.slice(3, 5).map((name) =>
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
                      className="noto-regular-12 main-btn"
                    >
                      <span>{name.toUpperCase()}</span>
                    </Link>
                  </li>
                )
              )
            : navNames.slice(5).map((name) => (
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
        <ModalNav nav={nav}></ModalNav>
      </Nav>
      <Slider isScrolled={isScrolled}></Slider>
    </>
  );
};

export default Header;

const navFade = keyframes`
    0% {
      transform: translate(270px, 0);
    }
    100% {
      transform: translate(0, 0);
    }
`;

type ModalProps = {
  nav: boolean;
};

const ModalNav = styled.nav<ModalProps>`
  z-index: 1;
  background-color: white;
  height: 50%;
  width: 50%;
  position: fixed;
  top: 60px;
  right: ${(props) => (props.nav ? '0' : '-50%')};
  transition: 1.2s;
`;

type NavProps = {
  isScrolled: boolean;
};

const Nav = styled.nav<NavProps>`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0px calc((100% - 1280px) / 2);
  z-index: 10;
  background: white;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.isScrolled
      ? 0
      : 'inset 3px 3px 5px #bebebe,inset -3px -3px 5px #eeeeeefb;'};
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(50deg, #8217f3 0%, #8217f3 50%, #4412e7 100%);
    opacity: ${(props) => (props.isScrolled ? 1 : 0)};
    transition: opacity 0.5s ease-in-out;
  }

  > ul {
    > li {
      > .main-btn {
        color: ${(props) => (props.isScrolled ? '#6333ff' : 'white')};
        font-family: var(--font-noto);
        position: relative;
        box-sizing: border-box;
        padding: 8px 16px;
        border-radius: 10px;
        font-weight: bold;
        transition: background 250ms ease-in-out;
        background: ${(props) =>
          props.isScrolled
            ? 'linear-gradient(-45deg,#ffffff, #e3e3e3, #ffffff)'
            : 'linear-gradient(-45deg,#c28aff, #9f4afa, #6333ff)'};
        background-size: 400% 400%;
        animation: AnimationName 4s ease infinite;
        &:hover {
          color: ${(props) => (props.isScrolled ? '#4412e7' : 'white')};
          background: ${(props) =>
            props.isScrolled
              ? 'linear-gradient(-45deg,#ffffff, #e3e3e3, #ffffff)'
              : 'linear-gradient(-45deg,#c28aff, #9f4afa, #6333ff)'};
        }

        > span {
          letter-spacing: 1px;
          font-size: 15px;
          font-weight: bold !important;
        }
      }

      > .sub-btn {
        position: relative;
        &::before {
          display: block;
          content: '';
          border: solid 3px transparent;
        }

        &:after {
          position: absolute;
          width: 100%;
          bottom: 0px;
          display: block;
          content: '';
          background: ${(props) => (props.isScrolled ? 'white' : '#c28aff')};
          transform: translateY(100%);
          transition: transform 250ms ease-in-out;
        }

        &:hover::after {
          height: 10%;
          transform: translateY(0%);
        }

        > .sub-btn-top {
          font-size: 15px !important;
          font-weight: 500 !important;
          color: ${(props) => (props.isScrolled ? 'white' : '#242424')};
          transition: color 250ms ease-in-out;

          &:hover {
            color: ${(props) => (props.isScrolled ? 'white' : '#4412e7')};
            font-weight: 500 !important;
          }
        }
      }
    }
  }
  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-o-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const NavLink = styled(Link)`
  width: auto;
  color: #000f;
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  &.active {
    background-color: #15cdfc;
  }

  > img {
    height: 30px;
  }
`;

const Bars = styled(FiMenu)`
  display: none;
  color: #000;
  @media screen and (max-width: 960px) {
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
    margin-left: 16px;
    color: #000f;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    &.active {
      background-color: #15cdfc;
    }
  }

  @media screen and (max-width: 960px) {
    display: none;
  }
`;
