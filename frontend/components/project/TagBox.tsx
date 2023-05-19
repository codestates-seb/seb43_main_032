import { GrFormClose } from 'react-icons/gr';
import Tag from '../Tag';
import { UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { Form } from '@/types/types';
import { FiledTag } from '@/types/project';

type Props = {
  tags: FiledTag[];
  register?: UseFormRegister<Form>;
  tagKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  deleteTag?: (idx: number) => void;
};

const TagBox = ({ tags, register, tagKeyDown, deleteTag }: Props) => {
  return (
    <Box deleteTag={deleteTag} className="tag-box">
      <div className="title" style={{ font: '15px' }}>
        프로젝트 분야 태그
      </div>
      <div className="noto-regular-13">
        {register && (
          <div className="button-box">
            <input
              {...register('tagVal')}
              onKeyDown={tagKeyDown}
              type="text"
              placeholder="태그를 입력해주세요."
            />
          </div>
        )}
        <ul>
          {tags.map((tag, i) => (
            <li key={`${tag.field}+${i}`}>
              <Tag>
                <div>{tag.field}</div>
                {deleteTag && (
                  <div>
                    <GrFormClose onClick={() => deleteTag(i)} />
                  </div>
                )}
              </Tag>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );
};

export default TagBox;

type BoxProps = {
  deleteTag?: (idx: number) => void;
};

const Box = styled.div<BoxProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 30px;

  input {
    width: 100%;
    padding: 10px;
    border: solid 2px #ececec;
    border-radius: 10px;
    color: #7d7d7d;

    :focus {
      background-color: white;
      outline: solid 2px #9b7aff;
    }

    ::placeholder {
      font-size: 13px;
      color: #a5a5a5;
    }
  }

  > .title {
    font-size: 15px;
    margin-bottom: 10px;
    font-weight: 500;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    li {
      > div {
        display: flex;
        gap: 4px;
        min-width: auto;
        > div:last-child {
          cursor: ${(props) => props.deleteTag && 'pointer'};
        }
      }
    }
  }

  .button-box {
    margin-bottom: 12px;
  }
`;
