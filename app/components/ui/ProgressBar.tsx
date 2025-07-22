'use client'

interface ProgressBarProps {
  progress: number
  className?: string
}

export function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  return (
    <div className={`progress-bar ${className}`}>
      <div 
        className="progress-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}