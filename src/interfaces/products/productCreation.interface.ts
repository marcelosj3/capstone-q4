export interface IProductCreation {
  productId: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  expiryDate: string;
  quantity: number;
  unityValue: number;
  increaseValuePercentage: number;
  supplier: {
    name: string;
    cnpj: string;
  };
}
