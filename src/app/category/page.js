"use client";

import Link from "next/link";
import styled from "styled-components";

export default function Category() {
  return (
    <CategoryContainer>
      <h2>카테고리 페이지 입니다.</h2>
      <div className="list">
        <Link href="/category/한식">한식</Link>
        <Link href="/category/양식">양식</Link>
        <Link href="/category/일식">일식</Link>
        <Link href="/category/중식">중식</Link>
      </div>
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  padding-top: 60px;
  background-color: white;
  height: 100%;
  h2 {
    margin-bottom: 50px;
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
`;
