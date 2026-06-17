# AGENTS.md

## 적용 범위

이 문서는 저장소 전체에 적용됩니다.

## 프로젝트 개요

- 이 프로젝트는 Next.js `app` 라우터를 사용하는 포트폴리오 사이트입니다.
- 앱 라우트와 레이아웃은 `app/`에 있습니다.
- 공통 UI 섹션은 `src/Component/`에 있습니다.
- 헤더, 스크롤 위치, 섹션 이동 관련 헬퍼는 `src/Header/`에 있습니다.
- 정적 파일은 `public/`에 있습니다. 데이터 파일에서 사용하는 경로는 보통 `/images/...`, `/portfolio/...`, `/portfolio/company/...` 형식으로 제공됩니다.
- 전역 Tailwind 레이어와 재사용 유틸리티 클래스는 `app/globals.css`에 있고, 디자인 토큰은 `tailwind.config.js`에서 확장합니다.

## 명령어

- 의존성이 없을 때는 `bun install`로 설치합니다.
- 로컬 개발 서버는 `bun run dev`로 실행합니다.
- JS, CSS, 레이아웃을 변경했다면 가능할 때 `bun run build`로 검증한 뒤 전달합니다.
- `bun run lint`는 `package.json`에 정의되어 있습니다. 설치된 Next.js 버전에서 사용할 수 없다면, 사용자가 요청하지 않는 한 lint 설정을 바꾸지 말고 실행 결과만 보고합니다.
- 문서만 변경한 경우에는 빌드가 필요하지 않습니다.

## 유지보수 규칙

- `bun.lock`을 패키지 관리자 기준 파일로 유지합니다. 의존성이 바뀌지 않았다면 lockfile을 수정하지 않습니다.
- React 컴포넌트는 기존 코드 스타일에 맞춰 `.jsx`를 사용합니다.
- 훅, 브라우저 API, 컨텍스트, 이벤트 핸들러가 필요한 파일에만 `'use client';`를 추가합니다.
- `section-container`, `section-label`, `section-title`, `section-copy`, `accent-line`, `btn-primary`, `btn-outline`, `work-list`, `work-row`처럼 `app/globals.css`에 이미 있는 컴포넌트 클래스를 우선 사용합니다.
- 색상은 하드코딩하기보다 `tailwind.config.js`의 Tailwind 테마 토큰을 우선 사용합니다.
- UI 이미지를 렌더링할 때는 로컬 이미지도 가능한 한 `next/image`를 사용합니다.
- 적절한 아이콘이 있다면 `lucide-react` 아이콘을 사용합니다.
- 화면에 보이는 문구는 해당 UI 영역에 기존 영어 라벨 패턴이 있는 경우를 제외하고 한국어를 유지합니다.

## 라우팅과 상태

- `app/layout.jsx`는 앱을 `ClientLayout`으로 감쌉니다.
- `app/ClientLayout.jsx`는 `AppProvider`를 제공하고, 공통 `Header`를 렌더링하며, 페이지 콘텐츠를 `main#main-content`로 감쌉니다.
- `app/Context.jsx`는 인트로 상태, 활성 섹션, 상세 페이지 슬라이드, 대기 중인 스크롤, 테마 같은 공통 앱 상태를 관리합니다.
- 홈페이지 섹션은 `app/page.jsx`에 있습니다. 섹션 이동은 각 섹션의 `data-index`에 의존합니다.
- 홈페이지 섹션을 추가, 삭제, 재정렬할 때는 `src/Header/`의 내비게이션 상태와 헤더/위치 컴포넌트도 함께 확인합니다.
- 상세 페이지는 다음 파일에 있습니다.
  - `app/portfolio/[id]/page.jsx`: 개인/프로젝트 상세 페이지
  - `app/publishing/[id]/page.jsx`: 회사 퍼블리싱 상세 페이지

## 데이터 파일

- 포트폴리오 데이터의 단일 원본은 `src/data/portfolio.json`입니다.
- 화면에서는 JSON을 직접 import하지 말고 `src/data/portfolio.js`의 selector를 사용합니다.
- 개인 프로젝트 목록은 `getPersonalProjects()`를 사용합니다.
- 개인 프로젝트 상세 페이지는 `getPersonalProjectByLegacyId(id)`를 사용합니다.
- 회사 퍼블리싱 목록은 `getCompanyWorks()`를 사용합니다.
- 회사 퍼블리싱 상세 페이지는 `getCompanyWorkByLegacyId(id)`를 사용합니다.
- `id`는 내부 고유값입니다. 기존 URL 호환이 필요한 숫자 ID는 `legacyId`로 관리합니다.
- 개인 프로젝트와 회사 프로젝트는 숫자 ID가 겹칠 수 있으므로 `id`는 `personal-10`, `company-10`처럼 타입 접두사를 유지합니다.
- 목록에서 숨기되 보존해야 하는 과거 데이터는 `status: "archived"`와 `visible: false`로 관리합니다.
- 데이터 기반 이미지를 추가할 때는 참조한 파일이 `public/` 아래에 실제로 있는지, 그리고 `assets.thumb`, `assets.hero`, `assets.intro`, `assets.gallery`, `detail.samples`의 경로 형식이 맞는지 확인합니다.
- 모든 selector와 소비 컴포넌트를 함께 수정하지 않는 한 `portfolio.json`의 필드 이름을 변경하지 않습니다.

## UI와 접근성

- 기존 스크롤 섹션 동작을 유지합니다. `IntersectionObserver`가 관찰하는 섹션에는 `scroll-section` 클래스와 숫자형 `data-index`가 있어야 합니다.
- 상호작용 요소는 실제 `button`, `a`, `Link` 요소로 유지합니다.
- 이미지가 많은 UI나 탭 UI를 변경할 때는 의미 있는 `alt`, `aria-label`, `aria-labelledby`, 탭, 키보드 동작을 유지합니다.
- 공통 색상이나 전역 스타일을 변경할 때는 라이트/다크 테마를 모두 확인합니다.
- 현재의 절제된 포트폴리오 레이아웃과 충돌하는 장식성 UI는 추가하지 않습니다.

## Git 작업 규칙

- 작업 트리에는 사용자 변경사항이 있을 수 있습니다. 관련 없는 수정은 되돌리지 않습니다.
- 변경 범위는 요청된 작업에 맞게 좁게 유지합니다.
- 사용자가 명시적으로 요청하지 않는 한 커밋하지 않습니다.
- `.DS_Store`, 빌드 산출물, 로컬 환경 파일 같은 생성 파일은 추가하지 않습니다.
