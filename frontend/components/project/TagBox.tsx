import { GrFormClose } from 'react-icons/gr';
import Tag from '../Tag';
import { DefaultObj } from '@/types/types';
import { UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';

type Props = {
  tags: string[];
  register?: UseFormRegister<DefaultObj>;
  tagKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  deleteTag?: (idx: number) => void;
};

const TagBox = ({ tags, register, tagKeyDown, deleteTag }: Props) => {
  return (
    <Box className="tag-box">
      <div>프로젝트 분야 태그</div>
      <div className="noto-regular-13">
        {register && (
          <div className="button-box">
            <input {...register('tagVal')} onKeyDown={tagKeyDown} type="text" />
          </div>
        )}
        <ul>
          {tags.map((x, i) => (
            <li key={`${x}+${i}`}>
              <Tag>
                <div>{x}</div>
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

const Box = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  ul {
    justify-content: center;
    gap: 4px;
    flex-direction: row;
    li {
      > div {
        display: flex;
        gap: 4px;
        min-width: auto;
        > div:last-child {
          cursor: pointer;
        }
      }
    }
  }

  .button-box {
    margin-bottom: 12px;
  }
`;
