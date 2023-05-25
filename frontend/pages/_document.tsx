import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import type { DocumentContext, DocumentInitialProps } from 'next/document';

type Props = {
  styles: React.ReactElement[];
};

const MyDocument = ({ styles }: Props) => {
  return (
    <Html lang="ko">
      <Head>
        <meta name="description" content="Side-Quest입니다." />
        <meta property="og:title" content="Side-Quest" />
        <meta property="og:description" content="Side-Quest입니다." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:url" content="https://sidequest.co.kr/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Side-Quest" />
        <meta name="twitter:description" content="Side-Quest입니다." />
        <meta name="twitter:image" content="/images/logo.svg" />
        <link rel="canonical" href="https://sidequest.co.kr/" />
        <link rel="icon" href="/favicon.png" />
        {styles}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentInitialProps & { styles: React.ReactElement[] }> => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;
  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });
    const initialProps = await Document.getInitialProps(ctx);
    const styles = sheet.getStyleElement();
    return { ...initialProps, styles };
  } finally {
    sheet.seal();
  }
};

export default MyDocument;
