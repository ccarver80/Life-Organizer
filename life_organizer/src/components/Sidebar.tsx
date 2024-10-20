import Link from "next/link";

export default function Sidebar() {
  return (
    <>
      <div className="flex flex-col w-56 border-r border-gray-300">
        {/* Dropdown Menu */}
        <button className="relative text-sm focus:outline-none group">
          <div className="flex items-center justify-between w-full h-16 px-4 border-b border-gray-300 hover:bg-gray-300">
            <span className="font-medium">Dropdown</span>
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="absolute z-10 flex-col items-start hidden w-full pb-1 bg-white shadow-lg group-focus:flex">
            <Link
              className="w-full px-4 py-2 text-left hover:bg-gray-300"
              href="#"
            >
              Menu Item 1
            </Link>
            <Link
              className="w-full px-4 py-2 text-left hover:bg-gray-300"
              href="#"
            >
              Menu Item 1
            </Link>
            <Link
              className="w-full px-4 py-2 text-left hover:bg-gray-300"
              href="#"
            >
              Menu Item 1
            </Link>
          </div>
        </button>
        <div className="flex flex-col gap-y-10 mt-10 flex-grow p-4 overflow-auto">
          <Link
            className="flex items-center flex-shrink-0 h-10 px-2 gap-4 text-2xl font-medium rounded hover:bg-gray-300"
            href="/dashboard"
          >
            <svg
              className="w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>

            <span className="leading-none">Dashboard</span>
          </Link>

          <Link
            className="flex items-center flex-shrink-0 h-10 px-2 gap-4 text-2xl font-medium rounded hover:bg-gray-300"
            href="/dashboard/recipes"
          >
            <svg
              className="w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>

            <span className="leading-none">Recipes</span>
          </Link>

          <Link
            className="flex items-center flex-shrink-0 h-10 px-2 gap-4 text-2xl font-medium rounded hover:bg-gray-300"
            href="/dashboard/"
          >
            <svg
              className="w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>

            <span className="leading-none">Testing</span>
          </Link>
        </div>
      </div>
    </>
  );
}
