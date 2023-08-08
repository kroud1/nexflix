import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieModal from "./MovieModal";
// import './Row.css'

interface RowProps {
  // 큰 이미지를 사용할 지 결정하는 선택적 prop
  isLargeRow?: boolean;
  // 각 row의 제목
  title: string;
  // 각 row를 구분하기 위한 ID
  id: string;
  // API 호출을 위한 URL
  fetchUrl: string;
}

interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  name: string;
  overview: string;
  vote_average: number;
}

// 영화 목록을 렌더링
const Row: React.FC<RowProps> = ({ isLargeRow, title, id, fetchUrl }) => {
  // 영화 목록을 지정하는 state
  const [movies, setMovies] = useState<Movie[]>([]);

  // 모달이 열렸는지 아닌지에 대한 상태를 저장하는 state - modalOpen
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 사용자가 선택한 영화의 정보를 저장하는 state - movieSelected
  // 영화 정보 | 선택한 영화가 없을 경우(지정하지 않은 경우)
  const [movieSelected, setMovieSelected] = useState<Movie | null>(null);

  // useEffect 훅을 사용해서 컴포넌트가 마운트되거나, fetchUrl이 변경될 때마다 실행되도록 실행
  useEffect(() => {
    fetchMovieData(); // API 호출 함수를 실행
  }, [fetchUrl]);

  // API를 호출해서 영화 데이터를 가져오는 함수
  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl); // axios를 사용하여 API 호출
    console.log("request : ", request);
    setMovies(request.data.results); // 가져온 영화 데이터를 state에 저장
  };

  // 영화 포스터를 클릭하면 호출되는 함수
  const handleClick = (movie: Movie) => {
    setModalOpen(true); // 클릭 시 모달이 열리도록 설정
    setMovieSelected(movie); // 클릭한 영화의 정보를 저장
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      {/* row의 제목 출력 */}

      {/* 각 영화 포스터를 가로 스크롤 형태로 보여주는 부분 */}
      <div
        id={id}
        className="row__posters"
        style={{
          display: "flex",
          overflowX: "scroll",
          scrollSnapType: "x manatory",
        }}
      >
        {movies.map((movie) => (
          <div
            style={{ flex: "none", width: "300px", scrollSnapAlign: "start" }}
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              key={movie.id}
              style={{ padding: "25px 0", width: "100%" }}
              onClick={() => handleClick(movie)} // 이미지를 클릭하면 해당 handleClick함수를 호출
            />
          </div>
        ))}
      </div>

      {/* modalOpen이 true일 때, movieSeleted에 영화 정보가 있을 때 MovieModal 렌더링 */}
      {modalOpen && movieSelected && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
};

export default Row;
