import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

const queryClient = new QueryClient();

if (process.env.NODE_ENV === 'development') {
  require('../__mocks__');
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Header />
        <Box>
          <Component {...pageProps} />
        </Box>
        <Footer />
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;

const Box = styled.main`
  padding-top: 80px;
`;
