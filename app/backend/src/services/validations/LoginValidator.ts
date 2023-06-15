import IEncrypter from '../../Interfaces/IEncrypter';
import ServiceResponse from '../../Interfaces/ServiceResponse';
import IUser from '../../Interfaces/users/IUser';
import ILoginValidator from '../../Interfaces/login/ILoginValidator';
import IUserModel from '../../Interfaces/users/IUserModel';

class LoginValidator implements ILoginValidator {
  private userModel: IUserModel;
  private encrypter: IEncrypter;

  private static errorMessage = 'Invalid email or password';

  constructor(userModel: IUserModel, encrypter: IEncrypter) {
    this.userModel = userModel;
    this.encrypter = encrypter;
  }

  public validateLogin = async (
    email: string,
    password: string,
  ): Promise<ServiceResponse<IUser>> => {
    const emailFormatValidation = this.validateEmail(email);
    if (emailFormatValidation.status !== 'SUCCESS') return emailFormatValidation;

    const passwordFormatValidation = this.validatePassword(password);
    if (passwordFormatValidation.status !== 'SUCCESS') return passwordFormatValidation;

    const existanceError = await this.emailExists(email);
    if (existanceError.status !== 'SUCCESS') return existanceError;
    const user = existanceError.data;

    const credentialsError = this.comparePassword(password, user.password);
    if (credentialsError.status !== 'SUCCESS') return credentialsError;

    return { status: 'SUCCESS', data: user };
  };

  public validateEmail = (email: string): ServiceResponse<null> => {
    const emailRegex = /[\d\w]+@[\d\w]+\.com/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
      return { status: 'UNAUTHORIZED', data: { message: LoginValidator.errorMessage } };
    }
    return { status: 'SUCCESS', data: null };
  };

  public validatePassword = (password: string): ServiceResponse<null> => {
    if (password.length < 6) {
      return { status: 'UNAUTHORIZED', data: { message: LoginValidator.errorMessage } };
    }
    return { status: 'SUCCESS', data: null };
  };

  public comparePassword = (password: string, hash: string): ServiceResponse<null> => {
    const isEqual = this.encrypter.compare(password, hash);
    if (!isEqual) {
      return { status: 'UNAUTHORIZED', data: { message: LoginValidator.errorMessage } };
    }
    return { status: 'SUCCESS', data: null };
  };

  public emailExists = async (email: string): Promise<ServiceResponse<IUser>> => {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: LoginValidator.errorMessage } };
    }
    return { status: 'SUCCESS', data: user };
  };
}

export default LoginValidator;
