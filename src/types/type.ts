export interface ProductType {
    id: number;
    name: string;
    slug: string;
    image?: string;
    description: string;
    primary_image: string;
    category_id: number;
    brand_id: number;
    category: {
        id: number;
        name: string;
        slug: string;
        image: string;
    };
    brand: {
        id: number;
        name: string;
    };
    taxonomies: Array<{
        id: number;
        name: string;
        slug: string;
        pivot: {
            product_id: number;
            taxonomy_id: number;
        };
    }>;
    stocks: Array<{
        id: number;
        product_id: number;
        quantity: number;
        web_price: number;
        pos_price: number;
        web_discount: number;
        pos_discount: number;
        reserved_quantity: number;
        created_at: string;
        updated_at: string;
        variation_stocks: Array<{
            id: number;
            stock_id: number;
            variation_option_id: number;
            variation_option: {
                id: number;
                variation_id: number;
                name: string;
                variation: {
                    id: number;
                    name: string;
                };
            };
        }>;
    }>;
}

export interface StockPriceType {
    id: number;
    product_id: number;
    quantity: number;
    web_price: number;
    pos_price: number;
    web_discount: number;
    pos_discount: number;
    reserved_quantity: number;
    created_at: string;
    updated_at: string;
    variation_stocks: Array<{
        id: number;
        stock_id: number;
        variation_option_id: number;
        variation_option: {
            id: number;
            variation_id: number;
            name: string;
            variation: {
                id: number;
                name: string;
            };
        };
    }>;
}


export interface UserData {
  id: number;
  name: string;
  email: string;
  mobile: string;
  user_type: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  stripe_id: string | null;
  pm_type: string | null;
  pm_last_four: string | null;
  trial_ends_at: string | null;
}

export interface CategoryBrandType {
    id: number;
    name: string;
   
}