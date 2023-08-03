//npm i axios
// axios 라이브러리 설치 및 import
import axios from "axios";

// axios.create 메소드 사용: 새 axios 인스턴스를 생성
// axios 인스턴스 : 기본 URL, 이 URL은 모든 요청에 사용
const instane = axios.create({
  baseURL: "https://api.themoviedb.org/3", // 모든 요청의 기본 URL
  // 인스턴스에서 api_key & 언어 설정이 포함된 기본 파라미터를 가짐.
  params: {
    api_key: process.env.React_APP_MOVIE_DB_API_KEY, // 환경 변수에 저장된 API 키
    language: "ko-KR", // 응답 데이터의 언어를 한국어로 설정
  },
});

export default instane;
