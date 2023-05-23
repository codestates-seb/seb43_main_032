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
      <div className="filter-box">
        {filterNames.map((name, idx) => (
          <div>
            <SubBtn
              className={idx === selected ? 'focus' : ''}
              key={name}
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
    </Box>
  );
};

export default CommunityCardBox;

const Box = styled.div`
  margin-bottom: 28px;

  .nanum-bold {
    display: flex;
    gap: 16px;
  }
  .focus {
    background: #6333ff;
  }
  .filter-box {
    display: flex;
    margin: 20px 0px;
    gap: 16px;
    font-size: 16px;
  }
  .community-box {
    display: grid;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
`;
