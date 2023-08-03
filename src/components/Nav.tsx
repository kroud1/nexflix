import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ? 스크롤 위치에 따라 변하는 로직
// ? 검색 입력창
// ? 검색어를 입력하면 해당 검색어로 검색 결과 페이지로 이동하는 로직

const Nav: React.FC = () => {
  // 스크롤 위치에 따라 네비게이션 바의 스타일을 변경
  const [show, setShow] = useState<boolean>(false);

  // 검색 입력창의 값을 저장
  const [searchValue, setSerchValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    const handleScroll = (): void => {
      if (window.screenY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너를 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 검색 입력창의 값이 변경될 때 호출되는 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSerchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
        alt="NetFlix logo"
        className="nav__logo"
        onClick={() => (window.location.href = "/")}
      />
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        placeholder="영화를 검색해주세요"
      />
      <img
        src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
        alt="User logged"
        className="nav__avatar"
      />
    </nav>
  );
};

export default Nav;
