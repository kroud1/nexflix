import React, { useEffect, useState } from "react";

// 디바운스 : 시간이 지남에 따라 함수를 몇 번이나 실행할지를 제어하는 기술
//         : 연속으로 호출되는 함수들 중에 마지막(또는 제일 처음)에 호출되는 함수만 실행되도록 하는 것

// 사용자가 검색어를 타이핑할 때 검색어가 변경될때마다 즉시 검색을 실행하지 않고,
// 일정 시간동안 추가 입력이 없을 때 한번만 검색을 실행

const useDebounce = <T>(value: T, delay: number): T => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // delay 만큼 시간이 지나면, value를 debouncedValue로 설정하는 타임아웃을 설정
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    // 변경 전에 타임아웃을 클리어
    // 클리어 과정을 진행해야 이전 value나 delay에 영향을 받지 X
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // value나 delay가 변경될 때마다 이 효과를 다시 실행

  return debounceValue; // 최종적으로 디바운스된 값을 반환
};

export default useDebounce;
