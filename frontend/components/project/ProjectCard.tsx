import { GrView } from 'react-icons/gr';
import Card from '../Card';
import { AiFillHeart } from 'react-icons/ai';
import Stack from '../stack/Stack';
import Tag from '../Tag';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Project } from '@/types/project';
import { FaComment } from 'react-icons/fa';
import { useProject } from '@/hooks/react-query/project/useProject';
import { useState } from 'react';
import { getCookie } from '@/util/cookie';

type Props = {
  size: string;
  data: Project;
};

const ProjectCard = ({ data, size }: Props) => {
  const router = useRouter();
  const [heart, setHeart] = useState(data.liked);
  const heartHandler = (isLiked: boolean) => {
    setHeart(isLiked);
  };
  const [heartCount, setHeartCount] = useState(data.totalLikes);
  const heartCountHandler = (totalCount: number) => {
    setHeartCount(totalCount);
  };
  const { likeProject, dislikeProject } = useProject(
    heartHandler,
    heartCountHandler
  );
  const likeHandler = () => {
    if (!getCookie('accessToken')) {
      return alert('로그인을 부탁드려요.');
    }
    if (heart) {
      setHeart(false);
      return dislikeProject.mutate(data.projectId);
    }
    setHeart(true);
    likeProject.mutate(data.projectId);
  };

  //프로젝트 조회 이동
  const viewProject = (id: number) => {
    router.push(`project/${id}`);
  };

  return (
    <Box>
      <Card
        onClick={() => viewProject(data.projectId)}
        width={size === 'lg' ? '416px' : '298px'}
      >
        <div className="info-heart">
          <span>
            <AiFillHeart
              size={30}
              fill={heart ? 'red' : 'rgba(106, 106, 106, 0.5)'}
              onClick={(e) => {
                e.stopPropagation();
                likeHandler();
              }}
            />
          </span>
        </div>
        <div className="img-box">
          <div>
            <img
              src={data.thumbnailImageUrl}
              alt="thumbnail"
              className="thumbnail-image"
            />
          </div>
        </div>
        <strong className="nanum-bold title-box">{data.title}</strong>
        <div className="tag-box">
          <ul>
            {data.fieldList.map((tag, i) => (
              <li key={`${tag.field}+${i}`}>
                <Tag>
                  <div>{tag.field}</div>
                </Tag>
              </li>
            ))}
          </ul>
        </div>
        <div className="select-box">
          <ul>
            {data.techList.map((tech) => (
              <Stack key={tech.tech} tech={tech.tech} />
            ))}
          </ul>
        </div>
        <div className="detail-box">
          <div>
            <div className="infor-box">
              <span>
                <AiFillHeart fill="red" />
              </span>
              <span>{heartCount}</span>
            </div>
            <div className="infor-box">
              <span>
                <GrView />
              </span>
              <span>{data.views}</span>
            </div>
            <div className="infor-box">
              <span>
                <FaComment color="#909090" />
              </span>
              <span>{data.totalAnswers}</span>
            </div>
          </div>
        </div>
      </Card>
    </Box>
  );
};

export default ProjectCard;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0px;
  transition: transform 0.2s ease-in-out, background 1s ease-in-out;

  &:hover {
    transform: translateY(-20px);
    background-color: white;
  }

  @media (max-width: 960px) {
    margin: 2px 0px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .img-box {
    padding: 5px;
    height: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    @media (max-width: 960px) {
      display: none;
    }
    > div {
      border: solid 2px #f6f6f6;
      border-radius: 15px 15px 0px 0px;
      overflow: hidden;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
  }

  .info-heart {
    position: absolute;
    top: 130px;
    right: 15px;
    cursor: pointer;
    @media (max-width: 960px) {
      top: 112px;
    }
  }

  .title-box {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px 13px 5px;
    font-size: 16px;
    color: #3c3c3c;
    font-weight: 400;
    min-height: 31px;
  }

  .tag-box {
    padding: 5px 13px;
    ul {
      height: 22px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      li {
        display: inline;
      }
    }
  }

  .select-box {
    position: relative;
    padding: 5px 13px 10px;
    margin-bottom: 8px;
    min-height: 39px;
    ul {
      height: 24px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      li {
        box-shadow: var(--box-shadow);
      }
    }
  }

  .detail-box {
    display: flex;
    gap: 16px;
    justify-content: space-between;
    align-items: center;
    padding: 7px 13px;
    border-top: solid 1px #ebebeb;

    > div {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    img {
      width: 24px;
      height: 24px;
    }

    .infor-box {
      display: flex;
      gap: 4px;
      > span {
        font-size: 12px;
      }
    }
  }

  .author {
    border-radius: 50%;
  }
`;
