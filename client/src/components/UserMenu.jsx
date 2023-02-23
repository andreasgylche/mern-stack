import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserImage from './UserImage'
import { BiUser, BiCog, BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { setLogout } from '../state'
import { useContext } from 'react'
import { AuthModalContext } from '../App'

export default function UserMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [isAuthOpen, setIsAuthOpen] = useContext(AuthModalContext)

  if (!user) {
    return (
      <button
        className="flex gap-2 items-center text-neutral-900 dark:text-neutral-50 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 p-2 rounded-lg"
        onClick={() => setIsAuthOpen(true)}
      >
        <BiUser size={16} /> Sign in / Sign up
      </button>
    )
  }

  return (
    <Menu
      as="div"
      className="relative inline-block text-neutral-900 dark:text-neutral-50"
    >
      <div>
        <Menu.Button className="flex gap-2 items-center hover:bg-neutral-100 justify-center rounded-lg p-2 text-sm dark:hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-opacity-75 text-neutral-900 dark:text-neutral-50">
          {user.username}
          <UserImage
            size={32}
            image={user.picturePath}
            username={user.username}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-neutral-800 divide-opacity-10 dark:divide-neutral-900 rounded-lg bg-neutral-50 dark:bg-neutral-800 shadow-lg ring-1 ring-neutral-900 dark:ring-neutral-50 ring-opacity-10 dark:ring-opacity-20 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              <button
                className="group flex gap-2 w-full items-center rounded-md p-2 text-sm dark:hover:bg-neutral-900 hover:bg-[#f0f0f0]"
                onClick={() => navigate(`/u/${user._id}`)}
              >
                <BiUser size={16} />
                Profile
              </button>
            </Menu.Item>
            <Menu.Item>
              <button className="group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm dark:hover:bg-neutral-900 hover:bg-[#f0f0f0]">
                <BiCog size={16} />
                Settings
              </button>
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              <button
                className="group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm dark:hover:bg-neutral-900 hover:bg-[#f0f0f0] hover:text-red-500"
                onClick={() => {
                  dispatch(setLogout())
                  navigate('/')
                }}
              >
                <BiLogOut size={16} />
                Log out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
