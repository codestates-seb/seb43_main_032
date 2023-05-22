import React from 'react';
import styled from 'styled-components';
import Tag from '../Tag';
import { FaComment, FaEye, FaHeart, FaStar } from 'react-icons/fa';
import { Community } from '@/types/community';
import { useRouter } from 'next/router';

export default function ContentItem(article: Community) {
  const router = useRouter();
  const moveArticle = () => {
    router.push(`community/post/${article.articleId}`);
  };

  return (
    <Container>
      <Right>
        <img src={article.memberInfo.profileImageUrl}></img>
        <div className="name-box">{article.memberInfo.name}</div>
        <div className="star-box">
          <FaStar color="#FF9900"></FaStar> {article.totalLikes}
        </div>
      </Right>
      <a onClick={moveArticle}>
        <Center>
          <Top>
            <div className="title nanum-semi-bold">{article.title}</div>
            <div className="content">{article.content}</div>
          </Top>
          <div className="tagBox">
            {article.techList.map((tag, i) => (
              <Tag key={`${i}+${tag.tech}`}>{tag.tech}</Tag>
            ))}
          </div>
        </Center>
      </a>
      <Left>
        <div className="heartBox">
          <FaHeart color="red"></FaHeart>
          <span>{article.totalLikes}</span>
        </div>
        <div>
          <FaEye color="#909090"></FaEye>
          <span>{article.view}</span>
        </div>
        <div>
          <FaComment color="#909090"></FaComment>
          <span>{article.totalAnswers}</span>
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
  cursor: pointer;

  > .name-box {
    font-size: 12px;
    font-weight: bold;
    color: #6e6e6e;
  }

  > .color-bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background-color: #2af599;
  }

  > .frontend {
    background-color: #2af599;
  }

  > .backend {
    background-color: #f98bfe;
  }

  > .uxui {
    background-color: #4512eb;
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

  svg {
    margin-right: 8px;
  }

  > div {
    text-align: right;
    padding: 5px;
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      font-weight: bold;
      color: #5b5b5b;
    }
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
    > div {
      background: #909090;
    }
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;

  > .title {
    color: #414141;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 16px;
    margin-right: 20px;
    font-weight: 600;
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
