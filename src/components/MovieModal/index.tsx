import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import './MovieModal.css'

// 영화 정보를 보여주는 모달 컴포넌트

// movieModal에 전달되는 props 타입 정의
type MovieModalProps = {
  backdrop_path: string; // 영화의 포스터 이미지 경로
  title?: string; // 영화의 제목 (옵시널)
  overview: string; // 영화의 개요
  name?: string; // 영화의 이름 (옵시널)
  release_date?: string; // 영화의 개봉 날짜 (옵시널)
  first_air_date?: string; // TV 쇼의 첫 방송 날짜
  vote_average: number; // 영화의 평점
  setModalOpen: (open: boolean) => void; // 모달의 상태를 설정하는 함수
};

const MovieModal: React.FC<MovieModalProps> = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) => {
  // useRef 훅: modal요소에 접근하기 위한 참조를 생성
  const ref = useRef<HTMLDivElement>(null);

  // useOnClickOutside 훅 : 사용자가 모달 외부를 클릭하면 모달을 받도록 설정
  useOnClickOutside(ref, () => setModalOpen(false));
  return (
    <div className="presentation">
      <div className="wrapper-modal">
        {/* ref를 사용하여 참조할 수 있는 DOM요소를 지정 */}
        <div className="modal" ref={ref}>
          {/* 모달 닫기 버튼, 클릭 시 setModalOpen 함수를 호출 */}
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>
          {/* 영화의 포스터 이미지 */}
          <img
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal__poster-img"
          />
          <div className="modal__content">
            {/* 영화의 세부 정보 */}
            <p className="modal__details">
              <span className="modal__user_perc">100% for you</span>
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점 : {vote_average}</p>
            <p className="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
