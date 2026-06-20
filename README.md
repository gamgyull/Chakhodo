# 착호도 (捉虎圖 · Chakhodo) — 호러 게임 소개 웹사이트

졸업작품용 **조선 민속 호러 게임** 소개 사이트입니다. (호환·착호갑사·산군 테마)
어두운 호러 무드 위에 **한국 전통 수묵/민화 느낌**(한지색·인주 붉은색·붓글씨 제목)을 입혔으며,
순수 **HTML / CSS / JavaScript**로만 만들어 별도 빌드 과정 없이 바로 열어볼 수 있습니다.

> **제목 디자인**: 메인 화면 제목은 보내주신 이미지처럼 **한글(흰 붓글씨 ‘착호도’) → 한자(붉은 ‘捉虎圖’) → 영문(붉은 필기체 ‘Chakhodo’)** 이 세로로 겹쳐 배열되도록 코드로 구현했습니다. (`assets/css/style.css`의 `.title-scroll / .t-kor / .t-hanja / .t-en`)

---

## 1. 폴더 구조

```
졸업작품/
├─ index.html          ← 홈 (히어로 / 인트로)
├─ story.html          ← 스토리 / 세계관
├─ characters.html     ← 등장인물 / 괴물
├─ media.html          ← 스크린샷 / 트레일러 (라이트박스)
├─ download.html       ← 다운로드 / 권장사양 / 제작팀
├─ README.md           ← 이 문서
└─ assets/
   ├─ css/style.css    ← 전체 디자인 시스템 (색·폰트·효과)
   ├─ js/main.js       ← 인터랙션 (네비·스크롤·라이트박스·커서)
   └─ img/mark.svg     ← 로고/파비콘
```

## 2. 열어보기

- **가장 간단:** `index.html` 파일을 더블클릭 → 브라우저에서 바로 열림.
- **권장(VS Code):** *Live Server* 확장 설치 후 `index.html`에서 우클릭 → *Open with Live Server*.
- 폰트는 Google Fonts를 사용하므로 **인터넷 연결**이 있을 때 디자인이 완전하게 보입니다(오프라인이어도 기본 폰트로 동작).

## 3. 내 게임에 맞게 바꾸기 (커스터마이징)

현재 들어간 게임명/스토리/캐릭터/제작진은 분위기에 맞춰 채워둔 **예시 콘텐츠**입니다. 자유롭게 교체하세요.

| 바꾸고 싶은 것 | 위치 |
| --- | --- |
| 게임 이름 (착호도 / 捉虎圖 / Chakhodo) | 메인 제목은 `index.html`의 `.title-stack`(`.t-kor`·`.t-hanja`·`.t-en`), 로고는 각 `.html`의 `.brand`, 그 외 `<title>` |
| 제목 폰트 | `:root`의 `--f-brush`(붓글씨)·`--f-script`(영문 필기체) |
| 색상 테마 | `assets/css/style.css` 상단 `:root` 변수 (`--blood`, `--seal`, `--bg`, `--text` 등) |
| 스토리·세계관 텍스트 | `story.html` |
| 캐릭터 카드 | `characters.html`의 `.char-card` 블록 (역할·이름·설명) |
| 제작팀 이름 (`○ ○ ○`) | `download.html`의 `.team-grid` |
| 소셜/문의 링크 | 모든 페이지 푸터의 `href="#"`, `download.html`의 `mailto:` |

### 색감만 빠르게 바꾸려면
`assets/css/style.css` 맨 위 `:root`에서 이 값들만 바꿔도 사이트 전체 톤이 바뀝니다.
```css
--bg:    #0a0a0b;   /* 배경 (가장 어두운 색) */
--blood: #8b0000;   /* 사이트 전반 포인트 (핏빛 레드) */
--seal:  #b3261e;   /* 제목 한자/영문 (인주 붉은색) */
--text:  #c9c9cc;   /* 본문 글자색 */
```

## 4. 실제 이미지/영상 넣기

지금은 화면마다 **자리 표시(placeholder) 비주얼**(`.ph`)이 들어가 있습니다. 실제 에셋으로 교체하는 법:

- **스크린샷** (`media.html`): `<div class="shot__img ph" data-label="…"></div>` 를
  `<img class="shot__img" src="assets/img/shot01.jpg" alt="설명">` 으로 교체.
- **캐릭터 아트** (`characters.html`): `.char-portrait.ph` 를 동일하게 `<img>` 로 교체.
- **트레일러** (`media.html`): `.trailer` 블록을 유튜브/비메오 임베드로 교체.
  ```html
  <iframe class="trailer" src="https://www.youtube.com/embed/영상ID"
          title="트레일러" allowfullscreen style="border:0;aspect-ratio:16/9;width:100%"></iframe>
  ```
- 이미지는 `assets/img/` 폴더에 넣어두면 깔끔합니다.

## 5. 인터넷에 올리기 (무료 배포)

이 폴더를 통째로 올리기만 하면 됩니다. 빌드 불필요.

- **Netlify Drop** — <https://app.netlify.com/drop> 에 폴더를 드래그&드롭 → 즉시 URL 발급 (가장 쉬움).
- **GitHub Pages** — 저장소에 올린 뒤 *Settings → Pages*에서 브랜치 지정.
- **Vercel** — 폴더를 import 후 *Other* 프리셋으로 배포.
- **기존 Wix** — Wix는 외부 HTML 통째 업로드가 제한적이라, 위 무료 호스팅 사용을 권장합니다.

## 6. 디자인 노트

- 무드: 심리/폐허 그런지 — 필름 그레인 · 비네트 · 스캔라인 · 타이틀 깜빡임(flicker) · 호버 글리치.
- 폰트: `Black Han Sans`(대형 타이틀) · `Noto Serif KR`(헤드라인) · `Noto Sans KR`(본문) · `Nanum Pen Script`(손글씨 메모) · `Special Elite`(영문 라벨).
- 접근성: `prefers-reduced-motion`을 켠 사용자에게는 깜빡임·그레인 등 강한 모션을 자동으로 끕니다.
- 반응형: 모바일에서 햄버거 메뉴, 그리드 1열 전환 지원.

---

그것은 호랑이가 아니었다. — *착호도 (捉虎圖 · Chakhodo)*
