import ProjectForm from '@/components/project/ProjectForm';
import { getCookie } from '@/util/cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CreateProject = () => {
  const router = useRouter();
  // if (!getCookie('accessToken')) {
  //   router.push('/users/login').then(() => {
  //     alert('로그인을 해주세요.');
  //   });
  // }
  useEffect(() => {
    window.scrollTo({
      top: 600,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);
  return <ProjectForm />;
};

export default CreateProject;
