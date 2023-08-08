import React from "react";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../api/requests";

// Row 컴포넌트는
//? 큰 이미지를 사용할 지 결정하는 선택적 prop
// isLargeRow?: boolean;
//? 각 row의 제목
// title: string;
//? 각 row를 구분하기 위한 ID
// id: string;
//? API 호출을 위한 URL
// fetchUrl: string;

const MainPage = () => {
  return (
    <div>
      <Banner />
      <Row
        title="NETFLEX ORIGINALS"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row
        title="Action Movies"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Comedy Movies"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
      />
    </div>
  );
};

export default MainPage;
