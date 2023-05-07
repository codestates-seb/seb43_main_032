import Card from '@/components/Card';
import styled from 'styled-components';

const Project = () => {
  return (
    <Box>
      <div className="special-box">
        <div>
          <div className="nanum-bold">신규 프로젝트</div>
          <div className="card-box">
            <Card width={75}>
              <div className="img-box">
                <img
                  src="https://d1.awsstatic.com/glbl-digital-partner-marketing-fy22/logo-lockups/AWS_Salesforce_Logo-Lockup.d9894485fb0816380c1952aea58cc679628ee35d.png"
                  alt=""
                />
              </div>
              <div>제목</div>
              <div>작성자</div>
              <div>태그</div>
              <div>스택 모집정원</div>
              <div>view</div>
            </Card>
          </div>
        </div>
        <div>
          <div className="nanum-bold">인기 프로젝트</div>
          <div className="card-box">
            <Card width={75}>
              <div></div>
            </Card>
          </div>
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
  padding: var(--padding-1);
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
      .img-box {
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        > img {
          width: 100%;
          height: 100%;
          border: 1px solid #e4e4e4;
        }
      }
    }
  }

  .common-box {
    .projects-box {
      margin: 24px 0px;
    }
  }
`;
