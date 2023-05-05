import { EX } from '@/constant/constant';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const ContentBox = () => {
  return (
    <div className="content-box nanum-regular">
      <SyntaxHighlighter style={docco} language={'ko'} children={EX} />
    </div>
  );
};

export default ContentBox;
