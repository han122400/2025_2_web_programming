// src/lib/languageColors.ts
export const languageColors: Record<string, string> = {
  // 주요 언어들
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#239120',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Scala: '#c22d40',
  R: '#198CE7',
  MATLAB: '#e16737',

  // 웹 개발
  HTML: '#e34c26',
  CSS: '#1572B6',
  SCSS: '#c6538c',
  Less: '#1d365d',
  Vue: '#4FC08D',
  React: '#61DAFB',
  Angular: '#DD0031',
  Svelte: '#ff3e00',

  // 데이터베이스
  SQL: '#336791',
  MySQL: '#4479A1',
  PostgreSQL: '#336791',
  MongoDB: '#47A248',

  // 마크업/설정
  Markdown: '#083fa1',
  JSON: '#292929',
  YAML: '#cb171e',
  XML: '#0060ac',
  TOML: '#9c4221',

  // 쉘/스크립트
  Shell: '#89e051',
  PowerShell: '#012456',
  Batch: '#C1F12E',
  Dockerfile: '#384d54',

  // 기타
  'Jupyter Notebook': '#DA5B0B',
  Assembly: '#6E4C13',
  Lua: '#000080',
  Perl: '#0298c3',
  Haskell: '#5e5086',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  'F#': '#b845fc',
  OCaml: '#3be133',
  Erlang: '#B83998',
}

export function getLanguageColor(language: string): string {
  return languageColors[language] || '#858585' // 기본 회색
}
