import { useParams } from 'react-router-dom';

import { useIsBottomSheestContext } from '@/contexts/IsBottomSheetProvider';
import useVoteQuery from '@/hooks/useVoteQuery';
import BottomSheet from '@components/common/BottomSheet';
import Comments from '@components/Vote/Comments';
import Contents from '@components/Vote/Contents';

const Vote = () => {
  // 투표글 아이디
  const params = useParams();
  const postId = Number(params.id);
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
          isInProgress={pollPost?.status === 'IN_PROGRESS'}
          listArray={['글 수정', '글 삭제']}
        />
      )}
    </div>
  );
};

export default Vote;
