import { useIsBottomSheestContext } from '@/contexts/IsBottomSheetProvider';
import useGetPostId from '@/hooks/useGetPostId';
import useVoteQuery from '@/hooks/useVoteQuery';
import BottomSheet from '@components/common/BottomSheet';
import Comments from '@components/Vote/Comments';
import Contents from '@components/Vote/Contents';

const Vote = () => {
  const { postId } = useGetPostId();
  const { isBottomSheetOpen } = useIsBottomSheestContext();
  const { pollPost } = useVoteQuery(postId);

  return (
    <div>
      {/* 본문 */}
      <Contents postId={postId} />

      {/* 댓글 */}
      <Comments postId={postId} />
      {isBottomSheetOpen && (
        <BottomSheet
          id="voteEditable"
          isInProgress={pollPost?.status === 'IN_PROGRESS'}
          listArray={['글 수정', '글 삭제']}
        />
      )}
    </div>
  );
};

export default Vote;
