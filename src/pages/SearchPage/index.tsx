import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import axios from "axios";
import './SearchPage.css'

// 영화 데이터의 인터페이스 정의
interface Movie {
  backdrop_path: string | null; // 영화 배경 이미지 경로
  id: string; // 영화 고유 아이디
  media_type: string; // 영화 매체 타입
}

const SearchPage = () => {
  const navigate = useNavigate();

  // 검색 결과를 지정할 state를 Movie 배열로 설정
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  // 검색어를 파싱하기 위한 함수
  // 파싱 : 데이터를 조립해서 특정한 데이터만을 추출
  const useQuery = () => {
    return new URLSearchParams(useLocation().search); // 현재 URL의 쿼리 파라미터를 파싱
  };

  let query = useQuery();
  const searchTerm = query.get("q"); // 'q' 쿼리 파라미터의 값을 가져옵니다.
  // useDebounce : 사용자 함수
  // 입력을 마친 후 1초 동안 대기하는 Debounce를 적용한 검색어
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Debounce 검색어가 존재하면 해당 검색어로 영화를 검색
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  // 영화를 검색하는 비동기 함수
  const fetchSearchMovie = async (searchTerm: string) => {
    console.log("searchTerm", searchTerm);
    try {
      // 영화 데이터 API에서 searchTerm을 이용해 검색
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log(request);

      // 검색 결과를 상태에 저장
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  // 검색 결과를 랜더링하는 함수
  const renderSearchResult = () => {
    // searchResults 배열의 길이가 0보다 크면 (검색 결과가 있으면) 조건문 내부의 로직을 실행
    return searchResults.length > 0 ? (
      <section className="search-container">
        {/* searchResults 배열을 순회하면서 각 movie 요소에 대해 로직을 실행 */}
        {searchResults.map((movie: Movie) => {
          // 만약 movie의 backdrop_path가 null이 아니고, media_type이 "person"이 아니라면
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            // movieImageUrl은 영화 이미지 URL을 나타냄.
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                {/* 아래 div를 클릭하면, 해당 movie의 id를 기반으로 새로운 경로로 이동 */}
                <div
                  onClick={() => navigate(`/${movie.id}`)}
                  className="movie__column-poster"
                >
                  {/* 위에서 생성한 movieImageUrl을 사용하여 영화 이미지를 표시 */}
                  <img
                    src={movieImageUrl}
                    alt="movie"
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            찾고자하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    );
  };

  return renderSearchResult();
};

export default SearchPage;
