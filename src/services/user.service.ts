import { compare } from 'bcrypt';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';

import { AppDataSource } from '../data-source';
import { Address, Order, User } from '../entities';
import { AppError } from '../errors';
import { IUserCreate, IUserLogin, IUserUpdate } from '../interfaces';
import { UserRepository } from '../repositories';
import { serializedUserSchema } from '../schemas';
import { orderToSerialize } from '../utils';

class UserService {
  create = async ({ validated }: Request) => {
    const { address } = validated as IUserCreate;

    // NEW TEST

    const hasAddress: Address | undefined = address || undefined;
    let user: User;

    if (hasAddress) {
      delete (validated as IUserCreate).address;

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
    validated = validated as IUserLogin;

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
    const { password, oldPassword } = validated as IUserUpdate;

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

    if (!!password && !oldPassword)
      throw new AppError(
        {
          error: 'Missing old password key',
          description:
            "In order to update the password, an 'oldPassword' key is necessary",
        },
        401
      );

    if (!!oldPassword) {
      if (!(await compare(user.password, oldPassword))) {
        throw new AppError({ error: 'Invalid old password' }, 401);
      }

      delete (validated as IUserUpdate).oldPassword;
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

  orders = async ({ decoded, query }: Request) => {
    const { id: userId } = decoded;
    const { withProducts } = query;
    const shouldGetWithProducts = !(
      withProducts !== undefined && withProducts !== 'false'
    );

    const user = await UserRepository.findOneWithOrders({ userId });

    if (!user) throw new AppError({ error: 'user not found' }, 404);

    const { orders } = user;

    if (orders.length === 0)
      return {
        statusCode: 200,
        message: { message: 'there are no orders to display' },
      };

    const serializedOrders = [];

    for (let i = 0; i < user.orders.length; i++) {
      const order = user.orders[i];
      const serializedOrder = await orderToSerialize(
        order as Order,
        shouldGetWithProducts
      );
      serializedOrders.push(serializedOrder);
    }

    return { statusCode: 200, message: serializedOrders };
  };
}

export default new UserService();
