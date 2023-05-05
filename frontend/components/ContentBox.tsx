import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';

type Props = {
  content: string;
};

const ContentBox = ({ content }: Props) => {
  return (
    <Box className="markdown-body">
      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
  );
};

export default ContentBox;

const Box = styled.div`
  width: 100%;
  min-height: 70vh;
  display: flex;
  align-items: start !important;
  flex-direction: column;
  padding: var(--padding-2);
  border: 1px solid #d8d8d8;
  border-radius: var(--radius-def);
`;
