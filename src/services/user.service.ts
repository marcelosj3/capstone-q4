import { compare } from 'bcrypt';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';

import { AppDataSource } from '../data-source';
import { Address, User } from '../entities';
import { AppError } from '../errors';
import { UserRepository } from '../repositories';
import { serializedUserSchema } from '../schemas';

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

    const serializedUser = await serializedUserSchema.validate(user, {
      stripUnknown: true,
    });

    return { statusCode: 201, message: serializedUser };
  };

  login = async ({ validated }: Request) => {
    const user = await UserRepository.findOneWithAddress({
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
          await serializedUserSchema.validate(user, {
            stripUnknown: true,
          })
      )
    );

    return { statusCode: 200, message: serializedUsers };
  };

  patch = async ({ decoded, validated }: Request) => {
    const user = await UserRepository.findOne({
      userId: decoded.id,
    });

    if (!user) throw new AppError({ error: 'User not found' }, 404);

    if (Object.keys(validated).length == 0) {
      const serializedUser = await serializedUserSchema.validate(user, {
        stripUnknown: true,
      });

      return { statusCode: 200, message: serializedUser };
    }

    if (!!validated.password && !validated.oldPassword)
      throw new AppError(
        {
          error: 'Missing old password key',
          description:
            "In order to update the password, an 'oldPassword' key is necessary",
        },
        401
      );

    if (!!validated.oldPassword) {
      if (!(await compare(user.password, validated.oldPassword))) {
        throw new AppError({ error: 'Invalid old password' }, 401);
      }

      delete validated.oldPassword;
    }

    await UserRepository.update(user.userId as string, {
      ...(validated as unknown as User),
    });

    const updatedUser = await UserRepository.findOne({
      userId: user.userId,
    });

    const serializedUpdateUser = await serializedUserSchema.validate(
      updatedUser,
      { stripUnknown: true }
    );

    return { statusCode: 200, message: serializedUpdateUser };
  };

  delete = async ({ user }: Request) => {
    await UserRepository.delete(String(user.userId));

    return { statusCode: 204 };
  };
}

export default new UserService();
