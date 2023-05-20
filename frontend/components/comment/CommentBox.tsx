import {
  Comment,
  DeleteCommentMutation,
  EditCommentMutation,
} from '@/types/comment';
import styled from 'styled-components';
import CommentItem from './CommentItem';

type Props = {
  commentData: Comment[];
  editComment: EditCommentMutation;
  deleteComment: DeleteCommentMutation;
};

const CommentBox = ({ commentData, editComment, deleteComment }: Props) => {
  return (
    <Box>
      {commentData.map((comment) => (
        <CommentItem
          editComment={editComment}
          deleteComment={deleteComment}
          key={comment.commentId}
          comment={comment}
        />
      ))}
    </Box>
  );
};

export default CommentBox;

const Box = styled.div`
  display: flex;
  flex-direction: column;

  .comment {
    display: flex;
    margin: 16px 0px;
    gap: 8px;

    .left {
      width: 24px;
      height: 24px;
      > img {
        width: 100%;
        height: 100%;
      }
    }

    .id-box {
      display: flex;
      gap: 8px;
    }

    .like-box {
      display: flex;
      gap: 16px;
    }
  }
`;
