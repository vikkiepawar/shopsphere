import { motion } from "framer-motion";

function CategoryCard({ title, image }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer p-6 text-center"
    >
      <img
        src={image}
        alt={title}
        className="h-24 mx-auto object-contain"
      />

      <h3 className="mt-5 text-lg font-semibold">
        {title}
      </h3>
    </motion.div>
  );
}

export default CategoryCard;
