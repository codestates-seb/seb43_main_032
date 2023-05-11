import React from 'react';
import styled from 'styled-components';
import Tag from '../Tag';
import Link from 'next/link';
import { FaComment, FaEye, FaHeart, FaStar } from 'react-icons/fa';
import { Community } from '@/types/community';

// item 리스트의 개별 아이템들
export default function ContentItem(article: Community) {
  const getBarColor = () => {
    switch (article.category) {
      case 'frontend':
        return '#2af599';
      case 'backend':
        return '#F98BFE';
      case 'uxui':
        return '#4512EB';
      default:
        return '#2af599';
    }
  };

  // 컴포넌트 좌우 꼬임
  return (
    <Container>
      <div
        className="color-bar"
        style={{ backgroundColor: getBarColor() }}
      ></div>
      <Right>
        {/* memberID에서 이메일 받아와야함 or nickName */}
        <img src={article.avatar}></img>
        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#6e6e6e' }}>
          {article.email.split('@')[0]}
        </div>
        <div>
          <FaStar color="#FF9900"></FaStar> {article.userStar}
        </div>
      </Right>
      <Link
        href={`community/post/${article.id}`}
        style={{ display: 'flex' }}
        prefetch={false}
      >
        <Center>
          <Top>
            <div
              className="title nanum-semi-bold"
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#414141',
                marginBottom: '16px',
              }}
            >
              {article.title}
            </div>
            <div className="content">{article.content}</div>
          </Top>
          <div className="tagBox">
            {/* {article.tags.map((tag) => (
              <Tag key={tag} style={{ background: '#909090' }}>
                {tag}
              </Tag>
            ))} */}
            <Tag>{article.tags}</Tag>
          </div>
        </Center>
      </Link>
      <Left>
        <div
          className="heartBox"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <FaHeart color="red" style={{ marginRight: '8px' }}></FaHeart>
          <span
            style={{ fontSize: '14px', fontWeight: 'bold', color: '#5b5b5b' }}
          >
            {article.heart}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaEye color="#909090" style={{ marginRight: '8px' }}></FaEye>
          <span
            style={{ fontSize: '14px', fontWeight: 'bold', color: '#5b5b5b' }}
          >
            {article.view}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaComment color="#909090" style={{ marginRight: '8px' }}></FaComment>
          <span
            style={{ fontSize: '14px', fontWeight: 'bold', color: '#5b5b5b' }}
          >
            {article.view}
          </span>
        </div>
      </Left>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  font-size: 15px;
  margin-bottom: 20px;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 6px 6px 15px #efefef, -6px -6px 15px #f5f5f5;
  position: relative;
  overflow: hidden;

  > .color-bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background-color: #2af599;
  }

  > a {
    width: 65%;
  }

  > &:hover {
    transform: scale(1.2);
  }
`;

const Left = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;

  > div {
    text-align: right;
    padding: 5px;
  }

  > .heartBox {
    vertical-align: top;
  }
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  padding-left: 20px;

  > .tagBox {
    font-size: 12px;
    display: flex !important;
    flex-direction: row !important;
    gap: 8px;
    color: white;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;

  > .title {
    color: var(--sub-font-dark-gray);
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 5px;
    margin-right: 20px;
    font-weight: bold;
  }

  > .content {
    font-size: 14px;
    color: #545454;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

const Right = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  > div {
    vertical-align: baseline;
  }

  > img {
    border-radius: 50%;
    border: solid 1px gray;
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;
