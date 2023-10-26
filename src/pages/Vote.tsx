import useGetPostId from '@/hooks/useGetPostId';
import Comments from '@components/Vote/Comments';
import Contents from '@components/Vote/Contents';

const Vote = () => {
  const { postId } = useGetPostId();

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
