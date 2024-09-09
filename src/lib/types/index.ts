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
