import styled from 'styled-components';

//프로젝트 글 작성 페이지 입니다. 경로 '/project/create/'
const CreateProject = () => {
  return (
    <Box>
      <Side>
        <div className="period-box">
          <div>
            <div>프로젝트 기간</div>
            <div className="calendar-box">달력</div>
          </div>
          <div className="noto-regular-13">23.04.27 ~ 23.10.27 (184일)</div>
        </div>
        <div className="tag-box">
          <div>프로젝트 분야 태그</div>
          <ul className="noto-regular-13">
            <li>금융</li>
            <li>AI</li>
          </ul>
        </div>
        <div className="stack-box">
          <div>프로젝트 메인 스택</div>
          <ul className="noto-regular-13">
            <li>리액트</li>
            <li>js</li>
            <li>css</li>
            <li>html</li>
          </ul>
        </div>
        <div className="want-box">
          <div>모집을 원하는 직군</div>
          <ul className="noto-regular-13">
            <li>프론트</li>
            <li>백엔드</li>
            <li>디자이너</li>
            <li>기획자</li>
          </ul>
        </div>
      </Side>
      <Main>메인</Main>
    </Box>
  );
};

export default CreateProject;

const Box = styled.div`
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 12px;
  grid-template-columns: 3fr 9fr;
`;
const Side = styled.div`
  width: 100%;
  background-color: var(--bg-gray);
  padding: var(--padding);
  > div {
    margin-bottom: 32px;
    > div:first-child {
      font-family: var(--font-nanum);
      font-size: 23px;
      font-weight: 700;
      margin-bottom: 24px;
    }
  }

  .period-box {
    > div:first-child {
      display: flex;
    }
    .calendar-box {
      margin-left: 16px;
    }
  }

  .tag-box {
    > ul {
      display: flex;
    }
  }

  .stack-box {
    > ul {
      display: flex;
    }
  }

  .want-box {
    > ul {
      > li {
        margin-bottom: 24px;
      }
    }
  }
`;
const Main = styled.div`
  border: 1px solid black;
`;
