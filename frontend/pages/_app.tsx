import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/App.css';

const queryClient = new QueryClient();

if (process.env.NODE_ENV === 'development') {
  require('../__mocks__');
}

// 여기서 accessToken 있는지 확인하고 fetch를 해야한다

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
