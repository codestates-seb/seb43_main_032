import styled from 'styled-components';

const Project = () => {
  return (
    <Box>
      <div className="special-box">
        <div>
          <div className="nanum-bold">신규 프로젝트</div>
          <div className="card-box">zz</div>
        </div>
        <div>
          <div className="nanum-bold">인기 프로젝트</div>
          <div className="card-box">zzz</div>
        </div>
      </div>
      <div className="common-box">
        <div className="nanum-bold">전체 프로젝트</div>
        <div className="projects-box">플젝들</div>
      </div>
    </Box>
  );
};

export default Project;

const Box = styled.div`
  .special-box {
    width: 100%;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 6fr 6fr;

    .card-box {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 24px 0px;
    }
  }

  .common-box {
    .projects-box {
      margin: 24px 0px;
    }
  }
`;
