import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LogoImage from '../public/images/main_logo2.png';
import Image from 'next/image';
import Link from 'next/link';
// import LogoImage2 from '../public/images/logo.png';
import { FaUserAlt } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { isLoginState } from '@/recoil/atom';

const Nav = styled.nav`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  background: #303952;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1280px) / 2);
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #15cdfc;
  }
`;

const Bars = styled(FiMenu)`
  display: none;
  color: #fff;
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

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  white-space: nowrap;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  justify-content: flex-end;
  width: 100vw;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

function Header() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  return (
    <>
      <Nav>
        <NavLink href="/">
          <Image src={LogoImage} alt="logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          {isLogin && (
            <>
              <NavLink href="/" className="nanum-regular">
                Home
              </NavLink>
              <NavLink href="/community" className="nanum-regular">
                커뮤니티
              </NavLink>
              <NavLink href="/projects" className="nanum-regular">
                프로젝트
              </NavLink>
              <NavLink href="/mypage">
                <FaUserAlt size={20} />
              </NavLink>
            </>
          )}
        </NavMenu>

        <NavBtn>
          {isLogin ? (
            <NavBtnLink href="/logout" className="nanum-regular">
              로그아웃
            </NavBtnLink>
          ) : (
            <>
              <NavLink href="/" className="nanum-regular">
                Home
              </NavLink>
              <NavLink href="/community" className="nanum-regular">
                커뮤니티
              </NavLink>
              <NavLink href="/projects" className="nanum-regular">
                프로젝트
              </NavLink>
              <NavBtnLink href="/user/login" className="nanum-regular">
                로그인
              </NavBtnLink>
              <NavBtnLink href="/user/login" className="nanum-regular">
                회원가입
              </NavBtnLink>
            </>
          )}
        </NavBtn>
      </Nav>
    </>
  );
}

export default Header;
