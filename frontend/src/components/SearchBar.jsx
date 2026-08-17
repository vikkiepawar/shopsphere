import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative max-w-3xl mx-auto mt-10">

      <Search
        className="absolute left-5 top-4 text-gray-400"
        size={22}
      />

      <input
        type="text"
        placeholder="Search for Mobiles, Laptops, Headphones..."
        className="w-full bg-white rounded-full py-4 pl-14 pr-5 shadow-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}

export default SearchBar;
