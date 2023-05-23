import styled from 'styled-components';
import { ReactNode } from 'react';
import { Community } from '@/types/community';
import ContentItem from '../community/ContentItem';
import SubBtn from '../button/SubBtn';

type Props = {
  data: Community[] | undefined;
  skeleton?: ReactNode;
  filterHandler: (idx: number) => void;
  selected: number;
};

const CommunityCardBox = ({
  selected,
  filterHandler,
  data,
  skeleton,
}: Props) => {
  const filterNames = ['조회 순', '하트 순'];
  return (
    <Box>
      <div className="nanum-bold">커뮤니티</div>
      <div className="bottom">
        <div className="filter-box">
          {filterNames.map((name, idx) => (
            <div key={name}>
              <SubBtn
                className={idx === selected ? 'focus' : ''}
                onClick={() => filterHandler(idx)}
              >
                {name}
              </SubBtn>
            </div>
          ))}
        </div>
        <div className="community-box">
          {data?.map((article: Community) => (
            <ContentItem {...article} key={article.articleId} />
          ))}
        </div>
        {skeleton}
      </div>
    </Box>
  );
};

export default CommunityCardBox;

const Box = styled.div`
  margin-bottom: 28px;
  border-radius: 10px;

  .nanum-bold {
    display: flex;
    gap: 16px;
    color: #000000;
    margin-bottom: 20px;
  }
  .bottom {
    background-image: linear-gradient(135deg, #ce9ffc 10%, #7367f0 100%);
    padding: 10px 20px 30px;
    border-radius: 10px;
  }
  .focus {
    background: #6333ff;
  }
  .filter-box {
    display: flex;
    margin: 20px 0px;
    gap: 8px;
    font-size: 16px;
    padding: 0 20px;
  }
  .community-box {
    display: grid;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 0 20px;
    > div {
      //컨텐츠 아이템 박스 섀도우
      box-shadow: none;
    }
  }
`;
