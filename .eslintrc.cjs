module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['react', 'react-refresh', '@typescript-eslint', 'import'],
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
    'consistent-return': 'off',
    'react-refresh/only-export-components': [
      'error',
      { allowConstantExport: true },
    ],
    // React JSX 코드에서 React를 import 안해도 됨
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    // 타입 단언 기능 끄기
    '@typescript-eslint/no-non-null-assertion': 'off',
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
    'import/prefer-default-export': 'off',
    'import/no-named-as-default-member': 'off',
    // 모듈을 찾을 수 없을 때의 경고를 비활성화
    // 'import/no-unresolved': 'off',
  },
};
