export default function Footer() {
  return (
    <footer className="bg-white py-10 px-10 mt-10 shadow-inner">
      <div className="flex flex-col md:flex-row justify-between items-center">

        <div className="flex items-center gap-2">
          <img src="/src/assets/logo.png" className="w-8" alt="logo" />
          <h1 className="text-2xl font-bold text-blue-700">Get-Skillz</h1>
        </div>

        <div className="flex gap-8 mt-6 md:mt-0 text-gray-600">
          <a href="#" className="hover:text-blue-600">About Us</a>
          <a href="#" className="hover:text-blue-600">Privacy</a>
          <a href="#" className="hover:text-blue-600">Terms</a>
        </div>
      </div>
    </footer>
  );
}
