//! 각각의 영화 장르와 관련된 API 요청 URL을 문자열 형태로 저장하고 있는 객체

type Requests = {
  // 요청 URL 문자열을 값으로 가지는 객체의 타입을 정의
  [key: string]: string;
};

// 각 요청에 대한 URL을 저장하는 객체 생성
const requests: Requests = {
  // 현재 상영 중인 영화를 가져옵니다.
  fetchNowPlaying: "movie/now_playing",
  // 넷플릭스 오리지널 컨텐츠를 가져오는 요청 URL입니다.
  fetchNetflixOriginals: "/discover/tv?with_networks=213",
  // 이번 주 트렌드를 가져오는 요청 URL입니다.
  fetchTrending: "/trending/all/week",
  // 가장 높은 평점을 받은 영화를 가져오는 요청 URL입니다.
  fetchTopRated: "/movie/top_rated",
  
  // 액션 장르의 영화를 가져오는 요청 URL입니다.
  fetchActionMovies: "/discover/movie?with_genres=28",
  // 코미디 장르의 영화를 가져오는 요청 URL입니다.
  fetchComedyMovies: "/discover/movie?with_genres=35",
  // 공포 장르의 영화를 가져오는 요청 URL입니다.
  fetchHorrorMovies: "/discover/movie?with_genres=27",
  // 로맨스 장르의 영화를 가져오는 요청 URL입니다.
  fetchRomanceMovies: "/discover/movie?with_genres=10749",
  // 다큐멘터리 장르의 영화를 가져오는 요청 URL입니다.
  fetchDocumentaries: "/discover/movie?with_genres=99",
};

export default requests;
