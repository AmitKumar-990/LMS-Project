export default function RoleSelector({ setRole }) {
  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={() => setRole("student")}
        className="flex-1 py-2 border rounded-xl text-gray-700 hover:bg-blue-50 transition"
      >
        Student
      </button>

      <button
        onClick={() => setRole("instructor")}
        className="flex-1 py-2 border rounded-xl text-gray-700 hover:bg-purple-50 transition"
      >
        Instructor
      </button>
    </div>
  );
}
