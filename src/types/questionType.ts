export interface IQuestionOptions {
  name: string;
}

export interface IQuestion {
  type: string | null;
  title: string;
  content: string;
  closeAt: string;
  options: IQuestionOptions[];
}
