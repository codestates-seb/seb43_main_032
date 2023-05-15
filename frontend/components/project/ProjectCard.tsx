import { GrView } from 'react-icons/gr';
import Card from '../Card';
import { AiFillHeart } from 'react-icons/ai';
import Stack from '../stack/Stack';
import Tag from '../Tag';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Project } from '@/types/project';

type Props = {
  size: string;
  data: Project;
};

const ProjectCard = ({ data, size }: Props) => {
  const router = useRouter();

  //프로젝트 글 조회
  const viewProject = (id: number) => {
    router.push(`project/${id}`);
  };
  return (
    <Box>
      <Card
        onClick={() => viewProject(data.id)}
        width={size === 'lg' ? '416px' : '298px'}
      >
        <div className="img-box">
          <img
            src="https://d1.awsstatic.com/glbl-digital-partner-marketing-fy22/logo-lockups/AWS_Salesforce_Logo-Lockup.d9894485fb0816380c1952aea58cc679628ee35d.png"
            alt="thumbnail"
          />
        </div>
        <div className="nanum-bold title-box">{data.title}</div>
        <div className="tag-box">
          <ul>
            {size === 'lg' ? (
              data.tags.length > 6 ? (
                <>
                  {data.tags.slice(0, 6).map((tag, i) => (
                    <li key={`${tag}+${i}`}>
                      <Tag>
                        <div>{tag}</div>
                      </Tag>
                    </li>
                  ))}
                  .....
                </>
              ) : (
                data.tags.map((tag, i) => (
                  <li key={`${tag}+${i}`}>
                    <Tag>
                      <div>{tag}</div>
                    </Tag>
                  </li>
                ))
              )
            ) : data.tags.length > 4 ? (
              <>
                {data.tags.slice(0, 4).map((tag, i) => (
                  <li key={`${tag}+${i}`}>
                    <Tag>
                      <div>{tag}</div>
                    </Tag>
                  </li>
                ))}
                .....
              </>
            ) : (
              data.tags.map((tag, i) => (
                <li key={`${tag}+${i}`}>
                  <Tag>
                    <div>{tag}</div>
                  </Tag>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="select-box">
          <ul>
            {size === 'lg' ? (
              data.stacks.length > 11 ? (
                <>
                  {data.stacks.slice(0, 11).map((skill) => (
                    <Stack key={skill} skill={skill} />
                  ))}
                  .....
                </>
              ) : (
                data.stacks.map((skill) => <Stack key={skill} skill={skill} />)
              )
            ) : data.stacks.length > 7 ? (
              <>
                {data.stacks.slice(0, 7).map((skill) => (
                  <Stack key={skill} skill={skill} />
                ))}
                .....
              </>
            ) : (
              data.stacks.map((skill) => <Stack key={skill} skill={skill} />)
            )}
          </ul>
        </div>
        <div className="detail-box">
          <div>
            <img
              src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567008394/noticon/ohybolu4ensol1gzqas1.png"
              alt="author"
            />
            {data.author}
          </div>
          <div>
            <div className="infor-box">
              <span>
                <GrView />
              </span>
              <span>{data.view}</span>
            </div>
            <div className="infor-box">
              <span>
                <AiFillHeart />
              </span>
              <span>{data.heart}</span>
            </div>
          </div>
        </div>
      </Card>
    </Box>
  );
};

export default ProjectCard;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0px;

  @media (max-width: 960px) {
    margin: 2px 0px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .img-box {
    height: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: solid 1px #e4e4e4;
    @media (max-width: 960px) {
      display: none;
    }
    > img {
      width: 100%;
      height: 100%;
    }
  }

  .title-box {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px 13px;
    font-size: 16px;
    color: #3c3c3c;
    text-shadow: #e0e0e0 1px 1px 0;
  }

  .tag-box {
    padding: 10px 13px;
  }

  .select-box {
    position: relative;
    padding: 10px 13px;

    li {
      box-shadow: var(--box-shadow);
    }
  }

  .detail-box {
    display: flex;
    gap: 16px;
    justify-content: space-between;
    padding: 10px 13px;

    > div {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    > div:first-child {
      > img {
        width: 24px;
        height: 24px;
      }
    }

    .infor-box {
      display: flex;
      gap: 4px;
    }
  }
`;
