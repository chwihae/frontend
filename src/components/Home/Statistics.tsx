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
  const STATICS_ICON = [
    { type: 'view', text: viewCount, icon: <IConViewCountGray /> },
    { type: 'comment', text: commentCount, icon: <IConCommentGray /> },
    { type: 'bookmark', text: bookmarkCount, icon: <IConBookmarkGray /> },
  ];

  return (
    <ul className="flex gap-2 text-GS4  notosans-medium12">
      {STATICS_ICON.map((value) => (
        <li key={value.type} className="flex items-center gap-[2px]">
          {value.icon}
          <span>{value.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default Statistics;
