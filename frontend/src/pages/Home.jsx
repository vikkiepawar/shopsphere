import { useEffect, useState } from "react";
import API from "../services/api";
import ProductGrid from "../components/ProductGrid";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl px-6 py-10 md:px-12 md:py-14 text-white mb-12 overflow-hidden">
        <div className="max-w-3xl">
          <p className="uppercase tracking-widest text-blue-200 text-sm font-semibold">
            Welcome to ShopSphere
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 leading-tight">
            Everything you need,
            <br />
            all in one place.
          </h1>

          <p className="mt-5 text-blue-100 text-base md:text-lg max-w-xl">
            Discover quality products at prices you'll love.
          </p>

          <a
            href="#products"
            className="inline-block mt-7 bg-blue-500 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-400 shadow-lg"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Shop by Category
        </h2>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories
            .filter((item) => item !== "All")
            .map((item) => (
              <button
                key={item}
                onClick={() => {
                  setCategory(item);
                  setCurrentPage(1);
                }}
                className={`px-5 py-3 rounded-xl whitespace-nowrap border ${
                  category === item
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white hover:border-blue-500"
                }`}
              >
                {item}
              </button>
            ))}
        </div>
      </section>

      {/* Products */}
      <section id="products">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold">
              Featured Products
            </h2>

            {!loading && (
              <p className="text-gray-500 mt-1">
                {filteredProducts.length} products available
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-xl px-4 py-2 w-40 md:w-56"
            />

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-xl px-3 py-2"
            >
              <option value="default">Sort</option>
              <option value="low">Price: Low</option>
              <option value="high">Price: High</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Loading products...
          </div>
        ) : currentProducts.length > 0 ? (
          <>
            <ProductGrid products={currentProducts} />

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage(currentPage - 1)
                  }
                  className="px-4 py-2 border rounded-lg disabled:opacity-40"
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setCurrentPage(index + 1)
                      }
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === index + 1
                          ? "bg-blue-600 text-white"
                          : "border"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage(currentPage + 1)
                  }
                  className="px-4 py-2 border rounded-lg disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">
              No products found
            </h2>

            <p className="text-gray-500 mt-2">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSort("default");
                setCurrentPage(1);
              }}
              className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
