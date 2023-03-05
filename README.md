# FIONDB
<img src='https://user-images.githubusercontent.com/66128037/222958401-4515d0cb-656b-489f-9526-59b1db068edc.png' width=300px><br>
> 피파온라인4 유저들을 위한 전적검색 사이트<br>


<br><br>

## 서비스 배경

게임을 좋아하는 팀원들끼리 공통 관심분야인 게임 커뮤니티를 만들고 싶었고

리그오브레전드의 [op.gg](http://op.gg) 사이트를 모티브로 하여 유저들간의 전적과 랭킹을 조회하는 시스템을 

넥슨 openAPI를 사용하여 기획했습니다

<br><br><br>

## 서비스 주요 기능

- 최근 전적 조회 기능
    
    `구단주 이름을 검색해서 경기결과,승률,포메이션을 제공합니다`  
    
- 공식 경기 랭킹 조회 기능
    
    `상위 실력유저의 공식경기 점수와 전적,승률을 제공합니다`  
    
- 모바일 반응형 웹 구현
    
    `모바일 환경에서 심플한 UI디자인을 만들었습니다`

<br /><br />

## 페이지 구현 모습
| 랜딩페이지 | 랭킹 페이지 |
| ------ | ------ |
| <div align='center'><img src="https://user-images.githubusercontent.com/66128037/222958577-cdc50175-56f4-449c-a6ee-de04b05ce7ea.png" width=500px /></div> | <div align='center'><img src="https://user-images.githubusercontent.com/66128037/222958944-bec4089f-9d8f-4224-a6e0-f897277f0618.png" width=500px /></div> |
| * 구단주 검색 기능<br />| * 무한스크롤 적용<br />* 공식경기 랭킹순으로 정보 제공<br />| 
<br />


| 전적검색 페이지 | 모바일 UI |
| ------ | ------ |
| <div align='center'><img src="https://user-images.githubusercontent.com/66128037/222958641-db44e6f7-1073-4704-a33a-60404356da8f.png" width=500px ><br /><img src="https://user-images.githubusercontent.com/66128037/222958878-4172f16b-b525-428d-89f4-9c82f2fd64da.png" width=500px height=100% ></div> | <div align='center'></div> |
| * 검색한 유저의 최근 경기기록 조회<br />* 각 경기의 mvp선수, 포메이션 제공<br />|* 반응형 웹 UI<br />| 

<br /><br />

## 프로젝트 팀원 역할 분담

| 이름 | 담당 업무 | |
| ------ | ------------------------ | ----- |
| [정병욱](https://github.com/jungbyungwook) | Front, Backend | 개발 환경, 랜딩, 랭킹 페이지 |
| [안영민](https://github.com/ahn0min) | Front | 전적 검색 페이지 |
| [이종열](https://github.com/jongyeol12) | Front | 랜딩, 랭킹 페이지|
| 백진하 | Design | UI디자인, 반응형 웹 디자인 |


<br /><br /><br /><br /><br /><br /><br /><br />





















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
