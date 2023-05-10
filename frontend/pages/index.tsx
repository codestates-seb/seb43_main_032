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
import ProjectCardbox from '@/components/project/ProjectCardbox';

// const Banner = styled.div`
//   width: 100%;
//   height: 600px;
//   background-color: #dcdcdc;
// `;

type Props = {
  size: string;
  data: Project[];
};

const Box = styled.div`
  width: 100%;
  padding: var(--padding-2);
`;

const Home = () => {
  const router = useRouter();

  // useQuery를 사용하여 데이터 fetch
  const { data } = useQuery<{ data: Project[]; total: number }>(
    'projects',
    () => api('/project?size=4&page=1').then((res) => res.data)
  );
  console.log(data);

  // 만약 데이터가 없다면 아무것도 반환하지 않음
  if (!data) return;

  return (
    <Box>
      <ProjectCardbox data={data.data} title={'주목할만한 프로젝트'} />
    </Box>
  );
};

export default Home;
