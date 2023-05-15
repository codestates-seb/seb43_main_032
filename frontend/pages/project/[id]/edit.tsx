import ProjectForm from '@/components/project/ProjectForm';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const EditProject = () => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({
      top: 600,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);
  return <ProjectForm />;
};

export default EditProject;
