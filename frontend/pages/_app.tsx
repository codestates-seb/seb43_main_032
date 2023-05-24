import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/App.css';
import Footer from '../components/Footer';
import styled from 'styled-components';
import 'animate.css';
import Contact from '@/components/Contact';
import { useRouter } from 'next/router';
import LoginBg from '@/components/user/LoginBg';
import BannerSlider from '@/components/banner/BannerSlider';
import Header from '@/components/header/Header';
import EtcHeader from '@/components/header/EtcHeader';
import ModalBg from '@/components/background/ModalBg';
import Chat from './chat';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { pathname } = router;
  const isBannerVisible =
    pathname === '/' ||
    pathname === '/community' ||
    pathname === '/project' ||
    pathname === '/users';
  const isExcludedPathname =
    pathname === '/404' ||
    pathname === '/users/login' ||
    pathname === '/users/signup' ||
    pathname.includes('/chat');

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {pathname.includes('/chat') ? (
          <></>
        ) : !isExcludedPathname ? (
          <Header />
        ) : (
          <EtcHeader />
        )}
        {isBannerVisible && <BannerSlider />}
        {pathname === '/about' || pathname.includes('/chat') ? (
          <Component />
        ) : (
          <Box>
            <Component {...pageProps} />
          </Box>
        )}
        {!isExcludedPathname && <Contact />}
        <ModalBg />
        {!isExcludedPathname && <Footer />}
        {isExcludedPathname && <LoginBg />}
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;

const Box = styled.main`
  min-height: 100vh;
  padding: 0px calc((100% - 1280px) / 2);
  padding-top: 60px;
  flex: 1;

  .test {
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    .ex {
      width: 100px;
      height: 100px;
      background-color: #ffc6c6;
    }
  }
`;
