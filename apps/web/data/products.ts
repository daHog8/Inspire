export type Product = {
  id: number;
  slug: string;
  name: string;
  collection: "Homme" | "Femme" | "Mixte";
  family: string;
  price: number;
  volume_ml: number;
  notes: string[];
  image: string;
};

export const featuredProducts: Product[] = [
  { id: 1, slug: "eclat-solaire", name: "Éclat Solaire", collection: "Femme", family: "Floral ambré", price: 24.9, volume_ml: 15, notes: ["Bergamote", "Jasmin", "Vanille"], image: "/products/eclat-solaire.jpg" },
  { id: 2, slug: "nuit-magnetique", name: "Nuit Magnétique", collection: "Homme", family: "Boisé épicé", price: 24.9, volume_ml: 15, notes: ["Poivre noir", "Cèdre", "Ambre"], image: "/products/nuit-magnetique.jpg" },
  { id: 3, slug: "oud-imperial", name: "Oud Impérial", collection: "Mixte", family: "Oriental boisé", price: 24.9, volume_ml: 15, notes: ["Safran", "Oud", "Cuir"], image: "/products/oud-imperial.jpg" },
  { id: 4, slug: "barbe-a-papa", name: "Barbe à Papa", collection: "Femme", family: "Gourmand", price: 24.9, volume_ml: 15, notes: ["Fruits rouges", "Sucre filé", "Vanille"], image: "/products/barbe-a-papa.jpg" },
];
