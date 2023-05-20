import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import 'animate.css';
import Contact from '@/components/Contact';
import ModalBg from '@/components/ModalBg';
import { useRouter } from 'next/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 1000 * 60 * 5,
    },
  },
});

// 콘솔이 너무 지저분해져서 가상 서버 주석 처리
// if (process.env.NODE_ENV === 'development') {
//   require('../__mocks__');
// }

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter().pathname;

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {router !== '/404' && <Header />}
        <Box>
          <Component {...pageProps} />
        </Box>
        <Contact />
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
  z-index: 9999;
`;

const AskBox = styled.div<{ isVisible: boolean }>`
  min-width: 300px;
  max-height: 500px;
  bottom: ${({ isVisible }) => (isVisible ? '20px' : '-100%')};
  right: 20px;
  position: fixed;
  transition: bottom 0.5s ease-in-out;
`;
