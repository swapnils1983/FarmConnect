import { Bell, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6">
      <div className="flex-1" />
      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <User className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
