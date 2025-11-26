export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
  return (
    <div className="flex justify-center mt-10 gap-2">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-4 py-2 border rounded-lg 
            ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
