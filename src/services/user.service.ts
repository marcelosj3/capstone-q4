import { Request } from 'express';
import { sign } from 'jsonwebtoken';

import { AppDataSource } from '../data-source';
import { Address, User } from '../entities';
import { AppError } from '../errors';
import { UserRepository } from '../repositories';
import { serializedCreatedUserSchema } from '../schemas';

class UserService {
  create = async ({ validated }: Request) => {
    const hasAddress: Address | undefined = validated.address || undefined;
    let user: User;

    if (hasAddress) {
      delete validated.address;

      user = await AppDataSource.transaction(async (entityManager) => {
        const user = entityManager.create(User, {
          ...(validated as unknown as User),
        });

        const address = entityManager.create(Address, { ...hasAddress });

        address.isMain = true;

        user.address = [address];
        address.user = [];

        await entityManager.save(Address, address);
        await entityManager.save(User, user);

        return user;
      });
    } else {
      user = await UserRepository.save({
        ...(validated as unknown as User),
      });
    }

    const serializedUser = await serializedCreatedUserSchema.validate(user, {
      stripUnknown: true,
    });

    return { statusCode: 201, message: serializedUser };
  };

  login = async ({ validated }: Request) => {
    const user = await UserRepository.findOne({
      email: validated.email,
    });

    if (!user) {
      throw new AppError({ error: 'invalid credentials' }, 401);
    }

    if (!(await user.comparePassword(validated.password))) {
      throw new AppError({ error: 'invalid credentials' }, 401);
    }

    const token: string = sign(
      { id: user.userId },
      String(process.env.SECRET_KEY),
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );

    return { statusCode: 200, message: { token } };
  };

  getAll = async () => {
    const users = await UserRepository.all();
    const serializedUsers = await Promise.all(
      users.map(
        async (user: User) =>
          await serializedCreatedUserSchema.validate(user, {
            stripUnknown: true,
          })
      )
    );

    return { statusCode: 200, message: serializedUsers };
  };
}

export default new UserService();
