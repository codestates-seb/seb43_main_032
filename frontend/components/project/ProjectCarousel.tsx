import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProjectCard from './ProjectCard';
import { Project } from '@/types/project';

type Props = {
  projects: Project[];
};

const ProjectCarousel = ({ projects }: Props) => {
  //캐러셀 옵션
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Slider {...settings}>
      {projects.map((project) => (
        <ProjectCard key={project.projectId} size={'lg'} data={project} />
      ))}
    </Slider>
  );
};
export default ProjectCarousel;
