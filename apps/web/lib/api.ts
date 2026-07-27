export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type Product = {
  id: number;
  reference_code: string | null;
  product_type: "travel-spray" | "extrait" | "interieur";
  name: string;
  slug: string;
  description: string;
  collection: string;
  family: string;
  price: number;
  volume_ml: number;
  top_notes: string[];
  heart_notes: string[];
  base_notes: string[];
  brand: { name: string; slug: string };
  category: { name: string; slug: string };
  images: { url: string; alt_text: string; position?: number }[];
  inventory: { quantity: number; low_stock_threshold: number } | null;
};

export type ProductList = {
  items: Product[];
  total: number;
  page: number;
  page_size: number;
};

export type AvailabilityOption = {
  location_code: "GABON" | "FRANCE";
  location_name: string;
  available_quantity: number;
  delivery_days_min: number;
  delivery_days_max: number;
  status: "LOCAL" | "FRANCE" | "OUT_OF_STOCK";
  customer_message: string;
};

export type ProductAvailability = {
  product_id: number;
  product_slug: string;
  selected_source: "GABON" | "FRANCE" | null;
  status: "LOCAL" | "FRANCE" | "UNAVAILABLE";
  available_quantity: number;
  delivery_days_min: number | null;
  delivery_days_max: number | null;
  customer_message: string;
  options: AvailabilityOption[];
};
