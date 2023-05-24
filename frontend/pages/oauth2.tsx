import React from 'react';

export default function oauth2() {
  return <div>oauth2</div>;
}
import { setCookie } from '@/util/cookie';
import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext) {
  const { req, res } = context;
  const { access_token } = context.query;

  if (typeof access_token === 'string') {
    const date = new Date();
    date.setTime(date.getTime() + 120 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie =
      'accessToken' + '=' + access_token + ';' + expires + ';path=/';
  }
  res.writeHead(302, { Location: '/users' });
  res.end();

  // 페이지가 필요하지 않으므로 빈 props 반환
  return { props: {} };
}
