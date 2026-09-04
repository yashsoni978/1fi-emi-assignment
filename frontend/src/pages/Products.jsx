import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
            <div className="mt-4 h-10 w-72 rounded bg-gray-200 animate-pulse" />
            <div className="mt-4 h-5 w-96 max-w-full rounded bg-gray-200 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <div className="h-64 bg-gray-200 animate-pulse" />

                <div className="p-6">
                  <div className="h-6 w-40 rounded bg-gray-200 animate-pulse" />
                  <div className="mt-4 h-4 w-24 rounded bg-gray-200 animate-pulse" />
                  <div className="mt-2 h-8 w-32 rounded bg-gray-200 animate-pulse" />
                  <div className="mt-6 h-12 w-full rounded-xl bg-gray-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md w-full rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            !
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            Unable to load products
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            We couldn't connect to the product service. Please try again.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <header className="mb-10 flex items-center justify-between border-b border-gray-200 pb-5">
        <Link
          to="/products"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          1Fi
        </Link>

        <span className="text-sm text-gray-500">EMI Store</span>
      </header>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            1Fi Store
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
            Shop Smartphones
          </h1>

          <p className="mt-3 text-gray-500 max-w-xl">
            Choose your smartphone and pay with flexible EMI plans backed by
            mutual funds.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const firstVariant = product.variants[0];

            return (
              <div
                key={product._id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition duration-200"
              >
                {/* Product Image */}
                <div className="h-64 bg-gray-100 flex items-center justify-center p-8">
                  <img
                    src={firstVariant.image}
                    alt={product.name}
                    className="h-48 w-48 object-contain"
                  />
                </div>

                {/* Product Information */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">Starting from</p>

                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{firstVariant.price.toLocaleString("en-IN")}
                    </span>

                    <span className="text-sm text-gray-400 line-through">
                      ₹{firstVariant.mrp.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Variant count */}
                  <p className="mt-3 text-sm text-gray-500">
                    {product.variants.length} variants available
                  </p>

                  {/* Button */}
                  <Link
                    to={`/products/${product._id}`}
                    className="mt-6 block w-full rounded-xl bg-black px-4 py-3 text-center font-semibold text-white hover:bg-gray-800 transition duration-200"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
