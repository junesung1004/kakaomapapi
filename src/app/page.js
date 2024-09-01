"use client";

import Image from "next/image";
import styles from "./page.module.css";
import styled from "styled-components";
import Link from "next/link";

/*
image 넣는 방법

Image 컴포넌트
이미지의 로딩을 자동으로 최적화시키며, 필요에 따라 이미지의 크기를 조정해준다.
효율적으로 이미지 포맷으로 자동 변환하는 기능을 제공한다.
*/

/*
npm install styled-components

npm install --save-dev babel-plugin-styled-components // 타입스크립트 사용할 경우
*/

const Item = "/icon.png";

export default function Home() {
  return (
    <HomeContainer>
      <Image src={Item} width={360} height={500} alt="임시 이미지" priority />
      <Link href={"/category"}>시작하기</Link>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  width: 100%;
  max-width: 360px;
  height: 100%;
  background-color: white; /* 컨테이너 배경색 */
  padding-top: 50px;
`;
