import SimpleMDEEditor from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import 'github-markdown-css';
import hljs from 'highlight.js';
import 'highlight.js/styles/stackoverflow-light.css';
import styled from 'styled-components';

type Props = {
  changeEditor: (value: any) => void;
};

const OPTIONS: EasyMDE.Options = {
  renderingConfig: {
    codeSyntaxHighlighting: true,
    hljs,
  },
  spellChecker: false,
  previewClass: ['markdown-body'],
  hideIcons: ['guide'],
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
