import { HashLoader } from 'react-spinners'
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="flex flex-col items-center justify-center text-center gap-6">
        <HashLoader color="#8a46ff" />
        <p className="text-2xl">Please wait...</p>
      </div>
    </div>
  )
}

export default Loader
