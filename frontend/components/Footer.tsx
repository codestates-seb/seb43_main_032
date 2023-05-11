import React, { useMemo } from 'react';
import LogoImage from '../public/images/main_logo2.png';
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
          <ul>
            {FOOTER_DATA[category].map((content) => (
              <li className="list">
                <a href="#">{content}</a>
              </li>
            ))}
          </ul>
        ))}
      </nav>
    </Box>
  );
};

export default Footer;

const Box = styled.footer``;
