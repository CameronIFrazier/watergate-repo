export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    // Background overlay (click to close)
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-300 bg-black/40 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={closeSidebar}
    >
      {/* Sidebar container */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button
          onClick={closeSidebar}
          className="text-right w-full mb-4 text-gray-300 hover:text-white"
        >
          ✕
        </button>
        <ul className="space-y-4">
          <li className="hover:text-gray-400 cursor-pointer">Dashboard</li>
          <li className="hover:text-gray-400 cursor-pointer">Settings</li>
          <li className="hover:text-gray-400 cursor-pointer">Profile</li>
        </ul>
      </div>
    </div>
  );
}
