import React from 'react';
import LogoImage from '../public/images/main_logo2.png';
import Image from 'next/image';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #000;
  width: 100%;
  min-height: 350px;
  padding: 60px 16px;
  left: 0;
  position: absolute;
  z-index: 10;
`;
const Container = styled.div`
  display: flex;

  max-width: 1280px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  .sidefooter {
    display: flex;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .col {
    color: #fff;
    text-decoration: none;
    padding: 0 32px;
  }

  .list {
    outline: none;
    border: none;
    list-style-type: none;
    margin-bottom: 15px;
  }

  .list a {
    text-decoration: none;
    list-style-type: none;
    color: #fff;
  }

  .col h3 {
    color: #f1f2f6;
    margin-bottom: 15px;
    position: relative;
    cursor: pointer;
  }

  .col h3::after {
    content: '';
    height: 3px;
    width: 50px;
    background-color: #fab1a0;
    bottom: 0;
    left: 0;
    transition: all 0.3s ease;
  }

  .noto-regular-13 a {
    display: block;
    color: #fff;
    margin-bottom: 5px;
    position: relative;
    transition: all.3s ease;
  }

  @media screen and (max-width: 980px) {
    .row {
      flex-direction: column;
    }
    .col {
      width: 100%;
      text-align: left;
      margin-bottom: 25px;
    }
    .img {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    .row {
      flex-direction: column;
    }
    .col {
      width: 100%;
      text-align: left;
      margin-bottom: 20px;
    }
    .img {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    .sidefooter {
      flex-direction: column;
      width: 100%;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <div className="row">
          <div className="col" id="company">
            <Image
              src={LogoImage}
              alt="log"
              style={{ marginBottom: '25px' }}
              className="img"
            />
            <div className="nanum-regular list">
              <li className="list">
                <a href="#">1:1 문의 카카오톡 연결</a>
              </li>
              <li className="list">
                <a href="#">상담 사이드퀘스 운영자 연결</a>
              </li>
              <li className="list">
                <a href="#">오픈챗 코드 7777</a>
              </li>
              <li className="list">
                <a href="#">제휴문의 help@sideQues.com</a>
              </li>
              <li className="list">
                <a>Copyright&copy;2023 SideQuest.All rights reserved.</a>
              </li>
            </div>
          </div>

          <div className="sidefooter">
            <div className="col" id="About">
              <h3 className="nanum-regular">About</h3>
              <div className="noto-regular-13 list ">
                <a href="#">SideQuest 소개</a>
              </div>
            </div>
            <div className="col" id="Service">
              <h3 className="nanum-regular">Service</h3>
              <div className="noto-regular-13 list ">
                <li className="list">
                  <a href="#">프로젝트 등록</a>
                </li>
                <li className="list">
                  <a href="#">프로젝트 찾기</a>
                </li>
                <li className="list">
                  <a href="#">파트너 등록</a>
                </li>
              </div>
            </div>
            <div className="col" id="Support">
              <h3 className="nanum-regular">Support</h3>
              <div className="noto-regular-13 list">
                <li className="list">
                  <a href="#">서비스 이용약관</a>
                </li>
                <li className="list">
                  <a href="#">개인정보처리방침</a>
                </li>
                <li className="list">
                  <a href="#">FAQ</a>
                </li>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
