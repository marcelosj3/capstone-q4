import userRepositories from '../repositories/user.repositories';
import { getAllSeralized } from '../schemas';

class UserService {
  getAll = async () => {
    const users = await userRepositories.getAll();
    return {
      statusCode: 200,
      message: await getAllSeralized.validate(users, { stripUnknown: true }),
    };
  };
}

export default new UserService();
