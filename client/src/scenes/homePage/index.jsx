import Navbar from '../navbar'
import PostsWidget from '../widgets/PostsWidget'
import UserWidget from '../widgets/UserWidget'

export default function HomePage() {
  return (
    <div className="w-full">
      <Navbar />
      <main className="w-full h-screen lg:grid lg:grid-cols-[288px_1fr] max-[1440px]:px-6 gap-6 mt-12">
        <UserWidget />

        <div className="flex flex-col items-center">
          <PostsWidget />
        </div>
      </main>
    </div>
  )
}
