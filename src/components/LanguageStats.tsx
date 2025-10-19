// src/components/LanguageStats.tsx
import React from 'react'
import { LanguageStats as LanguageStatsType } from '@/types/github'
import { getLanguageColor } from '@/lib/languageColors'

interface LanguageStatsProps {
  languages: LanguageStatsType
  maxItems?: number
}

export function LanguageStats({ languages, maxItems = 5 }: LanguageStatsProps) {
  const total = Object.values(languages).reduce((a, b) => a + b, 0)
  const sortedLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxItems)

  return (
    <div className="space-y-3">
      {/* 그래프 바 */}
      <div className="flex h-2 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
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

      {/* 언어 리스트 */}
      <div className="flex flex-wrap gap-2">
        {sortedLanguages.map(([lang, bytes]) => {
          const percentage = (bytes / total) * 100
          const color = getLanguageColor(lang)
          return (
            <div key={lang} className="flex items-center gap-1.5 text-xs">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-muted">
                {lang} {percentage.toFixed(1)}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
