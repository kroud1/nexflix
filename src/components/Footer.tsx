import React from "react";
import { styled } from "styled-components";

export default function Footer() {
  return (
    <>
      <FooterContainer>
        <FooterContent>
          <FooterLinkContainer>
            <FooterLinkContent>넷플릭스 대한민국</FooterLinkContent>
            <FooterLink href="https://help.netflix.com/ko">넷플릭스 소개</FooterLink>
            <FooterLink href="https://help.netflix.com/ko">고객 센터</FooterLink>
            <FooterLink href="https://help.netflix.com/ko">미디어 센터</FooterLink>
            <FooterLink href="https://help.netflix.com/ko">이용 약관</FooterLink>
          </FooterLinkContainer>
          <FooterDescContainer>
            <FooterDescRights>
              Netflix Rights Reserved.
            </FooterDescRights>
          </FooterDescContainer>
        </FooterContent>
      </FooterContainer>
    </>
  );
}

// 스타일 컴포넌트 설치: npm i styled-components
// ! 푸터 전체 컨테이너에 대한 스타일 정의
const FooterContainer = styled.div`
  // 중앙 정렬
  display: flex;
  justify-content: center;
  align-items: center;

  // 패딩 설정
  padding: 40px 0;

  // 상단 테두리 설정
  border-top: 1px solid rgb(25, 25, 25);

  // 너비
  width: 100%;

  //z-index 설정
  position: relative;
  z-index: 100;
`;

// FooterContent 스타일 정의
const FooterContent = styled.div``;

// FooterLinkContainer 스타일 정의
const FooterLinkContainer = styled.div`
  width: 500px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// FooterLinkTitle 스타일 정의
const FooterLinkTitle = styled.div`
  color: gray;
  font-size: 17px;
`;

// FooterLinkContent 스타일 정의
const FooterLinkContent = styled.div`
  display: flex;
  justify-content: space-bewteen;
  flex-wrap: wrap;
  margin-top: 35px;

  @media (max-width: 768px) {
    margin-top: 26px;
  }
`;

// FooterLink 스타일 정의
const FooterLink = styled.a`
  color: gray;
  font-size: 14px;
  width: 110px;
  margin-bottom: 21px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const FooterDescContainer = styled.div`
  margin-top: 30px @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const FooterDescRights = styled.h2`
  color: white;
  font-size: 14px;
  text-align: center;
`;
