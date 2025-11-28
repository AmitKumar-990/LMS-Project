export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-10 py-4 bg-white shadow-sm fixed top-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/src/assets/logo.png" className="w-8" alt="Logo" />
        <h1 className="text-2xl font-bold text-blue-700">Get-Skillz</h1>
      </div>
    </nav>
  );
}
