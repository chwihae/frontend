import { ReactComponent as IConBookmarkGray } from '@/assets/icon_bookmarkCount_gray.svg';
import { ReactComponent as IConCommentGray } from '@/assets/icon_comment_gray.svg';
import { ReactComponent as IConViewCountGray } from '@/assets/icon_viewCount_gray.svg';

type TStatistics = {
  viewCount: number;
  commentCount: number;
  bookmarkCount: number;
};

const Statistics = ({
  viewCount,
  commentCount,
  bookmarkCount,
}: TStatistics) => {
  return (
    <ul className="notosansmedium12 flex gap-2  text-GS4">
      <li className="flex items-center gap-[2px]">
        <IConViewCountGray />
        <span>{viewCount}</span>
      </li>
      <li className="flex items-center gap-[2px]">
        <IConCommentGray />
        <span>{commentCount}</span>
      </li>
      <li className="flex items-center gap-[2px]">
        <IConBookmarkGray />
        <span>{bookmarkCount}</span>
      </li>
    </ul>
  );
};

export default Statistics;
