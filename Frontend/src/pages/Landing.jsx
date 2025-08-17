export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to Global Connect</h1>
      <p className="text-lg mb-6">
        A place to connect, share, and learn with people around the world.
      </p>
      <div className="flex gap-4">
        <a
          href="/login"
          className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-gray-200"
        >
          Login
        </a>
        <a
          href="/signup"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
}
