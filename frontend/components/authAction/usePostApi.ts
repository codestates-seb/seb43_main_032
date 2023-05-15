// import { useState } from 'react';

// interface IObj {
//   isLoading: boolean;
//   data: undefined | any;
//   error: undefined | any;
// }

// export default function useApi(url: string): [(data?: any) => void, IObj] {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState<undefined | any>(undefined);
//   const [error, setError] = useState<undefined | any>(undefined);
//   function mutation(data?: any) {
//     setIsLoading(true);
//     fetch(url, {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }) //
//       .then((res) => res.json())
//       .then(setData)
//       .catch(setError)
//       .finally(() => setIsLoading(false));
//   }
//   return [mutation, { isLoading, data, error }];
// }

import { useState } from 'react';
import axios from 'axios';

interface IObj {
  isLoading: boolean;
  data: undefined | any;
  auth: undefined | any;
  error: undefined | any;
}

const BASE_URL = 'http://43.201.253.57:8080/';

export default function usePostApi(
  endpoint: string
): [(data?: any) => void, IObj] {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [auth, setAuth] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);

  function mutation(data?: any) {
    setIsLoading(true);
    axios
      .post(BASE_URL + endpoint, data)
      .then((res) => {
        setData(res);
        setAuth(res.headers['authorization']);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }

  return [mutation, { isLoading, data, auth, error }];
}
