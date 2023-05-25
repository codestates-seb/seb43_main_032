import SimpleMDEEditor from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import 'github-markdown-css';
import hljs from 'highlight.js';
import 'highlight.js/styles/stackoverflow-light.css';
import styled from 'styled-components';

type Props = {
  changeContent: (value: string) => void;
  content?: string;
  type?: string;
  commentOptions?: EasyMDE.Options;
};

const DEFAULT_OPTIONS: EasyMDE.Options = {
  renderingConfig: {
    codeSyntaxHighlighting: true,
    hljs,
  }, //hljs 사용
  maxHeight: '400px',
  spellChecker: false, //스펠체크 off
  status: false, //우측 하단 상태
  previewClass: ['markdown-body'], //github 마크다운 사용
  hideIcons: ['guide', 'fullscreen', 'side-by-side'], //버튼 가리기
};

const EditorBox = ({ commentOptions, changeContent, content, type }: Props) => {
  return (
    <Box>
      <SimpleMDEEditor
        placeholder={
          type === 'answer' ? '답글을 등록해주세요.' : '내용을 등록해주세요.'
        }
        onChange={changeContent}
        options={commentOptions ? commentOptions : DEFAULT_OPTIONS}
        value={content}
      />
    </Box>
  );
};

export default EditorBox;

const Box = styled.div`
  width: 100%;
  max-width: 948px;

  span {
    background: none !important;
  }
  .markdown-body {
    padding: 12px;
  }
`;
