import pressRelease from "../assets/pressRelease.webp";
import pressRelease2 from "../assets/pressRelease2.webp";
import pressRelease3 from "../assets/pressRelease3.webp";

export default function PressRelease() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="relative h-64 w-full bg-gray-900 overflow-hidden">
        <div className="flex h-full w-full">
          <img
            src={pressRelease3}
            alt="Press release 1"
            className="w-1/3 h-full object-cover opacity-50"
          />
          <img
            src={pressRelease2}
            alt="Press release 2"
            className="w-1/3 h-full object-cover opacity-50"
          />
          <img
            src={pressRelease}
            alt="Press release 3"
            className="w-1/3 h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center drop-shadow-lg">
            PRESS RELEASE
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 px-6 py-16 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No press releases"
          className="w-40 mb-6 opacity-80"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          No Press Releases Yet
        </h2>
        <p className="text-gray-600 max-w-lg mb-6">
          We haven’t published any press releases yet. Stay tuned for our upcoming
          updates and announcements.
        </p>
      </div>
    </div>
  );
}
