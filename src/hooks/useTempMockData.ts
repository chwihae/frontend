import type { AxiosAdapter, InternalAxiosRequestConfig } from 'axios';

import { auth } from '@/apis/axios';
import { LEVELSTEP } from '@/constants/home';

/**
 * 서버 운영 종료로 인한 임시 목데이터 모드.
 * axios 인스턴스(auth)의 adapter 를 교체해 apis/* 의 요청을 localStorage 기반 목 서버가 처리한다.
 * 서버가 복구되면 이 훅을 호출하는 곳만 지우면 원래대로 동작한다.
 */

const DB_KEY = 'chwihae-mock-db';
const MOCK_DELAY = 200;
// 시드의 마감 시간이 지나 모든 글이 '해결완료'가 되지 않도록 하루가 지나면 다시 시드한다
const RESEED_INTERVAL = 24 * 60 * 60 * 1000;
const ME_ID = 1004;

const NOTICE_MESSAGE = '서버 종료로 목데이터로 동작하는 데모예요';
const LOGIN_PATH = '/login?code=mock-authorization-code';
const HOUR = 60;
const DAY = 24 * HOUR;

interface IMockOption {
  id: number;
  name: string;
  voteCount: number;
}

interface IMockQuestion {
  id: number;
  writerId: number;
  type: string;
  title: string;
  content: string;
  createdAt: string;
  closeAt: string;
  viewCount: number;
  bookmarkCount: number;
  options: IMockOption[];
}

interface IMockComment {
  id: number;
  questionId: number;
  writerId: number;
  content: string;
  createdAt: string;
}

interface IMockDB {
  seededAt: number;
  nextId: { question: number; option: number; comment: number };
  user: { voteCount: number; commentCount: number };
  questions: IMockQuestion[];
  comments: IMockComment[];
  // 질문 id -> 내가 투표한 옵션 id
  votes: Record<number, number>;
  bookmarks: number[];
}

interface IMockResult {
  code: number;
  message: string;
  data?: unknown;
}

type TSeedQuestion = {
  type: string;
  title: string;
  content: string;
  writerId: number;
  createdMinAgo: number;
  // 음수면 이미 마감된 글
  closeInMin: number;
  viewCount: number;
  bookmarkCount: number;
  options: [string, number][];
  comments?: [number, string][];
  myVoteIndex?: number;
  myBookmark?: boolean;
};

const SEED_QUESTIONS: TSeedQuestion[] = [
  {
    type: 'COMPANY',
    title: '최종합격 두 곳, 어디로 갈까요?',
    content:
      'A사는 연봉이 400 정도 더 높고, B사는 집에서 20분 거리예요.\n직무는 둘 다 프론트엔드로 같고 규모도 비슷해요. 첫 회사라 더 고민되네요.',
    writerId: ME_ID,
    createdMinAgo: 5 * HOUR,
    closeInMin: 3 * DAY - 5 * HOUR,
    viewCount: 87,
    bookmarkCount: 6,
    options: [
      ['연봉 높은 A사', 14],
      ['출퇴근 편한 B사', 11],
    ],
    comments: [
      [37, '첫 회사면 연봉이 이후 협상 기준이 돼서 A사 추천해요!'],
      [58, '왕복 2시간 차이면 B사요. 자기계발 시간이 생각보다 커요.'],
      [112, '팀 분위기나 사수 유무도 같이 비교해보세요~'],
    ],
  },
  {
    type: 'SPEC',
    title: '정보처리기사 vs 토익, 뭐부터 할까요?',
    content:
      '하반기 공채 전에 하나만 확실히 챙기고 싶어요. 둘 다 준비하기엔 시간이 부족해요.',
    writerId: ME_ID,
    createdMinAgo: 4 * DAY,
    closeInMin: -1 * DAY,
    viewCount: 142,
    bookmarkCount: 9,
    options: [
      ['정보처리기사', 21],
      ['토익', 8],
    ],
    comments: [
      [21, '개발 직군이면 정처기가 우대 사항에 더 자주 보여요.'],
      [64, '토익은 점수 유효기간이 있으니 지원 직전에 보는 것도 방법이에요.'],
    ],
  },
  {
    type: 'CAREER',
    title: '개발 공부 중인데 PM 직무가 끌려요',
    content:
      '프론트엔드 공부한 지 8개월 됐는데, 팀 프로젝트에서 기획 쪽이 더 재밌었어요. 지금 방향을 바꾸는 게 맞을까요?',
    writerId: ME_ID,
    createdMinAgo: 2 * HOUR + 40,
    closeInMin: 20,
    viewCount: 33,
    bookmarkCount: 2,
    options: [
      ['개발 계속하기', 6],
      ['PM 도전하기', 9],
      ['개발하면서 기획 경험 쌓기', 13],
    ],
  },
  {
    type: 'COMPANY',
    title: '첫 직장, 스타트업 vs 중견기업',
    content:
      '스타트업은 시리즈 A 단계라 성장 경험을 많이 할 수 있을 것 같고, 중견기업은 안정적이에요. 첫 직장으로 어디가 나을까요?',
    writerId: 21,
    createdMinAgo: 9 * HOUR,
    closeInMin: 2 * DAY,
    viewCount: 231,
    bookmarkCount: 17,
    options: [
      ['스타트업', 32],
      ['중견기업', 27],
    ],
    myVoteIndex: 0,
    comments: [
      [37, '스타트업은 사수가 있는지가 제일 중요한 것 같아요.'],
      [58, '중견기업에서 기본기 쌓고 이직하는 루트도 괜찮아요.'],
      [ME_ID, '저도 같은 고민 중이라 댓글 보면서 참고하고 있어요!'],
      [112, '스타트업 다니는데 1년 동안 배운 게 정말 많아요.'],
      [64, '연봉 테이블이랑 복지도 꼭 비교해보세요.'],
      [79, '시리즈 A면 런웨이가 얼마나 남았는지 물어보세요.'],
      [91, '중견기업도 팀 바이 팀이라 면접 때 분위기 잘 보세요.'],
      [23, '저는 스타트업 갔다가 만족 중이에요 👍'],
      [45, '안정성이 중요하면 고민할 필요 없이 중견기업이죠.'],
      [130, '성장하고 싶다면 스타트업 추천해요.'],
      [88, '둘 다 붙으신 거 축하드려요!'],
      [17, '커리어 방향이 정해져 있다면 그 방향에 맞는 쪽으로요.'],
    ],
  },
  {
    type: 'COMPANY',
    title: '수습 3개월 중인데 퇴사해도 될까요?',
    content:
      '입사 전에 들었던 업무와 실제 업무가 너무 달라요. 수습 기간에 나가는 게 이력에 안 좋을까요?',
    writerId: 37,
    createdMinAgo: 6 * DAY,
    closeInMin: -3 * DAY,
    viewCount: 318,
    bookmarkCount: 12,
    options: [
      ['지금 퇴사', 19],
      ['1년은 버티기', 15],
      ['다니면서 이직 준비', 41],
    ],
    comments: [
      [58, '다니면서 준비하는 게 심적으로 훨씬 편해요.'],
      [21, '업무가 다르면 면접에서 충분히 설명 가능한 사유예요.'],
    ],
  },
  {
    type: 'COMPANY',
    title: '이직 제안 받았는데 연봉 협상 할까요?',
    content:
      '헤드헌터에게 제안을 받았는데 제시 연봉이 현재와 비슷해요. 협상을 시도해도 괜찮을까요?',
    writerId: 58,
    createdMinAgo: 14 * HOUR,
    closeInMin: 2 * DAY + 10 * HOUR,
    viewCount: 96,
    bookmarkCount: 5,
    options: [
      ['무조건 협상', 22],
      ['그대로 수락', 3],
    ],
    comments: [[64, '이직하면서 연봉 안 올리면 손해예요. 무조건 협상!']],
  },
  {
    type: 'SPEC',
    title: '부트캠프 vs 독학, 어떤 게 나을까요?',
    content:
      '비전공자라 혼자 공부하기가 막막해요. 부트캠프 비용이 부담되는데 그만한 가치가 있을까요?',
    writerId: 64,
    createdMinAgo: 20 * HOUR,
    closeInMin: 2 * DAY + 4 * HOUR,
    viewCount: 175,
    bookmarkCount: 21,
    options: [
      ['부트캠프', 18],
      ['독학', 12],
    ],
    myBookmark: true,
    comments: [
      [21, '국비 지원 과정도 알아보세요!'],
      [112, '혼자 하면 방향 잡기가 제일 어려워요. 커리큘럼이 큰 도움이 돼요.'],
    ],
  },
  {
    type: 'SPEC',
    title: '포트폴리오, 직접 만든 사이트 vs 노션',
    content:
      '프론트엔드 지원 예정인데 포트폴리오를 직접 개발할지 노션으로 깔끔하게 정리할지 고민이에요.',
    writerId: 79,
    createdMinAgo: 1 * DAY + 2 * HOUR,
    closeInMin: 1 * DAY + 22 * HOUR,
    viewCount: 128,
    bookmarkCount: 8,
    options: [
      ['직접 개발', 15],
      ['노션 정리', 17],
    ],
  },
  {
    type: 'SPEC',
    title: '자격증 3개 vs 프로젝트 1개',
    content: '남은 두 달 동안 무엇에 집중하는 게 서류 통과에 더 유리할까요?',
    writerId: 91,
    createdMinAgo: 5 * DAY,
    closeInMin: -2 * DAY,
    viewCount: 264,
    bookmarkCount: 14,
    options: [
      ['자격증 3개', 9],
      ['프로젝트 1개', 36],
    ],
    myVoteIndex: 1,
    comments: [[45, '실무 경험을 보여줄 수 있는 프로젝트가 훨씬 좋아요.']],
  },
  {
    type: 'SPEC',
    title: '코딩테스트 언어, 파이썬 vs 자바스크립트',
    content:
      '주 언어는 자바스크립트인데 코딩테스트는 파이썬이 유리하다고 들었어요. 바꿔야 할까요?',
    writerId: 23,
    createdMinAgo: 3 * HOUR,
    closeInMin: 2 * DAY + 21 * HOUR,
    viewCount: 54,
    bookmarkCount: 3,
    options: [
      ['파이썬으로 전환', 11],
      ['자바스크립트 유지', 14],
    ],
  },
  {
    type: 'CAREER',
    title: '공기업 준비 vs 사기업 준비',
    content:
      'NCS 공부와 사기업 자소서를 병행하다 보니 둘 다 애매해요. 하나만 고른다면요?',
    writerId: 45,
    createdMinAgo: 1 * DAY + 6 * HOUR,
    closeInMin: 1 * DAY + 18 * HOUR,
    viewCount: 199,
    bookmarkCount: 11,
    options: [
      ['공기업', 20],
      ['사기업', 18],
    ],
  },
  {
    type: 'CAREER',
    title: '대학원 진학, 지금 해야 할까요?',
    content:
      '취업 시장이 어려워서 대학원을 고민 중이에요. 연구에 대한 확신은 아직 없어요.',
    writerId: 130,
    createdMinAgo: 7 * DAY,
    closeInMin: -4 * DAY,
    viewCount: 287,
    bookmarkCount: 10,
    options: [
      ['진학', 7],
      ['취업 먼저', 29],
    ],
  },
  {
    type: 'CAREER',
    title: '디자이너에서 프론트엔드로 전향해도 될까요?',
    content:
      'UI 디자이너 2년 차인데 개발이 더 재밌어졌어요. 신입으로 다시 시작하는 게 두려워요.',
    writerId: 88,
    createdMinAgo: 1 * DAY + 10 * HOUR,
    closeInMin: 1 * DAY + 14 * HOUR,
    viewCount: 143,
    bookmarkCount: 15,
    options: [
      ['전향한다', 26],
      ['디자이너 유지', 6],
    ],
    myBookmark: true,
    comments: [
      [21, '디자인 이해도가 높은 프론트엔드 개발자는 정말 귀해요!'],
      [79, '저도 디자이너 출신인데 전향하길 잘했다고 생각해요.'],
    ],
  },
  {
    type: 'CAREER',
    title: '공백기 1년, 이력서에 솔직하게 쓸까요?',
    content:
      '건강 문제로 1년 정도 쉬었어요. 면접에서 물어보면 어떻게 답해야 할지 모르겠어요.',
    writerId: 17,
    createdMinAgo: 7 * HOUR,
    closeInMin: 2 * DAY + 17 * HOUR,
    viewCount: 77,
    bookmarkCount: 4,
    options: [
      ['솔직하게 작성', 19],
      ['굳이 쓰지 않기', 5],
    ],
  },
  {
    type: 'ETC',
    title: '면접 복장, 정장 vs 비즈니스 캐주얼',
    content: '자율 복장이라고 하는데 IT 회사 면접에 정장 입고 가면 어색할까요?',
    writerId: 112,
    createdMinAgo: 2 * HOUR,
    closeInMin: 1 * HOUR,
    viewCount: 61,
    bookmarkCount: 2,
    options: [
      ['정장', 4],
      ['비즈니스 캐주얼', 23],
    ],
  },
  {
    type: 'ETC',
    title: '스터디 카페 vs 집에서 공부',
    content: '집에서는 집중이 안 되는데 스터디 카페 비용이 꽤 나가요.',
    writerId: 64,
    createdMinAgo: 8 * DAY,
    closeInMin: -5 * DAY,
    viewCount: 156,
    bookmarkCount: 3,
    options: [
      ['스터디 카페', 24],
      ['집', 10],
    ],
  },
  {
    type: 'ETC',
    title: '취준하면서 아르바이트 병행할까요?',
    content:
      '생활비가 부족해서 주말 알바를 생각 중인데, 공부 시간이 줄어들까 걱정이에요.',
    writerId: 79,
    createdMinAgo: 16 * HOUR,
    closeInMin: 2 * DAY + 8 * HOUR,
    viewCount: 88,
    bookmarkCount: 1,
    options: [
      ['병행한다', 17],
      ['공부에만 집중', 8],
    ],
  },
  {
    type: 'ETC',
    title: '면접 전날, 밤새 준비 vs 푹 자기',
    content: '내일 1차 면접인데 아직 준비가 덜 된 것 같아 불안해요.',
    writerId: 91,
    createdMinAgo: 3 * DAY,
    closeInMin: -2 * DAY - 12 * HOUR,
    viewCount: 203,
    bookmarkCount: 6,
    options: [
      ['밤새 준비', 3],
      ['푹 자기', 38],
    ],
  },
  {
    type: 'COMPANY',
    title: '인턴, 전환형 vs 체험형',
    content:
      '전환형은 경쟁이 치열하고 체험형은 대기업이에요. 어디에 지원할까요?',
    writerId: 23,
    createdMinAgo: 1 * DAY + 4 * HOUR,
    closeInMin: 1 * DAY + 20 * HOUR,
    viewCount: 112,
    bookmarkCount: 7,
    options: [
      ['전환형', 21],
      ['체험형', 13],
    ],
  },
  {
    type: 'SPEC',
    title: '깃허브 잔디, 매일 심는 게 의미 있을까요?',
    content:
      '커밋 개수 채우려고 의미 없는 커밋을 하는 것 같아서요. 계속하는 게 좋을까요?',
    writerId: 45,
    createdMinAgo: 11 * HOUR,
    closeInMin: 2 * DAY + 13 * HOUR,
    viewCount: 69,
    bookmarkCount: 2,
    options: [
      ['계속 심는다', 8],
      ['의미 있는 커밋만', 22],
    ],
  },
  {
    type: 'CAREER',
    title: 'SI 회사로 첫 커리어 시작해도 괜찮을까요?',
    content: 'SI 회사에서 합격 연락을 받았는데 주변에서 말리는 사람이 많아요.',
    writerId: 130,
    createdMinAgo: 1 * DAY + 13 * HOUR,
    closeInMin: 1 * DAY + 11 * HOUR,
    viewCount: 134,
    bookmarkCount: 5,
    options: [
      ['일단 입사', 16],
      ['더 준비하기', 14],
    ],
  },
  {
    type: 'ETC',
    title: '합격 소식, SNS에 올릴까요?',
    content: '수습 끝나고 올릴지, 지금 바로 올릴지 고민돼요 😅',
    writerId: 17,
    createdMinAgo: 4 * DAY,
    closeInMin: -1 * DAY - 6 * HOUR,
    viewCount: 98,
    bookmarkCount: 1,
    options: [
      ['바로 올린다', 12],
      ['수습 끝나고', 18],
    ],
  },
  {
    type: 'COMPANY',
    title: '연봉은 낮지만 복지 좋은 회사',
    content:
      '연봉은 평균보다 낮지만 재택이 자유롭고 교육비 지원이 커요. 장기적으로 괜찮을까요?',
    writerId: 88,
    createdMinAgo: 1 * DAY + 16 * HOUR,
    closeInMin: 1 * DAY + 8 * HOUR,
    viewCount: 121,
    bookmarkCount: 9,
    options: [
      ['복지 좋은 회사', 19],
      ['연봉 높은 회사', 17],
    ],
  },
  {
    type: 'SPEC',
    title: '오픽 IH 받았는데 AL 재도전할까요?',
    content: '지원하려는 회사 기준은 IH인데 AL이 있으면 더 유리할지 궁금해요.',
    writerId: 37,
    createdMinAgo: 1 * DAY + 20 * HOUR,
    closeInMin: 1 * DAY + 4 * HOUR,
    viewCount: 73,
    bookmarkCount: 2,
    options: [
      ['재도전', 7],
      ['그 시간에 다른 준비', 20],
    ],
  },
];

// nowIsoTime 과 같은 형식(타임존 보정된 로컬 시간, 초 단위까지)으로 맞춘다
const toLocalIso = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 19);
};

const minutesFromNow = (minutes: number) =>
  toLocalIso(new Date(Date.now() + minutes * 60 * 1000));

const createSeedDB = (): IMockDB => {
  const db: IMockDB = {
    seededAt: Date.now(),
    nextId: { question: 1, option: 1, comment: 1 },
    user: { voteCount: 14, commentCount: 3 },
    questions: [],
    comments: [],
    votes: {},
    bookmarks: [],
  };

  SEED_QUESTIONS.forEach((seed) => {
    const questionId = db.nextId.question;
    db.nextId.question += 1;

    const options = seed.options.map(([name, voteCount]) => {
      const option = { id: db.nextId.option, name, voteCount };
      db.nextId.option += 1;
      return option;
    });

    db.questions.push({
      id: questionId,
      writerId: seed.writerId,
      type: seed.type,
      title: seed.title,
      content: seed.content,
      createdAt: minutesFromNow(-seed.createdMinAgo),
      closeAt: minutesFromNow(seed.closeInMin),
      viewCount: seed.viewCount,
      bookmarkCount: seed.bookmarkCount,
      options,
    });

    seed.comments?.forEach(([writerId, content], index) => {
      db.comments.push({
        id: db.nextId.comment,
        questionId,
        writerId,
        content,
        createdAt: minutesFromNow(-seed.createdMinAgo + (index + 1) * 7),
      });
      db.nextId.comment += 1;
    });

    if (seed.myVoteIndex !== undefined) {
      db.votes[questionId] = options[seed.myVoteIndex].id;
    }
    if (seed.myBookmark) db.bookmarks.push(questionId);
  });

  return db;
};

const saveDB = (db: IMockDB) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

const loadDB = (): IMockDB => {
  try {
    const saved = localStorage.getItem(DB_KEY);
    if (saved) {
      const db: IMockDB = JSON.parse(saved);
      if (Date.now() - db.seededAt < RESEED_INTERVAL) return db;
    }
  } catch {
    // 손상된 데이터는 무시하고 새로 시드한다
  }

  const db = createSeedDB();
  saveDB(db);
  return db;
};

const getStatus = (question: IMockQuestion) =>
  new Date(question.closeAt).getTime() <= Date.now()
    ? 'COMPLETED'
    : 'IN_PROGRESS';

const getLevelType = ({ voteCount, commentCount }: IMockDB['user']) => {
  let index = 0;
  while (
    index < LEVELSTEP.length - 1 &&
    voteCount >= LEVELSTEP[index].goalVotes &&
    commentCount >= LEVELSTEP[index].goalComments
  ) {
    index += 1;
  }
  return LEVELSTEP[index].type;
};

const toPage = <T>(items: T[], page: number, size: number) => {
  const content = items.slice(page * size, (page + 1) * size);
  const totalPages = Math.ceil(items.length / size);

  return {
    content,
    number: page,
    size,
    totalElements: items.length,
    totalPages,
    numberOfElements: content.length,
    first: page === 0,
    last: page >= totalPages - 1,
    empty: content.length === 0,
  };
};

const toListItem = (db: IMockDB, question: IMockQuestion) => ({
  id: question.id,
  title: question.title,
  type: question.type,
  status: getStatus(question),
  closeAt: question.closeAt,
  viewCount: question.viewCount,
  commentCount: db.comments.filter((c) => c.questionId === question.id).length,
  bookmarkCount: question.bookmarkCount,
});

const sortByNewest = (questions: IMockQuestion[]) =>
  [...questions].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

const ok = (data?: unknown, code = 200): IMockResult => ({
  code,
  message: 'OK',
  data,
});

const fail = (code: number, message: string): IMockResult => ({
  code,
  message,
});

// 같은 세션에서 새로고침 없이 다시 열 때마다 조회수가 오르지 않도록 기억해둔다
const viewedQuestionIds = new Set<number>();

const parseBody = (data: unknown) => {
  if (typeof data !== 'string') return data;
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
};

const handleRequest = (
  db: IMockDB,
  method: string,
  url: string,
  body: unknown,
): IMockResult => {
  const { pathname, searchParams } = new URL(url, 'http://mock.local');
  const segments = pathname.replace(/^\/api\/v1\//, '').split('/');
  const isId = (segment: string) => /^\d+$/.test(segment);
  const route = `${method.toUpperCase()} ${segments
    .map((segment) => (isId(segment) ? ':id' : segment))
    .join('/')}`;
  const [questionId, subId] = segments.filter(isId).map(Number);

  const page = Number(searchParams.get('page') ?? 0);
  const size = Number(searchParams.get('size') ?? 10);
  const question = db.questions.find((q) => q.id === questionId);

  switch (route) {
    case 'POST auth/kakao-login':
      return ok({
        token: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        userId: ME_ID,
      });

    case 'GET users/statistics':
      return ok({ level: getLevelType(db.user), ...db.user });

    case 'GET users/questions': {
      const type = searchParams.get('type');
      const filtered = db.questions.filter((q) => {
        if (type === 'ME') return q.writerId === ME_ID;
        if (type === 'VOTED') return db.votes[q.id] !== undefined;
        if (type === 'BOOKMARKED') return db.bookmarks.includes(q.id);
        return false;
      });
      return ok(
        toPage(
          sortByNewest(filtered).map((q) => toListItem(db, q)),
          page,
          size,
        ),
      );
    }

    case 'GET questions': {
      const type = searchParams.get('type');
      const status = searchParams.get('status');
      const filtered = db.questions.filter(
        (q) =>
          (!type || q.type === type) && (!status || getStatus(q) === status),
      );
      return ok(
        toPage(
          sortByNewest(filtered).map((q) => toListItem(db, q)),
          page,
          size,
        ),
      );
    }

    case 'POST questions': {
      const { type, title, content, closeAt, options } = body as {
        type: string;
        title: string;
        content: string;
        closeAt: string;
        options: { name: string }[];
      };
      if (!type || !title || !options || options.length < 2) {
        return fail(400, '필수 값이 비어있습니다.');
      }

      db.questions.push({
        id: db.nextId.question,
        writerId: ME_ID,
        type,
        title,
        content,
        createdAt: toLocalIso(new Date()),
        closeAt,
        viewCount: 0,
        bookmarkCount: 0,
        options: options.map(({ name }) => {
          const option = { id: db.nextId.option, name, voteCount: 0 };
          db.nextId.option += 1;
          return option;
        }),
      });
      db.nextId.question += 1;
      return ok(undefined, 201);
    }

    case 'GET questions/:id': {
      if (!question) return fail(404, '존재하지 않는 질문입니다.');
      if (!viewedQuestionIds.has(question.id)) {
        viewedQuestionIds.add(question.id);
        question.viewCount += 1;
      }
      return ok({
        ...toListItem(db, question),
        content: question.content,
        voteCount: question.options.reduce((sum, o) => sum + o.voteCount, 0),
        bookmarked: db.bookmarks.includes(question.id),
        editable: question.writerId === ME_ID,
      });
    }

    case 'DELETE questions/:id': {
      if (!question || question.writerId !== ME_ID) {
        return fail(403, '삭제 권한이 없습니다.');
      }
      db.questions = db.questions.filter((q) => q.id !== question.id);
      db.comments = db.comments.filter((c) => c.questionId !== question.id);
      db.bookmarks = db.bookmarks.filter((id) => id !== question.id);
      delete db.votes[question.id];
      return ok();
    }

    case 'GET questions/:id/options': {
      if (!question) return fail(404, '존재하지 않는 질문입니다.');
      const votedOptionId = db.votes[question.id] ?? null;
      return ok({
        votedOptionId,
        showVoteCount:
          question.writerId === ME_ID ||
          votedOptionId !== null ||
          getStatus(question) === 'COMPLETED',
        options: question.options,
      });
    }

    case 'POST questions/:id/options/:id': {
      const option = question?.options.find((o) => o.id === subId);
      if (
        !question ||
        !option ||
        question.writerId === ME_ID ||
        getStatus(question) === 'COMPLETED' ||
        db.votes[question.id] !== undefined
      ) {
        return fail(400, '투표할 수 없습니다.');
      }
      option.voteCount += 1;
      db.votes[question.id] = option.id;
      db.user.voteCount += 1;
      return ok(undefined, 201);
    }

    case 'DELETE questions/:id/options/:id': {
      const option = question?.options.find((o) => o.id === subId);
      if (!question || !option || db.votes[question.id] !== option.id) {
        return fail(400, '투표 내역이 없습니다.');
      }
      option.voteCount -= 1;
      delete db.votes[question.id];
      db.user.voteCount = Math.max(0, db.user.voteCount - 1);
      return ok();
    }

    case 'GET questions/:id/comments': {
      const comments = db.comments
        .filter((c) => c.questionId === questionId)
        .map((c) => ({
          id: c.id,
          commenterAlias: `별랑이${c.writerId}`,
          content: c.content,
          // 화면에서 '2023.12.07. 14:30' 형태로 바꿔 보여준다
          createdAt: c.createdAt.slice(0, 16),
          editable: c.writerId === ME_ID,
        }));
      return ok(toPage(comments, page, size));
    }

    case 'POST questions/:id/comments': {
      const { content } = body as { content: string };
      if (!question || !content) return fail(400, '댓글을 등록할 수 없습니다.');
      db.comments.push({
        id: db.nextId.comment,
        questionId: question.id,
        writerId: ME_ID,
        content,
        createdAt: toLocalIso(new Date()),
      });
      db.nextId.comment += 1;
      db.user.commentCount += 1;
      return ok(undefined, 201);
    }

    case 'PUT questions/:id/comments/:id': {
      const comment = db.comments.find(
        (c) => c.id === subId && c.writerId === ME_ID,
      );
      if (!comment) return fail(403, '수정 권한이 없습니다.');
      // editComment 는 content 문자열을 그대로 body 로 보낸다
      comment.content =
        typeof body === 'string'
          ? body
          : (body as { content?: string })?.content ?? String(body);
      return ok();
    }

    case 'DELETE questions/:id/comments/:id': {
      const comment = db.comments.find(
        (c) => c.id === subId && c.writerId === ME_ID,
      );
      if (!comment) return fail(403, '삭제 권한이 없습니다.');
      db.comments = db.comments.filter((c) => c.id !== comment.id);
      db.user.commentCount = Math.max(0, db.user.commentCount - 1);
      return ok();
    }

    case 'POST questions/:id/bookmark': {
      if (!question || question.writerId === ME_ID) {
        return fail(400, '저장할 수 없습니다.');
      }
      if (db.bookmarks.includes(question.id)) {
        db.bookmarks = db.bookmarks.filter((id) => id !== question.id);
        question.bookmarkCount -= 1;
      } else {
        db.bookmarks.push(question.id);
        question.bookmarkCount += 1;
      }
      return ok();
    }

    default:
      return fail(404, `목데이터가 없는 요청입니다: ${route}`);
  }
};

const mockAdapter: AxiosAdapter = async (
  config: InternalAxiosRequestConfig,
) => {
  await new Promise((resolve) => {
    setTimeout(resolve, MOCK_DELAY);
  });

  const db = loadDB();
  const result = handleRequest(
    db,
    config.method ?? 'get',
    config.url ?? '',
    parseBody(config.data),
  );
  saveDB(db);

  return {
    data: result,
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
    request: {},
  };
};

const useTempMockData = () => {
  // Login 페이지는 렌더 중에 요청을 보내므로 effect 가 아닌 렌더 시점에 교체해야 첫 요청부터 목 서버가 받는다
  auth.defaults.adapter = mockAdapter;

  return { noticeMessage: NOTICE_MESSAGE, loginPath: LOGIN_PATH };
};

export default useTempMockData;
