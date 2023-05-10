//홈 페이지 입니다. 경로 '/'
import Card from '@/components/Card';
import { Project } from '@/types/types';
import { useState } from 'react';
import styled from 'styled-components';
import { GrView } from 'react-icons/gr';
import Tag from '@/components/Tag';
import Stack from '@/components/stack/Stack';
import { AiFillHeart } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { api } from '@/util/api';
import { LayoutGroup } from 'framer-motion';
import { useRouter } from 'next/router';
import ProjectCard from '@/components/project/ProjectCard';
import project from './project';

// const Banner = styled.div`
//   width: 100%;
//   height: 600px;
//   background-color: #dcdcdc;
// `;

type BoxProps = {
  size: string;
};

type Props = {
  size: string;
  data: Project;
};

const Box = styled.div<BoxProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0px;

  .title {
  }

  .img-box {
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      width: 100%;
      height: 100%;
      border: 1px solid #e4e4e4;
    }

    .title-box {
      width: 256px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  height: 628px;
  background-color: #dcdcdc;
`;

const Home = () => {
  const router = useRouter();

  //데이터 fetch
  const { data, isFetching } = useQuery<Project[]>('projects', () =>
    api(`/project?size=${468}`).then((res) => res.data)
  );
  // console.log(data);

  if (!data) return;

  return (
    <>
      <Box size="">
        <div className="title">
          <h2>주목할만한 프로젝트🔥</h2>
        </div>
        <div className="common-box">
          {/* <div className="projects-box">
            <ProjectCard key={project.id} size={'sm'} data={project} />
          </div> */}
        </div>
      </Box>
    </>
  );
};

export default Home;



