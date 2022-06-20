class ProductService {
  create = async () => {
    return { statusCode: 201, message: 'created' };
  };
}

export default new ProductService();
