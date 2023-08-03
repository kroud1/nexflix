import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ! 특정 영화의 상세 정보를 가져와서 표시하는 컴포넌트

// ! useParams를 사용해 동적 라우트 매개변수를 가져옴.
// : 특정 영화의 데이터를 API로부터 받아와서 페이지에 표시

// 영화 데이터를 표시하는 인터페이스
interface Movie {
  backdrop_path: string;
}

interface RouteParams {
  [key: string]: string | undefined;
  movieId: string;
}

const DetailPage = () => {
  // useParams를 통해 URL에서 movieId를 가져옴
  const { movieId } = useParams<RouteParams>() as RouteParams;

  // movie의 초기값: undefined
  // 이후 Movie 객체로 업데이트 가능
  const [movie, setMovie] = useState<Movie | undefined>();

  useEffect(() => {
    async function fetchData() {
      // axios를 사용해 API로부터 movieId에 해당하는 영화 데이터를 받아옴
      const request = await axios.get<Movie>(`/movie/${movieId}`);
      setMovie(request.data);
    }
    // movieId가 변경될 때 마다 데이터를 새로 받아옴.
  }, [movieId]);

  if (!movie) return <div>...loading</div>;

  return (
    <section>
      {/* 받아온 영화 데이터의 backdrop_path를 사용해 포스터 이미지를 표시 */}
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  );
};

export default DetailPage;
