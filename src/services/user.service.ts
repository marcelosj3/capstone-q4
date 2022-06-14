import { Request } from 'express';

import { AppDataSource } from '../data-source';
import { Address, User } from '../entities';
import { UserRepository } from '../repositories';
import { serializedCreatedUserSchema } from '../schemas';

class UserService {
  create = async ({ validated }: Request) => {
    let address: Address | undefined = validated.address || undefined;
    let user: User;

    if (address) {
      delete validated.address;

      user = validated as unknown as User;

      user = await AppDataSource.transaction(async (entityManager) => {
        user = await entityManager.save(User, { ...user });

        // TODO check if address already exists and assign

        address!.isMain = true;
        address = await entityManager.save(Address, { ...address });

        user.address = [address];
        address.user = [];

        return user;
      });
    } else {
      user = validated as unknown as User;
      user = await UserRepository.save({
        ...user,
      });
    }

    if (user.address[0].zipCode === '12345-123') {
      // TODO remove this logic
      user.address = [];
    }

    const serializedUser = await serializedCreatedUserSchema.validate(user, {
      stripUnknown: true,
    });

    return { statusCode: 201, message: serializedUser };
  };
}

export default new UserService();
