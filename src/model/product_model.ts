interface ProductModel {
  id?: string;
  categoryId?: string;
  name?: string;
  description?: string;
  image?: string;
  point?: number;
  price?: number;
  unit?: string;
  stok?: number;
  max?: number;
  min?: number;
  sold?: number;
  view?: number;
  like?: number;
  active?: boolean;
  created?: string;
  updated?: string;
}

export { ProductModel };
