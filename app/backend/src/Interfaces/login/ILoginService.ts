import ServiceResponse from '../ServiceResponse';
import Token from '../Token';

export default interface ILoginService {
  login(email: string, password: string): Promise<ServiceResponse<Token>>
}
