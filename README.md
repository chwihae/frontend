<div align="center">
<img src="https://github.com/chwihae/frontend/assets/90189513/5a44d373-bb95-4691-8f23-2c7bd1e43871" alt="pick-git-logo" width="400">
  
📍 취준생의 결정 고민을 투표하는 사이트</br>
📎 [취해](https://chwihae.vercel.app/) <br>
🗓️ 2023/09/18 ~ 진행중
</div>

## 👥 참여인원

기획자 1인, 디자이너 1인, 프론트엔드 1인, 백엔드 1인

## 🛠 기술 스택

<img alt="React" src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img alt="Typescript" src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img  alt="TailwindCSS" src="https://img.shields.io/badge/tailwindCSS-06B6D4?style=for-the-badge&logo=tailwindCSS&logoColor=white"> <br/>
<img  alt="Tanstack Query" src="https://img.shields.io/badge/Tanstack Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white"> <img  alt="React Hook Form" src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=react-hook-form&logoColor=white"> <img  alt="Axios" src="https://img.shields.io/badge/Axios-671ddf?style=for-the-badge&logo=Axios&logoColor=white">

<img alt="eslint" src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img alt="Prettier" src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=black"> <img alt="Husky" src="https://img.shields.io/badge/Husky-46B980?style=for-the-badge&logo=Husky&logoColor=black"> <img alt="Lint-Staged" src="https://img.shields.io/badge/Lint Staged-2E86FF?style=for-the-badge&logo=Lint-Staged&logoColor=black">

## 📱 기능

|                                                                1.스플래쉬 및 로그인 페이지                                                                 |                                                                2.메인 홈의 등급, 탭, 필터, 무한스크롤                                                                 |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/chwihae/frontend/assets/90189513/7e525a0c-d517-4dfb-b87c-4b2fb3200cdd" alt="취해 스플래쉬 및 로그인 gif 화면" width="450px"/> | <img src="https://github.com/chwihae/frontend/assets/90189513/3d5078bc-1ba7-424c-8482-131ebd862f53" alt="취해 메인홈의 탭, 필터, 무한스크롤 gif 화면" width="450px"/> |

- 등급에 따른 Progress bar 게이지 및 캐릭터 변경
- 카테고리 분류
- 해결상태 필터
- 투표 리스트 무한스크롤 구현

|                                                                3.글작성 페이지                                                                 |
| :--------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/chwihae/frontend/assets/90189513/9209e2b8-8698-4323-a1da-8bf80a2f2018" alt="취해 글작성 gif 화면" width="450px"/> |

- React-hook-form의 useFormContext를 통해, 폼의 필드 컴포넌트를 전역으로 관리하여 구현
- React-hook-form의 useFieldArray를 사용해 투표 항목 필드를 배열로 관리하며 추가 및 삭제를 구현
- 폼 유효성 검사 및 유효성 만족해야 등록버튼 활성화
- 작성 완료시 토스트 메시지 출력

|                                                                  4.투표글 (내가 쓴) 진행중, 마감, 삭제                                                                  |                                                                  5.투표글 (타인이 쓴) 진행중, 댓글                                                                  |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/chwihae/frontend/assets/90189513/2bf7d426-cb33-49bf-98a9-1ed41384ce96" alt="취해 내가쓴투표글 진행중, 마감, 삭제 gif 화면" width="450px"/> | <img src="https://github.com/chwihae/frontend/assets/90189513/a2117536-f8b9-4550-8370-5a2606c5dcfa" alt="취해 타인이쓴투표글 진행중, 댓글 gif 화면" width="450px"/> |

- Tanstack-Query의 useQuery, useMutation으로 새로고침없이 투표 및 댓글 기능 구현
- Tanstack-Query의 useInfiniteQuery로 댓글 무한스크롤 구현
- 작성자와 투표자별, 투표 진행 여부별, 투표 참여별 권한 접근 설정
- 스크랩 기능 구현

### 4. 공통사항

- JWT 토큰을 이용한 카카오 소셜로그인 기능 개발
- Router로 유저 권한에 따라 접속 허용범위 설정
- tailwindCSS config 설정으로 디자인 시스템 적용
- ESLint, Husky 설정으로 런타임 에러 최소화
- Axios interceptor로 전역 request와 response에 대한 성공 및 에러 처리
- ContextAPI로 클라이언트 전역 상태 관리
- tsconfig.json, vite.config.ts 를 통해 절대경로 설정
- favicon, og 카드 설정

</details>

## 📂 폴더 구조

```
┣ 📂.husky
┣ 📂.vscode
┣ 📂src
┃ ┣ 📂apis
┃ ┣ 📂assets
┃ ┣ 📂components
┃ ┣ 📂constants
┃ ┣ 📂hooks
┃ ┣ 📂pages
┃ ┣ 📂types
┃ ┣ 📂utils
┗ 📜etc (setting files)
```
