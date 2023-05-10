import LogoImage from '../public/images/main_logo2.png';
import Image from 'next/image';
import { FaUserAlt } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isLoggedInState } from '@/recoil/atom';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { DefaultObj } from '@/types/types';

const Nav = styled.nav`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  background: #fff;
  height: 80px;
  display: flex;
  padding: 0px calc((100% - 1280px) / 2);
  z-index: 10;
`;

const NavLink = styled(Link)`
  color: #000f;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    background-color: #15cdfc;
  }
`;

const Bars = styled(FiMenu)`
  display: none;
  color: #000;
  @media screen and (max-width: 768px) {
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

  > li {
    margin-left: 20px;
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

  .users {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    min-width: 88px;
    background: #fec01d;
    color: #fff;
    outline: none;
    border: none;
    height: 100%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover {
      transition: all 0.2s ease-in-out;
      background: #f0edb1;
      color: #010606;
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

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

  return (
    <>
      <Nav>
        <NavLink href="/">
          <Image src={LogoImage} alt="logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          {navNames.slice(0, 4).map((name) => (
            <li>
              <a
                onClick={() => router.push(navArr[name])}
                className="nanum-regular"
              >
                {name}
              </a>
            </li>
          ))}
          {isLoggedIn
            ? navNames.slice(4, 6).map((name) =>
                name === 'mypage' ? (
                  <li>
                    <Link href={`${navArr[name]}`}>
                      <FaUserAlt size={20} />
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      href={`${navArr[name]}`}
                      className="nanum-regular users"
                    >
                      {name}
                    </Link>
                  </li>
                )
              )
            : navNames.slice(6).map((name) => (
                <li>
                  <Link
                    href={`/users${navArr[name]}`}
                    className="nanum-regular users"
                  >
                    {name}
                  </Link>
                </li>
              ))}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Header;
