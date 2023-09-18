module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  // 새로운 규칙을 단순히 설정이 가능한 상태로 만들어주기만 함
  plugins: [
    'prettier',
    'react',
    'react-hooks',
    // 코드를 수정할 경우 새로고침 하지않고, 수정된 사항을 빠르게 교체해주는 라이브러리(기존 react-hot-loader의 제한적인 부분들을 개선하기 위해 만들어짐)
    'react-refresh',
    '@typescript-eslint',
    'import',
  ],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    // 변수 및 함수 중복
    'no-shadow': 'warn',
    'react-refresh/only-export-components': [
      'error',
      { allowConstantExport: true },
    ],
    // React JSX 코드에서 React를 import 안해도 됨
    'react/react-in-jsx-scope': 'off',
    // JSX에서 React를 사용하는 것에 대한 경고 해제
    'react/jsx-uses-react': 'off',
    // 타입 단언 기능 끄기
    '@typescript-eslint/no-non-null-assertion': 'off',
    // Prettier 규칙을 적용하고, 코드 포맷이 Prettier 규칙과 일치하지 않을 경우 에러로 표시
    'prettier/prettier': 'error',
    // TypeScript에서 타입 import 스타일을 지정
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
    // import 규칙
    'sort-imports': [
      'error',
      {
        // 대문자 무시
        ignoreCase: true,
        // 변수나 함수의 순서가 import 정렬에 영향을 미치지 않음
        ignoreDeclarationSort: true,
        // 멤버 정렬 무시
        ignoreMemberSort: false,
        // 그룹화
        allowSeparatedGroups: true,
      },
    ],
    // import 순서 규칙
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        // 오름차순 정렬, 대소문자 구분 하지 않음
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    // default export 사용에 대한 경고를 비활성화
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    // 모듈을 찾을 수 없을 때의 경고를 비활성화
    // 'import/no-unresolved': 'off',
  },
};
