// src/app/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { fetchGitHubRepos } from '@/lib/github'
import { ProcessedRepo } from '@/types/github'
import { LanguageStats } from '@/components/LanguageStats'
import { OverallLanguageStats } from '@/components/OverallLanguageStats'

const GITHUB_URL = 'https://github.com/han122400' // HanBinPark GitHub 계정
const PORTFOLIO_URL = 'https://your-deployed-service.example.com'
const TEAM_PAGE = '/team-project'

function Header() {
  return (
    <header className="w-full border-b border-[rgba(255,255,255,0.04)] py-4 neon-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[rgba(0,229,255,0.06)] flex items-center justify-center text-[10px] font-bold text-[var(--accent)]">
            G
          </div>
          <div>
            <div className="text-sm font-semibold">박한빈</div>
            <div className="text-xs text-muted">정보보호학과 · 개인발표</div>
          </div>
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded hover:bg-white/3"
          >
            GitHub
          </a>
          <a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded bg-[var(--accent)] text-black font-semibold"
          >
            Live Demo
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-gradient-to-r from-[rgba(0,229,255,0.02)] to-transparent neon-border rounded-2xl p-6 flex flex-col lg:flex-row items-center lg:items-start gap-6 animate-fadeup">
        <div className="flex-1">
          <h1
            className="text-4xl md:text-5xl font-extrabold glow"
            style={{ color: 'var(--accent)' }}
          >
            박한빈 — 포트폴리오
          </h1>
          <p className="mt-3 text-muted max-w-2xl">
            웹서버보안프로그래밍 개인발표용 데모 페이지입니다.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-md bg-[var(--accent)] text-black font-semibold shadow-sm"
            >
              데모 열기
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-md border border-[rgba(255,255,255,0.06)]"
            >
              GitHub
            </a>
            <a
              href={TEAM_PAGE}
              className="px-4 py-2 rounded-md border border-dashed text-sm"
            >
              팀 PPT
            </a>
          </div>
        </div>

        <div className="w-full max-w-xs lg:w-64 p-3 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] animate-float">
          <div className="w-full aspect-[4/3] rounded-lg bg-gradient-to-br from-[rgba(0,229,255,0.06)] to-transparent flex items-center justify-center overflow-hidden">
            <img
              src="/images/me.png"
              alt="박한빈 프로필"
              className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="mt-3 text-xs text-muted leading-relaxed">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[var(--accent)]">📞</span>
              010-9737-1732
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--accent)]">📧</span>
              vinny122400@gmail.com
            </div>
          </div>
          <div
            className="mt-3 text-sm font-semibold"
            style={{ color: 'var(--accent)' }}
          >
            박한빈 — 정보보호학과
          </div>
          <div className="mt-1 text-xs text-muted">
            멋쟁이사자처럼 13기 • Fullstack Developer
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: ProcessedRepo }) {
  return (
    <article className="project-card p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3
              className="font-semibold text-lg"
              style={{ color: 'var(--accent)' }}
            >
              {project.title}
            </h3>
            {project.stars > 0 && (
              <span className="text-xs text-yellow-400">
                ⭐ {project.stars}
              </span>
            )}
          </div>
          <p className="text-sm text-muted mt-1">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t: string) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded bg-[rgba(0,229,255,0.06)] border border-[rgba(0,229,255,0.06)]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* 언어 통계 그래프 */}
          {project.languages && Object.keys(project.languages).length > 0 && (
            <div className="mt-3">
              <div className="text-xs text-muted mb-2">언어 사용 비율:</div>
              <LanguageStats languages={project.languages} maxItems={4} />
            </div>
          )}

          <div className="mt-2 text-xs text-muted">
            마지막 업데이트: {project.updatedAt}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="text-sm px-3 py-1 rounded border border-[rgba(255,255,255,0.04)] hover:bg-white/5"
          >
            Repo
          </a>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="text-sm px-3 py-1 rounded bg-[var(--accent)] text-black hover:bg-[var(--accent)]/80"
            >
              Demo
            </a>
          ) : (
            <span className="text-xs text-muted px-3 py-1 border border-dashed">
              데모 준비중
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Page() {
  const [projects, setProjects] = useState<ProcessedRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true)
        const repos = await fetchGitHubRepos()
        setProjects(repos)
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2
          className="text-2xl font-bold glow"
          style={{ color: 'var(--accent)' }}
        >
          GitHub 프로젝트 목록
        </h2>

        {loading && (
          <div className="mt-4 text-center">
            <div className="animate-pulse text-muted">
              GitHub 레포지토리를 불러오는 중...
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">오류: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="mt-4 text-center text-muted">
            표시할 프로젝트가 없습니다.
          </div>
        )}
      </section>

      {/* 전체 언어 통계 섹션 */}
      {!loading && !error && projects.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <OverallLanguageStats projects={projects} />
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-[rgba(255,107,0,0.05)] to-transparent neon-border rounded-2xl p-8">
          <div className="flex items-center gap-6 mb-6">
            {/* 멋쟁이사자처럼 로고 공간 */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center border border-orange-500/20 overflow-hidden">
              <img
                src="/images/likelion-logo.png"
                alt="멋쟁이사자처럼 로고"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h2
                className="text-2xl font-bold glow"
                style={{ color: '#FF6B00' }}
              >
                멋쟁이사자처럼 13기
              </h2>
              <p className="text-sm text-muted">
                Like Lion 13th - 웹서버보안프로그래밍
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: '#FF6B00' }}
              >
                🎯 활동 내용
              </h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>• 웹 개발 기초부터 심화까지 학습</li>
                <li>• React, Next.js 프론트엔드 개발</li>
                <li>• 백엔드 API 설계 및 구현</li>
                <li>• 팀 프로젝트 및 해커톤 참여</li>
                <li>• GCP, 오라클 등 클라우드 서비스 활용</li>
              </ul>
            </div>

            <div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: '#FF6B00' }}
              >
                🚀 주요 성과
              </h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>• GitHub 포트폴리오 웹사이트 구축</li>
                <li>• 실시간 프로젝트 데이터 연동</li>
                <li>• 반응형 UI/UX 디자인 구현</li>
                <li>• 여러가지 기술 스택 활용</li>
                <li>• 도커를 활용하여 서비스 배포</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-orange-500/10">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted">
                "내 아이디어를 세상에 출시하자" - 멋쟁이사자처럼
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs">
                  Front-end
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs">
                  Back-end
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs">
                  DataBase
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs">
                  Docker
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs">
                  server
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs">
                  React/Next.js
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs">
                  fastapi
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-sm text-muted text-center">
        © {new Date().getFullYear()} 박한빈 — 웹서버보안프로그래밍 개인발표 데모
      </footer>
    </main>
  )
}
