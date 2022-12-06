# FIONDB

피파온라인4 유저들을 위한 전적검색 사이트

# 폴더 구조

> 폴더구조를 정리해 봤습니다. 😅

## components

```
|
|--- common : props가 복잡하지 않는 여러 도메인(페이지)에서 재사용되는 컴포넌트
|--- {domain} : fiondb.vercel.app/{domain}에서만 주로 사용되는 컴포넌트 (매치기록박스 , ...)
```

<br>

## hooks

- React Hooks를 이용하여 직접 상태를 관리하고 반환하는 함수
- 직접적으로 React Hooks를 이용하진 않지만 다른 라이브러리의 커스텀 훅(useQuery, useMutate)을 이용하는 함수
- hooks/query/{fileName}.tsx : ReactQuery를 의존하고 있는 custom hooks

<br>

## useCases

- 도메인과 밀접한 유틸함수들을 위치시키면 어떨까요? ex) API 호출을 통해 응답 받은 복잡한 JSON 데이터와 밀접한 로직들

<br>

## util

- 도메인에 의존하지 않는 재사용성이 높은 유틸 함수들 ex) 날짜, 시간, 문자열 변환 등

<br>

## pages

```
|
|-- {pageName}/index.tsx : 리소스, 파라미터가 꼭 필요한 경우 리다이렉팅 되는 페이지 (404의 역할을 함)
|-- {pageName}/[id].tsx : id 값등 추가적인 파라미터가 필요한 페이지의 실질적인 렌더링을 담당하는 부분(SSR 을 적용할 수 있음)
|-- {pageName}/[...id].tsx : 아직 사용되지 않음( 정리 x )
```

<br>

## pages/api

- 외부 api 요청을 보내는 fetch 함수들 (axios를 사용)
- 추후에 Next.js의 API Routes를 적용하여 end point, api key 등을 hide 할 계획이 있음

## types

- 복잡한 객체 데이터의 타입을 정의하고 export 하는 부분 (API ResponseType, ...)
- 적어도 3번 이상 공유되는 타입들을 모아놓으려고 계획중
- 그외 type은 사용되는 파일 내에 위치시켜 사용할 예정
