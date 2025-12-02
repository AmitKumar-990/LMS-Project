export default function InstructorTopbar() {
  return (
    <div className="w-full bg-white shadow px-8 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">Instructor Dashboard</h2>
      <div className="flex items-center gap-4">
        <p className="text-gray-600">Hello, Instructor 👋</p>
        <img src="https://i.pravatar.cc/40" className="w-10 h-10 rounded-full" />
        
      </div>
    </div>
  );
}
