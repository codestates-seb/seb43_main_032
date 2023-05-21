import ProjectForm from '@/components/project/ProjectForm';
import { getCookie } from '@/util/cookie';
import { useRouter } from 'next/router';

const CreateProject = () => {
  const router = useRouter();
  // if (!getCookie('accessToken')) {
  //   router.push('/404')
  // }
  return <ProjectForm />;
};

export default CreateProject;
