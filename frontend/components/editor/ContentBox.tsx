import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';

type Props = {
  content: string;
  backColor?: string;
};

type BoxProps = {
  backColor?: string;
};

const ContentBox = ({ content, backColor }: Props) => {
  return (
    <Box className="markdown-body" backColor={backColor}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
  );
};

export default ContentBox;

const Box = styled.div<BoxProps>`
  width: 100%;
  min-height: 70vh;
  align-items: start !important;
  flex-direction: column;
  padding: var(--padding-2);
  border: 1px solid #d8d8d8;
  border-radius: var(--radius-def);
  background-color: ${(props) => props.backColor};
  position: relative;
`;
