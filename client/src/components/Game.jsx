import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Game({ game }) {
  const navigate = useNavigate()

  return (
    <span
      className="bg-neutral-200 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 rounded-lg p-2 text-xs hover:cursor-pointer hover:bg-opacity-50"
      onClick={() => navigate(`g/${game}`)}
    >
      g/{game}
    </span>
  )
}
