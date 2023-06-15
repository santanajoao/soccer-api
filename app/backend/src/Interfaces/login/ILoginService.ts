import ServiceResponse from '../TServiceResponse';
import Token from '../tokens/TToken';

export default interface ILoginService {
  login(email: string, password: string): Promise<ServiceResponse<Token>>
  getRoleByEmail(email: string): Promise<ServiceResponse<{ role: string }>>
}
