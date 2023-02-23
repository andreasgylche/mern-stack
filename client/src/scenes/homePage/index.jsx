import { useSelector } from 'react-redux'
import Navbar from '../navbar'
import PostsWidget from '../widgets/PostsWidget'
import UserWidget from '../widgets/UserWidget'
import Form from './Form'

export default function HomePage() {
  return (
    <div className="w-full">
      <Navbar />
      <main className="w-full h-screen lg:grid lg:grid-cols-[288px_1fr] gap-6 px-4 mt-12">
        <UserWidget />

        <div className="flex flex-col items-center">
          <Form />
          <PostsWidget />
        </div>
      </main>
    </div>
  )
}
