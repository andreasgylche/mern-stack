import Navbar from '../navbar'
import Form from './Form'

export default function HomePage() {
  return (
    <div className="w-full">
      <Navbar />
      <main className="flex flex-col items-center w-full h-screen">
        <h1 className="block text-lg font-semibold my-4">Create a post</h1>
        <Form />
      </main>
    </div>
  )
}
