export interface IResponse<T> {
  code: number;
  message?: string;
  data: T;
}

export interface IId {
  id: number;
}

// 질문 리스트 조회
export interface IVoteAllReq {
  type?: string;
  status?: string;
  page: number;
  size: number;
}

interface IVoteAllContent extends IId {
  title: string;
  type: string;
  status: string;
  viewCount: number;
  commentCount: number;
  bookmarkCount: number;
}

interface IVoteAllPageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface IVoteAllRes {
  content: IVoteAllContent[];
  pageable: IVoteAllPageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

// 질문 단건 조회
export interface IVoteSingleRes extends IVoteAllContent {
  content: string;
  closeAt: string;
  voteCount: number;
  bookmarked: boolean;
  editableL: boolean;
}

// 질문 옵션 조회
interface Option {
  id: number;
  name: string;
  voteCount: number;
}

export interface IVoteOptionsRes {
  votedOptionId: number;
  showVoteCount: boolean;
  options: Option[];
}
