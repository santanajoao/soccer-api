import ServiceResponse from '../TServiceResponse';
import IUser from '../users/IUser';

export default interface ILoginValidator {
  validateEmail(email: string): ServiceResponse<null>;
  validatePassword(password: string): ServiceResponse<null>;
  validateLogin(email: string, password: string): Promise<ServiceResponse<IUser>>;
}
