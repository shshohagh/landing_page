import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            alt="Hero"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
              Elevate Your <span className="text-indigo-400">Lifestyle</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Discover our curated collection of premium essentials designed for the modern individual. Quality meets style in every piece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#products"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/25"
              >
                Shop Collection
                <ShoppingBag className="ml-2 h-5 w-5" />
              </a>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-bold rounded-full text-white hover:bg-white hover:text-gray-900 transition-all duration-300">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Collection</h2>
            <p className="text-gray-500">Handpicked items just for you.</p>
          </div>
          <button className="hidden sm:flex items-center text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
            View All <ChevronRight className="ml-1 h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay in the Loop</h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and get 10% off your first order. Be the first to know about new arrivals and exclusive offers.
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 text-white placeholder-indigo-200 border border-white/20"
            />
            <button className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-full hover:bg-indigo-50 transition-colors">
              Join
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
