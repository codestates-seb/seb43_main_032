import type { AppProps } from 'next/app';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import 'animate.css';
import { useState } from 'react';
import Contact from '@/components/Contact';
import ModalBg from '@/components/ModalBg';
import Image from 'next/image';
import icon from '../public/images/icon.svg';

const queryClient = new QueryClient();

if (process.env.NODE_ENV === 'development') {
  require('../__mocks__');
}

const App = ({ Component, pageProps }: AppProps) => {
  const [isContact, setIsContact] = useState(false);
  const [isSlideVisible, setIsSlideVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const contactHandler = () => {
    setIsContact(!isContact);
    setIsSlideVisible(true);
  };

  const closeContact = () => {
    setIsContact(false);
    setIsSlideVisible(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Header />
        <Box>
          <Component {...pageProps} />
        </Box>
        <IconBox>
          <Image
            src={icon}
            onClick={contactHandler}
            alt="chat-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={
              isHovered
                ? 'animate__animated animate__bounce animate__infinite animate-duration-2'
                : ''
            }
          />
        </IconBox>
        <AskBox isVisible={isSlideVisible}>
          <Contact closeContact={closeContact} />
        </AskBox>
        <ModalBg></ModalBg>
        <Footer />
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;

const Box = styled.main`
  min-height: 100vh;
  padding: 0px calc((100% - 1280px) / 2);
  padding-top: 80px;
  flex: 1;
`;

const IconBox = styled.div`
  transition: all 1s ease-in-out;
  bottom: 20px;
  right: 20px;
  position: fixed;
  cursor: pointer;
`;

const AskBox = styled.div<{ isVisible: boolean }>`
  min-width: 300px;
  max-height: 500px;
  bottom: ${({ isVisible }) => (isVisible ? '20px' : '-100%')};
  right: 20px;
  position: fixed;
  transition: bottom 0.5s ease-in-out;
`;
