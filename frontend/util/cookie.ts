function setCookie(name: string, value: string, minutes: any) {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

// 예시: 쿠키명이 "myCookie"이고 값이 "myValue"인 쿠키를 39분으로 설정
// setCookie("myCookie", "myValue", 39);

function getCookie(name: string) {
  const cookieName = name + '=';
  const cookieArray = document.cookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return '';
}

// 예시: "myCookie" 쿠키의 값을 가져오기
// const value = getCookie('myCookie');

function deleteCookie(name: string) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// 예시: "myCookie" 쿠키 삭제
// deleteCookie("myCookie");
