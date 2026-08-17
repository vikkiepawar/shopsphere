import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 rounded-3xl overflow-hidden">
      <div className="container mx-auto px-8 py-20 flex flex-col lg:flex-row items-center justify-between">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm">
            🔥 New Collection 2026
          </span>

          <h1 className="text-6xl font-extrabold text-white mt-6 leading-tight">
            Upgrade
            <br />
            Your Lifestyle
          </h1>

          <p className="mt-6 text-blue-100 text-lg">
            Discover premium electronics with amazing offers,
            fast delivery and secure payments.
          </p>

          <div className="flex gap-4 mt-10">

            <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 duration-300">

              Shop Now

              <ArrowRight size={18} />

            </button>

            <button className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 duration-300">

              Explore

            </button>

          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa?w=700"
            alt="hero"
            className="w-[500px] rounded-3xl shadow-2xl"
          />

        </motion.div>

      </div>
    </section>
  );
}

export default Hero;
