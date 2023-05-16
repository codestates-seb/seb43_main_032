import type { AppProps } from 'next/app';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import 'animate.css';
import { useState } from 'react';
import { FcSms } from 'react-icons/fc';
import Contact from '@/components/Contact';
import ModalBg from '@/components/ModalBg';

const queryClient = new QueryClient();

if (process.env.NODE_ENV === 'development') {
  require('../__mocks__');
}

const App = ({ Component, pageProps }: AppProps) => {
  const [isContact, setIsContact] = useState(false);
  const contactHandler = () => {
    setIsContact(!isContact);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Header />
        <Box>
          <Component {...pageProps} />
        </Box>
        <ModalBox>
          {isContact ? (
            <Contact contactHandler={contactHandler} />
          ) : (
            <FcSms onClick={contactHandler} />
          )}
        </ModalBox>
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

const ModalBox = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  > svg {
    height: 70px;
    width: 70px;
    cursor: pointer;
  }
`;
