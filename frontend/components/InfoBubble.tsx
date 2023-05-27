import styled from 'styled-components';

type Props = {
  type: string;
};
const InfoBubble = ({ type }: Props) => {
  return (
    <Box type={type}>
      {type === 'rank' && (
        <>
          <div>랭킹 기준</div>
          <div className="standard-box">
            <div>
              <div>본인/답글 작성 (+1)</div>
              <div>본인/답글 삭제 (-1)</div>
              <div>본인/댓글 작성 (+1)</div>
              <div>본인/댓글 삭제 (-1)</div>
              <div>본인/커뮤니티 작성 (+3)</div>
              <div>본인/커뮤니티 삭제 (-3)</div>
              <div>본인/프로젝트 작성 (+3)</div>
              <div>본인/프로젝트 삭제 (-3)</div>
              <div>본인/지원자 수락 (+1)</div>
              <div>본인/프로젝트 지원 (+1)</div>
              <div>본인/프로젝트 지원 취소 (-1)</div>
              <div>본인/수락된 지원자가 취소 (-1)</div>
            </div>
            <div>
              <div>상대방/답글 좋아요 (+1)</div>
              <div>상대방/답글 좋아요 취소 (-1)</div>
              <div>상대방/댓글 좋아요 (+1)</div>
              <div>상대방/댓글 좋아요 취소 (-1)</div>
              <div>상대방/프로젝트 글 좋아요 (+1)</div>
              <div>상대방/프로젝트 글 좋아요 취소 (-1)</div>
              <div>상대방/커뮤니티 글 좋아요 (+1)</div>
              <div>상대방/커뮤니티 글 좋아요 취소 (-1)</div>
            </div>
          </div>
        </>
      )}
      {type === 'apply' && (
        <>
          <div>프로젝트에 지원하시면 작성자에게 알람 쪽지가 발송됩니다.</div>
          <div>작성자가 지원자를 수락하면 프로젝트에 합류할 수 있습니다.</div>
          <div>
            작성자가 수락 또는 거절하면 지원자에게 알람 쪽지가 발송됩니다.
          </div>
        </>
      )}
    </Box>
  );
};

export default InfoBubble;

const Box = styled.div<Props>`
  white-space: nowrap;
  position: absolute;
  padding: 8px;
  font-size: 10px;
  background: #9b7aff;
  color: #fff;
  border-radius: 0.4em;
  z-index: 2;
  top: ${(props) => (props.type === 'rank' ? '-950%' : '-450%')};
  display: flex;
  flex-direction: column;
  gap: 8px;

  .standard-box {
    display: flex;
    > div {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  }
`;
