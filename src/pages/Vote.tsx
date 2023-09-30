import { useParams } from 'react-router-dom';

import Comments from '@components/Vote/Comments';
import Contents from '@components/Vote/Contents';

const Vote = () => {
  // 투표글 아이디
  const params = useParams();
  const postId = Number(params.id);

  return (
    <div>
      {/* 본문 */}
      <Contents postId={postId} />

      {/* 댓글 */}
      <Comments postId={postId} />
    </div>
  );
};

export default Vote;
