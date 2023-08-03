import React, { useEffect, useState } from "react";
import requests from "../api/requests";
import axios from "axios";
import styled from "styled-components";

// ! 웹 페이지 배너 구현
// : 배너에 표시되는 영화 정보를 불러오는 기능 담당
// : 사용자가 'Play' 버튼 클릭 시 = 배너가 영화의 YouTube 트레일러로 대체

// ^ movie의 상세 정보를 포함하는 타입 정의
type MovieDetail = {
  title: string;
  name: string;
  original_name: string;
  overview: string;
  backdrop_path: string;
  videos: {
    results: {
      key: string;
    }[];
  };
};

export default function Banner() {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영 중인 영화 정보를 가져옴.
    const request = await axios.get(requests.fetchNowPlaying);

    // 여려 영화 중에서 무작위로 하나를 선택
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    // 선택한 영화의 상세 정보를 가져옴
    const { data: MovieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(MovieDetail);
  };

  const truncate = (str: string | undefined, n: number) => {
    if (!str) return str; // str에 undefined인 경우, 즉시 str을 반환 & 로직 수행 X
    return str.length > n ? str.substring(0, n - 1) + "..." : str;
    // 안녕하세요. 반갑습니다. 이승아입니다.
    // 안녕하세요. 반갑...
  };

  // 컴포넌트가 처음 렌더링 되었을 때 (Play버튼 클릭 이전, isClicked가 false일 때) 배너를 보여줌
  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner_buttons">
            <button
              className="banner_button play"
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className="banner_button info">More Information</button>
          </div>
          <h1 className="banner_description">
            {truncate(movie?.overview, 100)}
          </h1>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  } else {
    // 컴포넌트가 클릭되었을 때 (isClicked가 true일 때) 동영상을 보여줌
    <Container>
      <HomeContainer>
        <Iframe
          src={`https://www.youtube.com/embed/${movie?.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie?.videos.results[0].key}`}
          title="YouTube video player"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></Iframe>
      </HomeContainer>
    </Container>;
  }
}

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
width: 100%
height: 100%;
`;
