import { useNavigate } from 'react-router-dom'
import UserMenu from '../../components/UserMenu'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-center w-full h-20 bg bg-neutral-50 dark:bg-neutral-800 px-4">
      <span
        className="font-bold text-xl lg:text-2xl hover:cursor-pointer text-neutral-800 dark:text-neutral-50"
        onClick={() => navigate('/')}
      >
        gametalk
      </span>
      <UserMenu />
    </div>
  )
}
