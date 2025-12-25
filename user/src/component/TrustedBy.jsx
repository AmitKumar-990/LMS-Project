export default function TrustedBy() {
  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10">
          Learn from <span className="text-blue-600">350+</span> top universities and companies
        </h2>

        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-10 opacity-100">
          <img src="/src/assets/logos/CU.png" alt="Chandigarh University" className="h-20" />
          <img src="/src/assets/logos/Duke.png" alt="Duke" className="h-20" />
          <img src="/src/assets/logos/Antier.jpg" alt="Antier Solution" className="h-20" />
          <img src="/src/assets/logos/google.png" alt="Google" className="h-10" />
          <img src="/src/assets/logos/microsoft.jpg" alt="Microsoft" className="h-20" />
          <img src="/src/assets/logos/IBM.png" alt="IBM" className="h-20" />
          <img src="/src/assets/logos/ASB.png" alt="ASB Acadmy" className="h-20" />
        </div>

      </div>
    </section>
  );
}
