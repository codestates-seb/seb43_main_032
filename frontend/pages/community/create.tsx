import GridBox from '@/components/GridBox';
import CommunityForm from '@/components/community/CommunityForm';
import SideBar from '@/components/community/SideBar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

const CreateCommunity = () => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({
      top: 600,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);
  return (
    <Container>
      <SideBar />
      <CommunityForm />
    </Container>
  );
};

export default CreateCommunity;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
