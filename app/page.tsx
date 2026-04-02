import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center text-center flex-1 bg-gradient-to-b from-blue-1000 via-blue-900 to-indigo-800 p-8">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-white mb-6">
        Welcome to OSC Documentation
      </h1>

      {/* Description */}
      <p className="text-lg text-white mb-8">
        Explore our detailed One Stop Centre (OSC) Licensing ERP system. Click below to get started with the documentation.
      </p>

      {/* Link to OSC Documentation */}
      <Link href="/docs" className="bg-indigo-700 text-white text-lg px-6 py-3 rounded-full hover:bg-indigo-800 transition-all duration-300 hover:scale-110">
        Go to OSC Docs
      </Link>
    </div>
  );
}
