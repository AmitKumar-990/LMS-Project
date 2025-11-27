export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-10 py-4 bg-white shadow-sm fixed top-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/src/assets/logo.png" className="w-8" alt="Logo" />
        <h1 className="text-2xl font-bold text-blue-700">Get-Skillz</h1>
      </div>

      <div className="hidden md:flex gap-8 text-gray-600 font-medium">
        <a href="/Home" className="hover:text-blue-600">Home</a>
        <a href="#courses" className="hover:text-blue-600">Courses</a>
        <a href="#instructors" className="hover:text-blue-600">I</a>
        <a href="#mylearning" className="hover:text-blue-600">My Learning</a>
      </div>

      <a
        href="/register"
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        SignOut
      </a>
    </nav>
  );
}
