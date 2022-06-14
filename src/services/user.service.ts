import { Request } from 'express';

import { AppDataSource } from '../data-source';
import { Address, User } from '../entities';
import { IReturnMessage } from '../interfaces/services';
import { UserRepository } from '../repositories';

class UserService {
  create = async ({ validated }: Request): Promise<IReturnMessage<User>> => {
    let address: Address | undefined = validated.address || undefined;
    let user: User;

    if (address) {
      delete validated.address;

      user = validated as unknown as User;

      user = await AppDataSource.transaction(async (entityManager) => {
        user = await entityManager.save(User, { ...user });

        address!.isMain = true;
        // TODO delete this additionalAddressData once we turn it a nullable property
        address!.additionalAddressData = '';
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

    // TODO change all this logic for the yup schema once we validate the PR
    let serializedUser = {
      userId: user.userId,
      name: user.name,
      email: user.email,
    };

    if (address) {
      // @ts-ignore
      serializedUser.address = [
        {
          addressId: user.address[0].addressId,
          city: user.address[0].city,
          district: user.address[0].district,
          houseNumber: user.address[0].houseNumber,
          isMain: user.address[0].isMain,
          state: user.address[0].state,
          street: user.address[0].street,
          zipCode: user.address[0].zipCode,
        },
      ];
    }

    return { statusCode: 201, message: serializedUser as User };
  };
}

export default new UserService();
