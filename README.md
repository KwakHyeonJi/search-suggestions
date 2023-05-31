# Search Suggestions

![20230510](https://github.com/KwakHyeonJi/search-suggestions/assets/22536999/c90fe963-9207-4296-a6ce-4848a55a11e6)

## 🔍 프로젝트 소개

- 로컬 캐싱을 활용한 검색창 구현
- 원티드 프리온보딩 인턴십 프론트엔드 팀 프로젝트

<br />

## 👀 배포

- API 외부 유출 방지를 위해 배포 링크는 기재하지 않습니다.

<br />

## 🚴‍♀️ 실행 방법

```
npm install
npm run start
```

<br />

## 🛠 기술 스택
- React
- TypeScript
- Styled-components
- Axios
- ESLint | Prettier | Husky

<br />

## ✒ 개발 내용

### 1. 공통

- GitHub Actions에 bfg-repo-cleaner 관련 workflow를 추가하여, 실수로 commit된 민감한 정보(ex. API Key)를 git history에서 숨길 수 있도록 자동화했습니다.

### 2. 추천 검색어

- 추천 검색어 API 호출 시 검색 키워드에 debounce를 적용하여 호출 횟수를 조절했습니다.

### 3. 로컬 캐싱
- 비동기식이고, 저장 공간이 상대적으로 큰 Cache Storage API을 선택했습니다.
- Cache Storage API 관련 로직을 class로 모듈화하고 custom hook을 통해 사용하도록 하면서 유지보수가 용이하도록 구현했습니다.
- Cache header에 expire time을 설정하여 캐시 만료 시, API를 다시 요청하도록 구현했습니다.
