import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const cookie = new Cookies();

export const setCookie = (
  cookieName: string,
  value: string,
  option?: { expires?: Date }
) => {
  //쿠키 만료시간 1시간 지정
  // const expires = option?.expires ?? new Date(Date.now() + 60 * 60 * 24);
  // cookie.set(cookieName, value, { expires });
  cookie.set(cookieName, value, option);

  // 활동이 없으면 쿠키 삭제
  const inactivityTime = 60 * 60 * 24;
  let timer: NodeJS.Timeout;
  let debouncedResetTimer: () => void;
  //const Navigate = useNavigate();
  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      removeCookie(cookieName);
      alert("활동을 하지않아 자동 로그아웃되었습니다.");
      //Navigate("/");
    }, inactivityTime);
  };

  const debounce = <T extends unknown[]>(
    func: (...args: T) => void,
    delay: number
  ) => {
    let inDebounce: NodeJS.Timeout;
    return function (this: unknown, ...args: T) {
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(this, args), delay);
    };
  };

  debouncedResetTimer = debounce(resetTimer, inactivityTime);
  // 이벤트 발생시 타이머 초기화
  window.addEventListener(
    "mousemove",
    debouncedResetTimer.bind(null, cookieName)
  );
  window.addEventListener(
    "keydown",
    debouncedResetTimer.bind(null, cookieName)
  );
  window.addEventListener("scroll", debouncedResetTimer.bind(null, cookieName));

  return;
};
export const getCookie = (cookieName: string) => {
  return cookie.get(cookieName);
};
export const removeCookie = (cookieName: string) => {
  return cookie.remove(cookieName);
};

// ruffy@kakao.com
// ruffy1234!