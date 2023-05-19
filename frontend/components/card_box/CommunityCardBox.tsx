import styled from 'styled-components';
import { ReactNode } from 'react';
import { Community } from '@/types/community';
import ContentItem from '../community/ContentItem';

type Props = {
  data: Community[];
  title: string;
  skeleton?: ReactNode;
};

const CommunityCardBox = ({ title, data, skeleton }: Props) => {
  return (
    <Box>
      <div className="nanum-bold">
        <div>{title}</div>
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
    margin-bottom: 48px;
  }
  .community-box {
    display: grid;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
`;
