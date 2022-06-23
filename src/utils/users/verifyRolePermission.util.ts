import { AppError } from '../../errors';
import { CompanyRole } from '../../types';

/**
 *
 * It uses enum parameters to define if the user has permission or not,
 * that is, CLIENT is less than EMPLOYEE, so if the authorized role
 * is EMPLOYEE and the userRole is CLIENT, then the user has no permission.
 *
 * If the user has the ADMIN role, then it automatically has a permission.
 *
 * In case the user has no permission, an error is thrown.
 *
 * @param {[CompanyRole]} userRole
 * @param {[CompanyRole]} authorizedRole
 */
export const verifyRolePermission = (
  userRole: CompanyRole,
  authorizedRole: CompanyRole
): void => {
  let hasPermission: boolean = false;

  if (userRole === CompanyRole.ADMIN) {
    hasPermission = true;
  } else if (
    userRole >= authorizedRole &&
    authorizedRole !== CompanyRole.ADMIN
  ) {
    hasPermission = true;
  }

  if (!hasPermission) {
    throw new AppError(
      {
        error: 'You have no permission to access this information',
      },
      401
    );
  }
};
