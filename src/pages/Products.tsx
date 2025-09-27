import { ProductCarousel } from "../components/ProductsCarousel";

export const Products = () => {
  const breads = [
    {
      id: 1,
      name: "Multigrain Bread",
      category: "Bread",
      price: 50,
      image: "/Products/Bread/MultiGrain.png",
    },
    {
      id: 2,
      name: "Brown Bread",
      category: "Bread",
      price: 40,
      image: "/Products/Bread/Brown.png",
    },
    {
      id: 3,
      name: "Normal Bread",
      category: "Bread",
      price: 30,
      image: "/Products/Bread/normal.png",
    },
    {
      id: 4,
      name: "Sandwich Bread",
      category: "Bread",
      price: 50,
      image: "/Products/Bread/Sandwich.png",
    },
    {
      id: 5,
      name: "Croissant",
      category: "Bread",
      price: 50,
      image: "/Products/Bread/Crossiant.png",
    },
  ];

  const cakes = [
    {
      id: 6,
      name: "Chocolate Pastry",
      category: "Cake",
      price: 70,
      image: "/Products/Cakes/Chocolate.png",
    },
    {
      id: 7,
      name: "Vanilla Pastry",
      category: "Cake",
      price: 60,
      image: "/Products/Cakes/Vanilla.png",
    },
    {
      id: 8,
      name: "BlackForest Pastry",
      category: "Cake",
      price: 60,
      image: "/Products/Cakes/BlackForest.png",
    },
    {
      id: 9,
      name: "MixFruit Pastry",
      category: "Cake",
      price: 60,
      image: "/Products/Cakes/MixFruit.png",
    },
    {
      id: 10,
      name: "Mango Pastry",
      category: "Cake",
      price: 60,
      image: "/Products/Cakes/Mango.png",
    },
  ];

  return (
    <div className="bg-[#e8dcce] w-full mt-20 font-inter">
      <ProductCarousel title="Breads" products={breads} />
      <ProductCarousel title="Cakes" products={cakes} />
    </div>
  );
};
