import ServiceResponse from '../ServiceResponse';
import IUser from '../users/IUser';

export default interface ILoginValidator {
  validateEmail(): Promise<ServiceResponse<IUser>>;
  validatePassword(): ServiceResponse<null>;
  validateLogin(): Promise<ServiceResponse<IUser>>;
}
