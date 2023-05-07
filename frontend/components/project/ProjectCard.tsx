import { GrView } from 'react-icons/gr';
import Card from '../Card';
import { AiFillHeart } from 'react-icons/ai';
import Stack from '../stack/Stack';
import Tag from '../Tag';
import styled from 'styled-components';

type Props = {
  tags: string[];
  select: string[];
  size: string;
  author: string;
  view: number;
  heart: number;
  title: string;
};

const ProjectCard = ({title, view, heart, author, size, tags, select }: Props) => {
  return (
    <Box size={size}>
      <Card width={size === 'lg' ? 416 : 298}>
        <div className="img-box">
          <img
            src="https://d1.awsstatic.com/glbl-digital-partner-marketing-fy22/logo-lockups/AWS_Salesforce_Logo-Lockup.d9894485fb0816380c1952aea58cc679628ee35d.png"
            alt="thumbnail"
          />
        </div>
        <div className="nanum-bold title-box">
          {title}
        </div>
        <div className="tag-box">
          <ul>
            {size === 'lg' ? (
              tags.length > 6 ? (
                <>
                  {tags.slice(0, 6).map((tag, i) => (
                    <li key={`${tag}+${i}`}>
                      <Tag>
                        <div>{tag}</div>
                      </Tag>
                    </li>
                  ))}
                  .....
                </>
              ) : (
                tags.map((tag, i) => (
                  <li key={`${tag}+${i}`}>
                    <Tag>
                      <div>{tag}</div>
                    </Tag>
                  </li>
                ))
              )
            ) : tags.length > 4 ? (
              <>
                {tags.slice(0, 4).map((tag, i) => (
                  <li key={`${tag}+${i}`}>
                    <Tag>
                      <div>{tag}</div>
                    </Tag>
                  </li>
                ))}
                .....
              </>
            ) : (
              tags.map((tag, i) => (
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
              select.length > 11 ? (
                <>
                  {select.slice(0, 11).map((skill) => (
                    <Stack skill={skill} />
                  ))}
                  .....
                </>
              ) : (
                select.map((skill) => <Stack skill={skill} />)
              )
            ) : select.length > 7 ? (
              <>
                {select.slice(0, 7).map((skill) => (
                  <Stack skill={skill} />
                ))}
                .....
              </>
            ) : (
              select.map((skill) => <Stack skill={skill} />)
            )}
          </ul>
        </div>
        <div className="detail-box">
          <div>
            <img
              src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567008394/noticon/ohybolu4ensol1gzqas1.png"
              alt="author"
            />
            {author}
          </div>
          <div>
            <div className="infor-box">
              <span>
                <GrView />
              </span>
              <span>{view}</span>
            </div>
            <div className="infor-box">
              <span>
                <AiFillHeart />
              </span>
              <span>{heart}</span>
            </div>
          </div>
        </div>
      </Card>
    </Box>
  );
};

export default ProjectCard;

type BoxProps = {
  size: string;
};

const Box = styled.div<BoxProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0px;

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

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

  .title-box {
    width: ${(props) => (props.size === 'lg' ? '374px' : '256px')};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .select-box {
    position: relative;
    li {
      box-shadow: var(--box-shadow);
    }
  }

  .detail-box {
    display: flex;
    gap: 16px;
    justify-content: space-between;

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
