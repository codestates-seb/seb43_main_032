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
  const page404 = router !== '/404';
  const pageLogin = router !== '/users/login';
  const pageSignUp = router !== '/users/signup';

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {page404 && <Header />}
        <Box>
          <Component {...pageProps} />
        </Box>
        {page404 && <Contact />}
        <ModalBg></ModalBg>
        {page404 && <Footer />}
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
