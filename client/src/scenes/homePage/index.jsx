import { useSelector } from 'react-redux'
import Navbar from '../navbar'
import Posts from '../widgets/Posts'
import Form from './Form'

export default function HomePage() {
  const { _id } = useSelector((state) => state.user)

  return (
    <div className="w-full">
      <Navbar />
      <main className="flex flex-col items-center w-full h-screen">
        <h1 className="block text-lg font-semibold my-4">Create a post</h1>
        <Form />
        <Posts userId={_id} />
      </main>
    </div>
  )
}
