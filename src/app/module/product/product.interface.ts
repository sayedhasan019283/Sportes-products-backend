

  export type TProduct = {
    name: string;
    description: string;
    category: string;
    brand: string;
    stockQuantity: number;
    rating: number;
    price: number;
    image: string;
  }

  export interface Filter {
    brand?: string;
    category?: string;
    price?: {
        $gte?: number;
        $lte?: number;
      };
    // minPrice?: number;
    // maxPrice?: number;
  }

 
  
  