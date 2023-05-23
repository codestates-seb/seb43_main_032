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
import BannerSlider from '@/components/banner/BannerSlider';

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
    pathname === '/users/signup';

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {!isExcludedPathname ? <Header /> : <EtcHeader />}
        {isBannerVisible && <BannerSlider />}
        {pathname === '/about' ? (
          <Component />
        ) : (
          <Box>
            <Component {...pageProps} />
          </Box>
        )}
        {!isExcludedPathname && <Contact />}
        <ModalBg></ModalBg>
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
