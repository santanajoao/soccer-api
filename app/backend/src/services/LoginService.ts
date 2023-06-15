import IPublicUser from '../Interfaces/users/IPublicUser';
import ITokenManager from '../Interfaces/ITokenManager';
import ServiceResponse from '../Interfaces/ServiceResponse';
import Token from '../Interfaces/Token';
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
}

export default LoginService;
