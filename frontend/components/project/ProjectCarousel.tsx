import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProjectCard from './ProjectCard';
import { Project } from '@/types/types';

type Props = {
  projects: Project[];
};

const ProjectCarousel = ({ projects }: Props) => {
  //캐러셀 옵션
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Slider {...settings}>
      {projects.map((project, i) => (
        <ProjectCard key={i} size={'lg'} data={project} />
      ))}
    </Slider>
  );
};
export default ProjectCarousel;
