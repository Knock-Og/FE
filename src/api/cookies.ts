import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const cookie = new Cookies();


export const SetCookie = (
  access_token: string,
  value: string,
  option?: { expires?: Date }
) => {
  
  //쿠키 만료시간 1시간 지정
  // const expires = option?.expires ?? new Date(Date.now() + 60 * 60 * 24);
  // cookie.set(access_token, value,  {
  //   expires: option?.expires ?? new Date(Date.now() + 8640000),
  // });
  cookie.set(access_token, value, option);
   
  // 활동이 없으면 쿠키 삭제
  const inactivityTime = 30 * 60 
  let timer: NodeJS.Timeout;
  let debouncedResetTimer: () => void;
  const Navigate = useNavigate();
  const resetTimer = () => {
    
    clearTimeout(timer);
    timer = setTimeout(() => {
      removeCookie(access_token);
      alert("활동을 하지않아 자동 로그아웃되었습니다.");
      Navigate("/");
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
    debouncedResetTimer.bind(null, access_token)
  );
  window.addEventListener(
    "keydown",
    debouncedResetTimer.bind(null, access_token)
  );
  window.addEventListener(
    "scroll",
    debouncedResetTimer.bind(null, access_token)
  );

  return;
};


export const getCookie = (access_token: string) => {
  return cookie.get(access_token);
};
export const removeCookie = (access_token: string) => {
  return cookie.remove(access_token);
};
