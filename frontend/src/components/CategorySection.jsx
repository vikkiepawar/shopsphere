import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Mobiles",
    image:
      "https://cdn-icons-png.flaticon.com/512/545/545245.png",
  },
  {
    title: "Laptops",
    image:
      "https://cdn-icons-png.flaticon.com/512/679/679720.png",
  },
  {
    title: "Headphones",
    image:
      "https://cdn-icons-png.flaticon.com/512/3659/3659898.png",
  },
  {
    title: "Smart Watches",
    image:
      "https://cdn-icons-png.flaticon.com/512/3063/3063822.png",
  },
];

function CategorySection() {
  return (
    <section className="container mx-auto py-14">

      <h2 className="text-4xl font-bold mb-8">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((item) => (
          <CategoryCard
            key={item.title}
            title={item.title}
            image={item.image}
          />
        ))}
      </div>

    </section>
  );
}

export default CategorySection;

