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
import { title } from 'process';

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
  data: Project[];
};

const Box = styled.div<BoxProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0px;

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

  // useQuery를 사용하여 데이터 fetch
  const { data } = useQuery<Project[]>('projects', () =>
    api('/project?size=4&page=1').then((res) => res.data)
  );
  console.log(data);

  // 만약 데이터가 없다면 아무것도 반환하지 않음
  if (!data) return;

  return (
    <>
      <Box size={'sm'}>
        <div className="title-box">
          <h2 className="nanum-bold">주목할만한 프로젝트🔥</h2>
        </div>
      </Box>
    </>
  );
};

export default Home;



