// src/components/OverallLanguageStats.tsx
import React from 'react'
import {
  ProcessedRepo,
  LanguageStats as LanguageStatsType,
} from '@/types/github'
import { getLanguageColor } from '@/lib/languageColors'

interface OverallLanguageStatsProps {
  projects: ProcessedRepo[]
}

export function OverallLanguageStats({ projects }: OverallLanguageStatsProps) {
  // 모든 프로젝트의 언어 통계를 합산
  const overallStats: LanguageStatsType = {}

  projects.forEach((project) => {
    if (project.languages) {
      Object.entries(project.languages).forEach(([lang, bytes]) => {
        overallStats[lang] = (overallStats[lang] || 0) + bytes
      })
    }
  })

  if (Object.keys(overallStats).length === 0) {
    return null
  }

  const total = Object.values(overallStats).reduce((a, b) => a + b, 0)
  const sortedLanguages = Object.entries(overallStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8) // 상위 8개 언어

  return (
    <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] rounded-xl p-6">
      <h3
        className="text-lg font-semibold mb-4"
        style={{ color: 'var(--accent)' }}
      >
        전체 프로젝트 언어 통계
      </h3>

      {/* 메인 그래프 바 */}
      <div className="flex h-3 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden mb-4">
        {sortedLanguages.map(([lang, bytes]) => {
          const percentage = (bytes / total) * 100
          const color = getLanguageColor(lang)
          return (
            <div
              key={lang}
              className="h-full transition-all duration-300 hover:opacity-80"
              style={{
                width: `${percentage}%`,
                backgroundColor: color,
              }}
              title={`${lang}: ${percentage.toFixed(1)}%`}
            />
          )
        })}
      </div>

      {/* 언어별 상세 정보 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sortedLanguages.map(([lang, bytes]) => {
          const percentage = (bytes / total) * 100
          const color = getLanguageColor(lang)
          return (
            <div
              key={lang}
              className="flex items-center gap-2 p-2 rounded-lg bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{lang}</div>
                <div className="text-xs text-muted">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
