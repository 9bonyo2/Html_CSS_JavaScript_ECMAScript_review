/* ===== 9장. Vite 로 개발 환경 만들기 =====

   Vite 프로젝트는 Node.js 가 필요하므로 이 페이지에서 실행할 수 없습니다.
   대신 Vite 가 쓰는 import.meta 가 브라우저 표준의 일부라는 것만 확인합니다.

   이 파일도 type="module" 로 불러옵니다.
   import.meta 는 모듈 안에서만 쓸 수 있습니다.
*/

out("=== import.meta 는 브라우저 표준입니다 ===");
out("import.meta.url =", import.meta.url);
out("→ 지금 이 모듈 파일의 주소입니다.");
out("");

out("=== import.meta.env 는 Vite 가 채워 넣는 값입니다 ===");
out("import.meta.env =", import.meta.env);
out("→ undefined. 브라우저가 아니라 Vite 가 빌드할 때 넣어 주는 값이기 때문입니다.");
out("");
out("Vite 프로젝트 안에서라면 아래처럼 나옵니다.");
out("  import.meta.env.VITE_API_URL  →  http://localhost:8080/api");
out("  import.meta.env.MODE          →  development");
out("  import.meta.env.DEV           →  true");
out("");
out("직접 확인하려면 터미널에서 npm create vite@latest 로 프로젝트를 만든 뒤");
out(".env.development 파일을 추가하고 npm run dev 로 실행해 보세요.");
