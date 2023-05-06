import React from 'react';
import LogoImage from '../public/images/main_logo2.png';
import Image from 'next/image';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #000;
`;
const Container = styled.div``;
const Row = styled.div``;
const Menu = styled.div``;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Row>
          <div className="col" id="company">
            <Image src={LogoImage} alt="log" />
          </div>
          <li>
            <a>1:1 문의 카카오톡 연결</a>
          </li>
          <li>
            <a>상담 사이드퀘스 운영자 연결</a>
          </li>
          <li>
            <a>오픈챗 코드 7777</a>
          </li>
          <li>
            <a>제휴문의 help@sideQues.com</a>
          </li>
          <li>
            <a>Copyright&copy;2023 SideQuest.All rights reserved.</a>
          </li>
        </Row>
        <Menu></Menu>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
