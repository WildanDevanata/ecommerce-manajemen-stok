import { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  iconBgColor: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
}

export default function StatsCard({
  title,
  value,
  icon,
  iconBgColor,
  change,
  changeType = 'neutral',
}: StatsCardProps) {
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600',
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          {change && (
            <p className={`text-sm font-medium ${changeColors[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`${iconBgColor} p-3 rounded-xl`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
