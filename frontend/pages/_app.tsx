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
import LoginBg from '@/components/user/LoginBg';
import EtcHeader from '@/components/EtcHeader';

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
  const check = (pathname: string) => {
    return (
      pathname === '/404' ||
      pathname === '/users/login' ||
      pathname === '/users/signup'
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {!check(router) ? <Header /> : <EtcHeader />}
        <Box>
          <Component {...pageProps} />
        </Box>
        {!check(router) && <Contact />}
        <ModalBg></ModalBg>
        {!check(router) && <Footer />}
        {check(router) && <LoginBg />}
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
