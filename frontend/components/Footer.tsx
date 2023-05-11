import React, { useMemo } from 'react';
import LogoImage from '@/public/images/main_logo2.png';
import Image from 'next/image';
import styled from 'styled-components';
import { FOOTER_DATA } from '@/constant/constant';
import Link from 'next/link';

const Footer = () => {
  const categories = useMemo(() => Object.keys(FOOTER_DATA), []);
  return (
    <Box>
      <div>
        <Link href="/">
          <Image alt="logo" src={LogoImage} />
        </Link>
      </div>
      <nav>
        {categories.map((category) => (
          <div>
            <h2 className="nanum-regular">{category}</h2>
            <ul>
              {FOOTER_DATA[category].map((content) => (
                <li className="list">
                  <a href="#">{content}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </Box>
  );
};

export default Footer;

const Box = styled.footer`
  padding: 0px calc((100% - 1280px) / 2);
  display: flex;
  > div {
    padding: var(--padding-1);
  }

  > nav {
    flex: 1;
    padding: var(--padding-1);
    display: flex;
    > div {
      width: calc(65% / 3);
    }
    > div:first-child {
      width: 35%;
    }
    ul {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
`;
