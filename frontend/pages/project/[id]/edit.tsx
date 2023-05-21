import ProjectForm from '@/components/project/ProjectForm';
import { getCookie } from '@/util/cookie';
import { useRouter } from 'next/router';

const EditProject = () => {
  const router = useRouter();
  if (!getCookie('accessToken')) {
    alert('로그인을 부탁드려요.');
    router.push('/404');
  }
  return <ProjectForm />;
};

export default EditProject;
