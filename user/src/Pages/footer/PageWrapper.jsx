function PageWrapper({ title, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 px-6 py-20">
      <div className="max-w-[900px] mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{title}</h1>
        <div className="text-gray-700 leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default PageWrapper;
