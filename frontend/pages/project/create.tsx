import { errorAlert } from '@/components/alert/Alert';
import ProjectForm from '@/components/project/ProjectForm';
import { getCookie } from '@/util/cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CreateProject = () => {
  const router = useRouter();
  useEffect(() => {
    if (!getCookie('accessToken')) {
      router
        .push('/404')
        .then(() => errorAlert('로그인을 부탁드려요.', '로그인'));
    }
  }, []);
  return <ProjectForm />;
};

export default CreateProject;
