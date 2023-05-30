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
import { useEffect, useState } from 'react';
import { getCookie } from '@/util/cookie';
import { errorAlert } from '../alert/Alert';
import { postStar } from '@/util/api/postStar';
import { useRecoilState } from 'recoil';
import { propjectSearchState, viewMemberIdState } from '@/recoil/atom';

type Props = {
  size: string;
  data: Project;
};

const ProjectCard = ({ data, size }: Props) => {
  const router = useRouter();
  const [, setProjectSearch] = useRecoilState(propjectSearchState);
  const [, setViewMemberId] = useRecoilState(viewMemberIdState);
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
  const likeHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (!getCookie('accessToken')) {
      return errorAlert('로그인을 부탁드려요.', '로그인');
    }
    if (heart) {
      setHeart(false);
      postStar(data.memberInfo.memberId, -1);
      return dislikeProject.mutate(data.projectId);
    }
    setHeart(true);
    postStar(data.memberInfo.memberId, 1);
    likeProject.mutate(data.projectId);
  };

  //프로젝트 조회 이동
  const viewProject = (id: number) => {
    setViewMemberId(Number(data.memberInfo.memberId));
    router.push(`project/${id}`);
  };

  const projectTagHandler = (
    e: { stopPropagation: () => void },
    val: string
  ) => {
    e.stopPropagation();
    router.push('/project').then(() =>
      setTimeout(() => {
        window.scrollTo({
          top: 1000,
          left: 0,
        });
        setProjectSearch(val);
      }, 30)
    );
  };

  const [sizeState, setSizeState] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSizeState(true);
      } else {
        setSizeState(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Box disableTransform={router.pathname === '/project'}>
      <Card
        onClick={() => viewProject(data.projectId)}
        width={size === 'lg' ? '416px' : '298px'}
      >
        <div className="info-heart">
          <span>
            <AiFillHeart
              size={sizeState ? 24 : 30}
              fill={heart ? 'red' : 'rgba(106, 106, 106, 0.5)'}
              onClick={likeHandler}
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
                <Tag onClick={(e) => projectTagHandler(e, tag.field)}>
                  <div>{tag.field}</div>
                </Tag>
              </li>
            ))}
          </ul>
        </div>
        <div className="select-box">
          <ul>
            {data.techList.map((tech) => (
              <Stack
                bubbleTop="-60%"
                position="static"
                key={tech.tech}
                tech={tech.tech}
              />
            ))}
          </ul>
        </div>
        <div className="detail-box">
          <div>
            <div className="infor-box">
              <span>
                <AiFillHeart fill="red" />
              </span>
              <span>{heartCount > 1000 ? '999+' : heartCount}</span>
            </div>
            <div className="infor-box">
              <span>
                <GrView />
              </span>
              <span>{data.views > 1000 ? '999+' : data.views}</span>
            </div>
            <div className="infor-box">
              <span>
                <FaComment color="#909090" />
              </span>
              <span>
                {data.totalAnswers > 1000 ? '999+' : data.totalAnswers}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Box>
  );
};

export default ProjectCard;

type CheckRoute = {
  disableTransform: boolean;
};

const Box = styled.div<CheckRoute>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: ${({ disableTransform }) => (disableTransform ? 'none' : 'translateY(-20px)')};
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
      top: 116px;
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
    min-height: 32px;
    ul {
      height: 22px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
