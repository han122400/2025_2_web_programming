// src/lib/github.ts
import { GitHubRepo, ProcessedRepo, LanguageStats } from '@/types/github'

const GITHUB_USERNAME = 'han122400' // HanBinPark GitHub 계정
const GITHUB_API_URL = 'https://api.github.com'

// GitHub Personal Access Token (rate limit 증가용)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

// 저장소의 언어 사용 통계를 가져오는 함수
async function fetchRepoLanguages(
  repoFullName: string
): Promise<LanguageStats | null> {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    }

    if (GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${GITHUB_TOKEN}`
    }

    const response = await fetch(
      `${GITHUB_API_URL}/repos/${repoFullName}/languages`,
      { headers }
    )

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error(`언어 정보 조회 실패 (${repoFullName}):`, error)
    return null
  }
}

export async function fetchGitHubRepos(): Promise<ProcessedRepo[]> {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    }

    // 토큰이 있다면 추가 (rate limit 증가: 60회/시간 → 5000회/시간)
    if (GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${GITHUB_TOKEN}`
    }

    const response = await fetch(
      `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
      {
        headers,
        next: { revalidate: 3600 }, // 1시간마다 재검증
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API 오류: ${response.status}`)
    }

    const repos: GitHubRepo[] = await response.json()

    // 포크된 레포지토리나 특정 레포지토리는 제외
    const filteredRepos = repos.filter(
      (repo) =>
        !repo.full_name.includes('fork') &&
        !repo.name.startsWith('.') &&
        repo.description // 설명이 있는 레포지토리만
    )

    // 각 저장소의 언어 정보를 병렬로 가져오기
    const reposWithLanguages = await Promise.all(
      filteredRepos.map(async (repo) => {
        const languages = await fetchRepoLanguages(repo.full_name)

        return {
          title: formatRepoName(repo.name),
          description: repo.description || '프로젝트 설명이 없습니다.',
          repo: repo.html_url,
          demo: repo.homepage || getManualDemoUrl(repo.name),
          tags: getEnhancedTags(repo, languages),
          stars: repo.stargazers_count,
          language: repo.language,
          languages,
          updatedAt: new Date(repo.updated_at).toLocaleDateString('ko-KR'),
        }
      })
    )

    return reposWithLanguages
  } catch (error) {
    console.error('GitHub 레포지토리 조회 실패:', error)
    return getFallbackRepos()
  }
}

function formatRepoName(name: string): string {
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// 수동으로 데모 URL을 매핑하는 함수 (GitHub Homepage가 없는 경우)
function getManualDemoUrl(repoName: string): string | null {
  const demoUrls: Record<string, string> = {
    // 예시: 저장소 이름과 데모 URL을 매핑
    // 'my-portfolio': 'https://my-portfolio.vercel.app',
    // 'react-todo-app': 'https://react-todo-app.netlify.app',
    // 'next-blog': 'https://next-blog.vercel.app',
  }

  return demoUrls[repoName] || null
}

// 언어 정보를 기반으로 향상된 태그를 생성하는 함수
function getEnhancedTags(
  repo: GitHubRepo,
  languages: LanguageStats | null
): string[] {
  // topics가 있으면 우선 사용
  if (repo.topics?.length > 0) {
    return repo.topics
  }

  // 언어 정보가 있으면 사용량 기준으로 상위 3개 선택
  if (languages) {
    const sortedLanguages = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([lang]) => lang)

    if (sortedLanguages.length > 0) {
      return sortedLanguages
    }
  }

  // 기본값으로 주 언어 사용
  return repo.language ? [repo.language] : ['기타']
}

// API 실패 시 대체 데이터
function getFallbackRepos(): ProcessedRepo[] {
  return [
    {
      title: 'Portfolio Website',
      description: 'Next.js + Tailwind CSS로 만든 포트폴리오 웹사이트',
      repo: `https://github.com/${GITHUB_USERNAME}/portfolio`,
      demo: null,
      tags: ['Next.js', 'TypeScript', 'Tailwind'],
      stars: 0,
      language: 'TypeScript',
      languages: {
        TypeScript: 50000,
        CSS: 15000,
        JavaScript: 10000,
      },
      updatedAt: new Date().toLocaleDateString('ko-KR'),
    },
  ]
}
