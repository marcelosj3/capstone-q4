import { NextFunction, Request, Response } from 'express';

import { AppError } from '../../errors';
import { UserRepository } from '../../repositories';
import { CompanyRole } from '../../types';
import { verifyRolePermission } from '../../utils/users';

/**
 * It verifies the permission each user has and set a resticrtion level
 * that is one level above the user, that way to user has no permission
 * to same level functions, that can be useful to block users to mess
 * around with other users at the same level, that is, a MANAGER can only
 * modify/create EMPLOYEES and CLIENTS, but not other MANAGERS.
 */
export const verifyRolePermissionMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const { decoded, body } = req;

  const bodyCompanyRole = body?.companyRole;

  if (!decoded || !bodyCompanyRole) return next();

  const restrictionLevel: { [key: string]: CompanyRole } = {
    admin: CompanyRole.ADMIN,
    manager: CompanyRole.ADMIN,
    employee: CompanyRole.MANAGER,
    client: CompanyRole.EMPLOYEE,
  };

  const { id } = decoded;

  const user = await UserRepository.findOne({ userId: id });

  if (!user) throw new AppError({ error: 'User not found' }, 404);

  const userRole = user?.companyRole;

  verifyRolePermission(userRole!, restrictionLevel[body.companyRole]);

  return next();
};
