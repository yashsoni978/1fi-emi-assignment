import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedEmi, setSelectedEmi] = useState(null);
  const [proceeded, setProceeded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();

        setProduct(data);
        setSelectedVariant(data.variants[0]);
        setSelectedEmi(data.variants[0].emiPlans[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedEmi(variant.emiPlans[0]);
    setProceeded(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="h-5 w-32 rounded bg-gray-200 animate-pulse" />

          <div className="mt-6 bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-[460px] bg-gray-200 animate-pulse" />

              <div className="p-8 lg:p-12">
                <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />

                <div className="mt-4 h-10 w-64 rounded bg-gray-200 animate-pulse" />

                <div className="mt-4 h-5 w-80 max-w-full rounded bg-gray-200 animate-pulse" />

                <div className="mt-8 h-10 w-40 rounded bg-gray-200 animate-pulse" />

                <div className="mt-8 h-6 w-24 rounded bg-gray-200 animate-pulse" />

                <div className="mt-4 flex gap-3">
                  <div className="h-12 w-24 rounded-xl bg-gray-200 animate-pulse" />
                  <div className="h-12 w-24 rounded-xl bg-gray-200 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 p-8 lg:p-12">
              <div className="h-7 w-56 rounded bg-gray-200 animate-pulse" />

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-56 rounded-2xl bg-gray-200 animate-pulse" />
                <div className="h-56 rounded-2xl bg-gray-200 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!product || !selectedVariant) {
    return null;
  }

  const discount = selectedVariant.mrp - selectedVariant.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <header className="mb-6 flex items-center justify-between border-b border-gray-200 pb-5">
          <Link
            to="/products"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            1Fi
          </Link>

          <span className="text-sm text-gray-500">EMI Store</span>
        </header>
        {/* Back */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition"
        >
          ← Back to Products
        </Link>

        {/* Main Product Card */}
        <div className="mt-6 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Product Image */}
            <div className="bg-gray-50 min-h-[460px] flex items-center justify-center p-10">
              <img
                src={selectedVariant.image}
                alt={product.name}
                className="max-h-[360px] max-w-[280px] object-contain"
              />
            </div>

            {/* Product Information */}
            <div className="p-8 lg:p-12">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Smartphone
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <p className="mt-3 text-gray-500">
                Select your preferred storage variant and EMI plan.
              </p>

              {/* Price */}
              <div className="mt-8">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{selectedVariant.price.toLocaleString("en-IN")}
                  </span>

                  <span className="text-lg text-gray-400 line-through">
                    ₹{selectedVariant.mrp.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="mt-2 inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                  Save ₹{discount.toLocaleString("en-IN")}
                </div>
              </div>

              {/* Variant */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">Storage</h2>

                  <span className="text-sm text-gray-400">
                    {product.variants.length} options
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-3">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant.name === variant.name;

                    return (
                      <button
                        key={variant.name}
                        onClick={() => handleVariantChange(variant)}
                        className={`rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                          isSelected
                            ? "border-black bg-black text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
                        }`}
                      >
                        {variant.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* EMI Section */}
          <div className="border-t border-gray-200 p-8 lg:p-12">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Flexible payment
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Choose your EMI plan
              </h2>

              <p className="mt-2 text-gray-500">
                Select the plan that works best for you.
              </p>
            </div>

            {/* EMI Cards */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedVariant.emiPlans.map((emi, index) => {
                const isSelected = selectedEmi === emi;

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedEmi(emi)}
                    className={`relative text-left rounded-2xl border-2 p-6 transition duration-200 ${
                      isSelected
                        ? "border-black bg-gray-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-400"
                    }`}
                  >
                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="absolute top-5 right-5 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-xs">
                        ✓
                      </div>
                    )}

                    <p className="text-sm text-gray-500">Monthly payment</p>

                    <p className="mt-1 text-3xl font-bold text-gray-900">
                      ₹{emi.monthlyPayment.toLocaleString("en-IN")}
                      <span className="text-sm font-normal text-gray-500">
                        {" "}
                        / month
                      </span>
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Tenure</p>

                        <p className="mt-1 font-semibold text-gray-900">
                          {emi.tenure} months
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Interest</p>

                        <p className="mt-1 font-semibold text-gray-900">
                          {emi.interestRate}% p.a.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Cashback</p>
                          <p className="mt-1 font-semibold text-green-600">
                            ₹{emi.cashback.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            Total EMI payable
                          </p>
                          <p className="mt-1 font-semibold text-gray-900">
                            ₹
                            {(emi.monthlyPayment * emi.tenure).toLocaleString(
                              "en-IN",
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected EMI Summary */}
            {selectedEmi && (
              <div className="mt-6 rounded-2xl bg-gray-900 p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  <div>
                    <p className="text-sm text-gray-400">Your selected plan</p>

                    <p className="mt-1 text-xl font-semibold">
                      ₹{selectedEmi.monthlyPayment.toLocaleString("en-IN")} ×{" "}
                      {selectedEmi.tenure} months
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      {selectedEmi.interestRate}% interest • ₹
                      {selectedEmi.cashback.toLocaleString("en-IN")} cashback
                    </p>
                  </div>

                  <button
                    onClick={() => setProceeded(true)}
                    className="rounded-xl bg-white px-8 py-3 font-semibold text-gray-900 hover:bg-gray-100 transition"
                  >
                    Proceed with EMI →
                  </button>
                </div>
              </div>
            )}
            {proceeded && (
              <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-5">
                <p className="font-semibold text-green-800">
                  EMI plan selected successfully!
                </p>

                <p className="mt-1 text-sm text-green-700">
                  {product.name} • {selectedVariant.name} • {selectedEmi.tenure}{" "}
                  months
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
