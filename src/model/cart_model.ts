interface CartModel {
  id?: string;
  customerId?: string;
  productId?: string;
  qty?: number;
  total?: number;
  created?: string;
  updated?: string;
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
}

export { CartModel };
