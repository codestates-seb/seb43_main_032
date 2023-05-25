import { setCookie } from '@/util/cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function oauth2() {
  const router = useRouter();
  useEffect(() => {
    const url = window.location.href;
    const hasToken = url.includes('?access_token=');

    const tokenStrings = url.split('&');
    if (tokenStrings.length > 0) {
      const accessTokenString = tokenStrings[0];

      const startIndexOfAccessToken =
        accessTokenString.indexOf('?access_token=') + '?access_token='.length;
      const accessToken =
        'Bearer ' + accessTokenString.slice(startIndexOfAccessToken);
      setCookie('accessToken', accessToken, 120); // Set token in cookies
    }
    router.replace('/');
  }, []);

  return null;
}
