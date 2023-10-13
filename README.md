## [취해 : 취준생들의 결정을 돕는 투표 서비스](https://chwihae.vercel.app/)

![스크린샷 2023-10-13 오후 5 30 13](https://github.com/chwihae/frontend/assets/90189513/8186f5ee-72d1-4c0a-860c-5f1d08b5920e)

- 본 기간 : 2023/09/18 ~ 2023/09/24
- 리팩토링 기간 : 2023/09/25 ~ 진행중

## 배포 링크

- 취해는 [여기서](https://chwihae.vercel.app/) 살펴보실 수 있습니다.

## 기능

![스크린샷 2023-10-13 오후 5 34 49](https://github.com/chwihae/frontend/assets/90189513/36e7b2a0-13ad-42c2-ba37-f3eedf764e22)
![스크린샷 2023-10-13 오후 5 35 00](https://github.com/chwihae/frontend/assets/90189513/302b5e04-7d7c-4d35-90e7-e7e77e447328)
![스크린샷 2023-10-13 오후 5 35 09](https://github.com/chwihae/frontend/assets/90189513/a615dfff-7ea3-4f29-9d42-4c3d54f4820f)

## 구현 사항

- OAuth 로 카카오 간편 회원가입, 로그인 구현
  - 토큰 만료 안됐으면 자동로그인 가능
- React-Query로 새로고침없이 클릭이벤트 및 댓글 입력 구현
- React-hook-form의 useFormContext, useFieldArray 로 질문작성 폼 구현
  - 질문작성 폼 컴포넌트가 비대해지는 것을 막기 위해 배열로 사용하는 필드를 분리할 때, 폼을 전역으로 간단히 관리하기 위해 사용
  - useFieldArray를 사용해 input 필드를 배열로 관리해야할 때, 추가 및 삭제를 간단히 구현
- Axios interceptor로 전역 request와 response에 대한 성공 및 에러 처리
- tsconfig.json, vite.config.ts 를 통해 절대경로 설정
- eslint import 규칙 설정

## 기술 스택

- TypeScript, React, React-router-dom, Tanstack-Query, TailwindCSS, React-hook-form, Axios
- ESLint, Prettier, Husky, Lint-Staged

## 설치 및 실행 방법

```
// 로컬환경으로 복사
git clone https://github.com/chwihae/frontend.git

// 디렉터리로 이동
cd chwihae

// 설치
npm install

// 프로젝트 실행
npm run start
```

## 폴더 구조

```
📦src
 ┣ 📂apis
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂Home
 ┃ ┣ 📂Layout
 ┃ ┣ 📂Mypage
 ┃ ┣ 📂Question
 ┃ ┣ 📂Vote
 ┃ ┗ 📂common
 ┣ 📂constants
 ┣ 📂hooks
 ┣ 📂pages
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜Intro.tsx
 ┃ ┣ 📜Login.tsx
 ┃ ┣ 📜Mypage.tsx
 ┃ ┣ 📜Mysaved.tsx
 ┃ ┣ 📜Myvoted.tsx
 ┃ ┣ 📜Mywritten.tsx
 ┃ ┣ 📜NotFound.tsx
 ┃ ┣ 📜QuestionCreate.tsx
 ┃ ┣ 📜QuestionEdit.tsx
 ┃ ┣ 📜Splash.tsx
 ┃ ┗ 📜Vote.tsx
 ┣ 📂types
 ┃ ┗ 📂common
 ┣ 📂utils
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┣ 📜router.tsx
 ┗ 📜vite-env.d.ts
```
