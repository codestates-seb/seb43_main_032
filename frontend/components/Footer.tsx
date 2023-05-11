import React, { useMemo } from 'react';
import LogoImage from '../public/images/main_logo2.png';
import Image from 'next/image';
import styled from 'styled-components';
import { FOOTER_DATA } from '@/constant/constant';

const Footer = () => {
  const categories = useMemo(() => Object.keys(FOOTER_DATA), []);
  return (
    <FooterContainer>
      <Container>
        <div className="row">
          <div className="col" id="company">
            <div className="img-box">
              <Image
                src={LogoImage}
                alt="log"
                style={{ marginBottom: '25px' }}
                className="img"
              />
            </div>
            <div className="list-container">
              <ul className="nanum-regular list">
                {FOOTER_DATA[categories[0]].map((content) => (
                  <li className="list">
                    <a href="#">{content}</a>
                  </li>
                ))}
              </ul>
              <div className="sidefooter">
                <div className="col" id="About">
                  <h3 className="nanum-regular">About</h3>
                  <ul className="noto-regular-13 list ">
                    {FOOTER_DATA[categories[1]].map((content) => (
                      <li className="list">
                        <a href="#">{content}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col" id="Service">
                  <h3 className="nanum-regular">Service</h3>
                  <ul className="noto-regular-13 list ">
                    {FOOTER_DATA[categories[2]].map((content) => (
                      <li className="list">
                        <a href="#">{content}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col" id="Support">
                  <h3 className="nanum-regular">Support</h3>
                  <ul className="noto-regular-13 list">
                    {FOOTER_DATA[categories[3]].map((content) => (
                      <li className="list">
                        <a href="#">{content}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #000;
  width: 100%;
  min-height: 350px;
  padding: 50px 16px;
  left: 0;
  bottom: 0;
  z-index: 10;
  /* position: absolute; */
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

  .list-container {
    display: flex;
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
    .list {
      line-height: 150%;
    }
    .img {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    .list-container {
      flex-direction: column;
    }
    .sidefooter {
      flex-direction: column;
      width: 100%;
    }
    .col {
      min-width: none;
    }
  }
`;
