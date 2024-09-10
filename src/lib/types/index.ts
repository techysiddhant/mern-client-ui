export interface Tenant {
  id: string;
  name: string;
  address: string;
  updatedAt: string;
  createdAt: string;
}
export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}
export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}
export interface Category {
  name: string;
  _id: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
}
export type ProductAttribute = {
  name: string;
  value: string | boolean;
};
export type Product = {
  _id: string;
  name: string;
  description: string;
  isPublish: boolean;
  category: Category;
  createdAt: string;
  image: string;
  tenantId: string;
  priceConfiguration: PriceConfiguration;
  attributes: ProductAttribute[];
};
export type Topping = {
  id: string;
  name: string;
  price: number;
  image: string;
}