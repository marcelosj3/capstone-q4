import { ProductRepository } from '../../repositories';

export const getProductsUtil = async (
  uniqueProducts: Array<string>,
  i: number
) => {
  const [name, brand, category, expiryDate] = uniqueProducts[i].split('-');
  const product = await ProductRepository.findOne({
    name,
    brand,
    category,
    expiryDate,
  });

  const productStock = await ProductRepository.findBy({
    name,
    brand,
    category,
    expiryDate,
  });
  return { product, productStock };
};
