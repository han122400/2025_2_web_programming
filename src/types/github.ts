// src/types/github.ts
export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
}

export interface LanguageStats {
  [language: string]: number // 언어별 바이트 수
}

export interface ProcessedRepo {
  title: string
  description: string
  repo: string
  demo: string | null
  tags: string[]
  stars: number
  language: string | null
  languages: LanguageStats | null // 상세 언어 정보
  updatedAt: string
}
