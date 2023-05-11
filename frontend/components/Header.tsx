import LogoImage from '../public/images/main_logo2.png';
import Image from 'next/image';
import { FaUserAlt } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isLoggedInState } from '@/recoil/atom';
import { useRouter } from 'next/router';

const Nav = styled.nav`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  background: #fff;
  height: 80px;
  display: flex;
  /* justify-content: space-between; */
  padding: 0.5rem calc((100vw - 1280px) / 2);
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

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  white-space: nowrap;
  gap: 16px;

  > a {
    color: #000f;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    height: 60%;
    cursor: pointer;
    &.active {
      background-color: #15cdfc;
    }
  }

  .users {
    border-radius: 40px;
    min-width: 88px;
    background: #fec01d;
    color: #fff;
    outline: none;
    border: none;
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

  return (
    <>
      <Nav>
        <NavLink href="/">
          <Image src={LogoImage} alt="logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          <a onClick={() => router.push('/')} className="nanum-regular">
            Home
          </a>
          <a
            onClick={() => router.push('/community')}
            className="nanum-regular"
          >
            Community
          </a>
          <a onClick={() => router.push('/project')} className="nanum-regular">
            Projects
          </a>
          <a onClick={() => router.push('/users')} className="nanum-regular">
            Users
          </a>
          {isLoggedIn ? (
            <>
              <Link href="/mypage">
                <FaUserAlt size={20} />
              </Link>
              <Link href="/" className="nanum-regular users">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link href="/users/login" className="nanum-regular users">
                Login
              </Link>
              <Link href="/users/login" className="nanum-regular users">
                SignUp
              </Link>
            </>
          )}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Header;
