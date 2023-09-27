export const TABBAR = [
  { type: '', title: '전체' },
  { type: 'COMPANY', title: '회사/이직' },
  { type: 'SPEC', title: '스펙/공부' },
  { type: 'CAREER', title: '진로/직무' },
  { type: 'ETC', title: '기타/일상' },
];

export const RADIOOPTIONS = [
  { text: '전체', value: 0, status: '' },
  { text: '해결중', value: 1, status: 'IN_PROGRESS' },
  { text: '해결완료', value: 2, status: 'COMPLETED' },
];

export const LEVELSTEP = [
  { name: '학사', type: 'BACHELOR', goalVotes: 20, goalComments: 5 },
  { name: '석사', type: 'MASTER', goalVotes: 100, goalComments: 30 },
  { name: '박사', type: 'DOCTOR', goalVotes: 300, goalComments: 100 },
  { name: '교수', type: 'PROFESSOR', goalVotes: 0, goalComments: 0 },
];
