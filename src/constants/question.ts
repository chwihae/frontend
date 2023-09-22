export const CATEGORYOPTIONS = [
  { type: 'CAREER', title: '회사/이직' },
  { type: 'SPEC', title: '스펙/공부' },
  { type: 'COMPANY', title: '진로/직무' },
  { type: 'ETC', title: '기타/일상' },
];

const today = new Date();
export const PERIODOPTIONS = [
  { text: '30분', value: today.setMinutes(today.getMinutes() + 30) },
  { text: '3시간', value: today.setHours(today.getHours() + 3) },
  { text: '3일', value: today.setDate(today.getDate()) + 6 },
];

export const PLACEHOLDER_CONTENT = `상황을 자세하게 작성해주실수록\n별랑이들이 좋은 선택을 내려줄 수 있어요.\n(최대 800자 입력 가능)`;
