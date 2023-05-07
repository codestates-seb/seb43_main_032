import Card from '@/components/Card';
import Tag from '@/components/Tag';
import Bubble from '@/components/stack/Bubble';
import Stack from '@/components/stack/Stack';
import styled from 'styled-components';

const Project = () => {
  const tags = ['AI', '금융'];
  const select = ['recoil', 'java'];
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
              <div className="nanum-bold">제목</div>
              <div className="tag-box">
                <ul>
                  {tags.map((x, i) => (
                    <li key={`${x}+${i}`}>
                      <Tag>
                        <div>{x}</div>
                      </Tag>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="select-box">
                <ul>
                  {select.map((x) => (
                    <Stack skill={x} />
                  ))}
                </ul>
              </div>
              <div className="detail-box">
                <div>작성자</div>
                <div>뷰</div>
                <div>하트</div>
              </div>
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

    > div {
      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
    }

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

    .select-box {
      position: relative;
      cursor: pointer;
      li {
        box-shadow: var(--box-shadow);
      }
    }

    .detail-box {
      display: flex;
      gap: 16px;
    }
  }

  .common-box {
    .projects-box {
      margin: 24px 0px;
    }
  }
`;
