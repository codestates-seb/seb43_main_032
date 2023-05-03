import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LogoImage from '../public/images/main_logo2.png';
import Image from 'next/image';
import Link from 'next/link';
// import LogoImage2 from '../public/images/logo.png';
import { FaUserAlt } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

interface IWindowSize {
  width: number;
  height: number;
}

const Nav = styled.nav`
  height: 80px;
  background-color: var(--main-color-1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 5px 5px 5px var(--main-color-2);
`;

const LogoContainer = styled.div`
  padding-left: 16px;
`;

const NavLinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  padding: 16px;
  margin: 16px;
  font-size: 16px;
  font-family: var(--font-nanum);
  color: #171717;
  &:hover {
    color: var(--sub-font-gray);
  }
`;

const MenuIcon = styled(FiMenu)`
  cursor: pointer;
`;

const OverlayMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vh;
  height: 100vh;
  background-color: var(--sub-font-gray);
`;

const MenuLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};

function Header() {
  const size: IWindowSize = useWindowSize();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <Nav>
      <LogoContainer>
        <NavLink href="/">
          <Image src={LogoImage} alt="logo" width={200} height={40} />
          {/* <Image src={LogoImage2} alt="logo" width={50} height={50} /> */}
        </NavLink>
      </LogoContainer>
      <NavLinkContainer>
        {size.width > 768 ? (
          <>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/community">커뮤니티</NavLink>
            <NavLink href="/project">프로젝트</NavLink>
            <NavLink href="/mypage">
              <FaUserAlt size={20} />
            </NavLink>
          </>
        ) : (
          <MenuIcon onClick={openMenu} size={30} />
        )}
      </NavLinkContainer>
      {showMenu && (
        <MenuLinkContainer>
          <OverlayMenu>
            <NavLink href="/">Home</NavLink>
          </OverlayMenu>
          <OverlayMenu>
            <NavLink href="/community">커뮤니티</NavLink>
          </OverlayMenu>
          <OverlayMenu>
            <NavLink href="/project">프로젝트</NavLink>
          </OverlayMenu>
          <OverlayMenu>
            <NavLink href="/mypage">마이페이지</NavLink>
          </OverlayMenu>
        </MenuLinkContainer>
      )}
    </Nav>
  );
}

export default Header;
