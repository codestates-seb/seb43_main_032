import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProjectCard from './project/ProjectCard';

type Props = {
  projects: number[];
};

const Carousel = ({ projects }: Props) => {
  const tags = ['AI', '금융'];
  const select = ['recoil', 'java'];
  const author = '김기획';
  const view = 555;
  const heart = 33;
  const title =
    '한국 투자 증권 api로 플젝 해보실분?!!?ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ';
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
      {projects.map((x, i) => (
        <ProjectCard
          key={i}
          size={'lg'}
          view={view}
          heart={heart}
          author={author}
          tags={tags}
          select={select}
          title={title}
        />
      ))}
    </Slider>
  );
};
export default Carousel;
