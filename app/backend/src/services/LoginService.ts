import IPublicUser from '../Interfaces/users/IPublicUser';
import ITokenManager from '../Interfaces/tokens/ITokenManager';
import ServiceResponse from '../Interfaces/TServiceResponse';
import Token from '../Interfaces/tokens/TToken';
import ILoginService from '../Interfaces/login/ILoginService';
import ILoginValidator from '../Interfaces/login/ILoginValidator';

class LoginService implements ILoginService {
  private validator: ILoginValidator;
  private tokenManager: ITokenManager;

  constructor(validator: ILoginValidator, tokenManager: ITokenManager) {
    this.validator = validator;
    this.tokenManager = tokenManager;
  }

  public login = async (email: string, password: string): Promise<ServiceResponse<Token>> => {
    const loginValidation = await this.validator.validateLogin(email, password);
    if (loginValidation.status !== 'SUCCESS') return loginValidation;
    const user = loginValidation.data;

    const tokenPayload: IPublicUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    const token = this.tokenManager.generate(tokenPayload);
    return { status: 'SUCCESS', data: { token } };
  };

  public getRoleByEmail = async (email: string): Promise<ServiceResponse<{ role: string; }>> => {
    const existanceValidation = await this.validator.emailExists(email);
    if (existanceValidation.status !== 'SUCCESS') return existanceValidation;

    const { role } = existanceValidation.data;
    return { status: 'SUCCESS', data: { role } };
  };
}

export default LoginService;
