import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import logo from '../public/images/logo.svg';
import logoWhite from '../public/images/logoSymbolWhite.svg';
import { useOffResize } from '@/hooks/useOffResize';
import { HEADER_NAV } from '@/constant/constant';
import { deleteCookie, getCookie } from '@/util/cookie';
import { useRecoilState } from 'recoil';
import { loggedInUserState, navModalState } from '@/recoil/atom';
import { setUserState } from '@/util/api/user';
import Img from '../public/images/second-user.svg';
import { NavProps } from '@/types/types';
import ButtonStyle from './button/ButtonStyle';

const Header = () => {
  const router = useRouter();

  //로그인한 유저의 데이터 상태
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  //로그아웃
  const logout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    router.push('/').then(() => router.reload()); //로그인 유저가 바뀔 때 발생하는 버그를 막기위해 reload설정
  };

  //토큰이 유효하다면 유저 데이터 세팅
  useEffect(() => {
    setUserState()
      .then((res) => {
        if (getCookie('accessToken')) {
          setLoggedInUser(res);
        }
      })
      .catch(() => {
        //리프레시 토큰 api가 생기면 여기 넣어서 사용할듯?
      });
  }, []);

  //네비 이름 배열
  const navNames = useMemo(() => Object.keys(HEADER_NAV), []);

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
  const [nav, setNav] = useRecoilState(navModalState);
  const moveNav = (name: string) => {
    router.push(HEADER_NAV[name]);
    setNav(false);
  };
  const navHandler = () => {
    setNav(!nav);
  };
  useOffResize(960, 'up', setNav);

  return (
    <>
      <Nav nav={nav} isScrolled={isScrolled}>
        <NavLink href="/">
          <Image src={isScrolled ? logoWhite : logo} alt="logo" />
        </NavLink>
        <div className="bars-box">
          <div>
            <a className="bars" onClick={navHandler}>
              <span></span>
            </a>
          </div>
        </div>
        <NavMenu>
          {navNames.slice(0, 3).map((name) => (
            <li key={name}>
              <a
                onClick={() => router.push(HEADER_NAV[name])}
                className="noto-regular-12 sub-btn"
              >
                <span className="sub-btn-top">{name.toUpperCase()}</span>
              </a>
            </li>
          ))}
          {getCookie('accessToken')
            ? navNames.slice(3, 5).map((name) =>
                name === 'MY' ? (
                  <li key={name}>
                    <ButtonStyle
                      link={`${HEADER_NAV[name]}`}
                      text={name.toUpperCase()}
                    ></ButtonStyle>
                  </li>
                ) : (
                  <li key={name} onClick={logout}>
                    <ButtonStyle
                      link={`${HEADER_NAV[name]}`}
                      text={name.toUpperCase()}
                    ></ButtonStyle>
                  </li>
                )
              )
            : navNames.slice(5).map((name) => (
                <li key={name}>
                  <ButtonStyle
                    link={`${HEADER_NAV[name]}`}
                    text={name.toUpperCase()}
                  ></ButtonStyle>
                </li>
              ))}
        </NavMenu>
      </Nav>
      <ModalNav nav={nav}>
        {getCookie('accessToken') && (
          <div className="user">
            <Image src={Img} alt="profleImg" />
            <div className="userName">
              최기랑<span>, 환영합니다.</span>
            </div>
          </div>
        )}
        <ul>
          {getCookie('accessToken')
            ? navNames.slice(0, 4).map((name) => (
                <li
                  className="nanum-bold"
                  key={name}
                  onClick={() => moveNav(name)}
                >
                  {name}
                </li>
              ))
            : navNames.slice(0, 3).map((name) => (
                <li
                  className="nanum-bold"
                  key={name}
                  onClick={() => moveNav(name)}
                >
                  {name}
                </li>
              ))}
        </ul>
        <div className="nav-users">
          {getCookie('accessToken')
            ? navNames.slice(4, 5).map((name) => (
                <div className="logout" key={name}>
                  <ButtonStyle onClick={logout} text={name} />
                </div>
              ))
            : navNames.slice(5).map((name) => (
                <div key={name}>
                  <ButtonStyle onClick={() => moveNav(name)} text={name} />
                </div>
              ))}
        </div>
      </ModalNav>
    </>
  );
};

export default Header;

const ModalNav = styled.nav<NavProps>`
  z-index: 9999;
  background-color: white;
  width: 50%;
  height: 100%;
  position: fixed;
  top: 60px;
  right: ${(props) => (props.nav ? '0' : '-50%')};
  transition: 1.2s;
  display: none;

  .sub-btn {
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

    .sub-btn-top {
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

  .user {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    > img {
      width: 70%;
      height: 70%;
      border-radius: 50%;
      border: solid 2px black;
    }

    > .userName {
      margin-top: 20px;
      font-size: 15px;
    }
  }

  @media (max-width: 960px) {
    display: block;
  }
  ul {
    display: flex;
    flex-direction: column;
    li {
      padding: 24px;
      cursor: pointer;
      border-bottom: 1px solid #d1d1d1;
      font-size: 15px;
    }
  }
  .nav-users {
    display: flex;
    padding: 16px;
    > div {
      width: 50%;
      text-align: center;
      display: flex;
      justify-content: center;
      > button {
        cursor: pointer;
      }
    }
    > .logout {
      width: 100%;
    }
  }
`;

const Nav = styled.nav<NavProps>`
  .bars-box {
    width: 100%;
    display: flex;
    justify-content: end;
  }
  .bars {
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 60px;
    padding: 0px 16px;
    display: none;
    @media (max-width: 960px) {
      display: flex;
    }
    svg {
      font-size: 1.3rem;
    }

    > span {
      width: 16px;
      height: 2px;
      background-color: ${(props) => (props.nav ? '' : 'black')};
      ::before {
        position: absolute;
        content: '';
        background-color: black;
        width: 16px;
        height: 2px;
        left: 10;
        top: ${(props) => (props.nav ? '30px' : '23px')};
        transition-duration: 0.1s;
        transform: ${(props) => (props.nav ? 'rotate(45deg)' : '')};
      }
      ::after {
        position: absolute;
        content: '';
        background-color: black;
        width: 16px;
        height: 2px;
        left: 10;
        top: ${(props) => (props.nav ? '30px' : '35px')};
        transition-duration: 0.1s;
        transform: ${(props) => (props.nav ? 'rotate(-45deg)' : '')};
      }
    }
  }
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0px calc((100% - 1280px) / 2);
  z-index: 1000;
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
