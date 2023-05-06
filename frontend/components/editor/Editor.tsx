import SimpleMDEEditor from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import 'github-markdown-css';
import hljs from 'highlight.js';
import 'highlight.js/styles/stackoverflow-light.css';
import styled from 'styled-components';

type Props = {
  changeEditor: (value: string) => void;
};

const OPTIONS: EasyMDE.Options = {
  renderingConfig: {
    codeSyntaxHighlighting: true,
    hljs,
  }, //hljs 사용
  spellChecker: false, //스펠체크 off
  status: false, //우측 하단 상태
  maxHeight: '400px', //최대높이 설정
  previewClass: ['markdown-body'], //github 마크다운 사용
  hideIcons: ['guide'], //guide 버튼 가리기
};
const EditorBox = ({ changeEditor }: Props) => {
  return (
    <Box>
      <SimpleMDEEditor
        placeholder="내용을 등록해주세요."
        onChange={changeEditor}
        options={OPTIONS}
      />
    </Box>
  );
};

export default EditorBox;

const Box = styled.div`
  span {
    background: none !important;
  }
  .markdown-body {
    padding: 40px 140px;
  }
`;
