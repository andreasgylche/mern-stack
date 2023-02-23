import React from 'react'
import { useSelector } from 'react-redux'
import Divider from '../../components/Divider'
import Game from '../../components/Game'
import UserImage from '../../components/UserImage'
import { BiUser } from 'react-icons/bi'
import { useContext } from 'react'
import { AuthModalContext } from '../../App'
import { useEffect } from 'react'
import { useState } from 'react'

export default function () {
  const user = useSelector((state) => state.user)
  const [isAuthOpen, setIsAuthOpen] = useContext(AuthModalContext)
  const [randomGreeting, setRandomGreeting] = useState('')

  const followerCount = user?.followers
    ? Object.keys(user.followers).length
    : '0'

  const greetings = [
    'Greetings, traveler',
    'Stay awhile and listen',
    'A new challenger appears!',
    'Hail, fellow adventurer!',
    'Salutations, traveler!',
    'Who goes there?',
  ]

  const getRandomGreeting = () => {
    const randomIndex = Math.floor(Math.random() * greetings.length)
    const randomGreeting = greetings[randomIndex]

    setRandomGreeting(randomGreeting)
  }

  useEffect(() => {
    getRandomGreeting()
  }, [])

  if (!user) {
    return (
      <div className="bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 rounded p-6 h-fit">
        <div className="flex flex-col gap-1">
          <span className="text-base">{randomGreeting}</span>
          <span className="text-sm opacity-70 dark:opacity-40">
            This is the user widget. Here you can see a few stats about your
            account and keep track of your favorite games.
          </span>
        </div>
        <Divider />
        <div className="flex flex-col gap-4">
          <span className="text-sm opacity-70 dark:opacity-40">
            You need to sign in order to these kinds of things though.
          </span>
          <button
            className="flex gap-2 items-center justify-center p-2 dark:text-neutral-900 text-neutral-50 text-sm bg-neutral-900 dark:bg-neutral-50 w-full rounded hover:bg-opacity-75 transition-colors"
            onClick={() => setIsAuthOpen(!isAuthOpen)}
          >
            <BiUser size={16} /> Sign in / Sign up
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 rounded p-6 h-fit">
      <div className="flex items-center gap-2">
        <UserImage
          size={48}
          image={user.picturePath}
          username={user.username}
        />
        <div className="flex flex-col">
          <span className="text-base">{user.username}</span>
          <span className="text-sm opacity-70 dark:opacity-40">
            {followerCount} followers
          </span>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-xs opacity-70 dark:opacity-40">
            People who loved your content
          </span>
          <span className="text-xs">{user.totalLikes}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs opacity-70 dark:opacity-40">
            Content you have uploaded
          </span>
          <span className="text-xs">{user.totalPosts}</span>
        </div>
      </div>
      <Divider />
      <div>
        <span className="text-sm">Favorite games</span>
        <div>
          {user.games ? (
            <span className="text-sm opacity-70 dark:opacity-40">
              No favorite games yet.
            </span>
          ) : (
            user.games.map((game) => <Game game={game.game} />)
          )}
        </div>
      </div>
    </div>
  )
}
