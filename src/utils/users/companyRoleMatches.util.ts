import { CompanyRole } from '../../types';

export const companyRoleMatches = {
  message: {
    error: 'Invalid company role',
    expected: [CompanyRole.CLIENT, CompanyRole.EMPLOYEE, CompanyRole.MANAGER],
  },
};
