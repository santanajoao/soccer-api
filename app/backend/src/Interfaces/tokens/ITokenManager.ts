import TokenValidationResponse from './TTokenValidationResponse';

export default interface ITokenManager {
  generate(payload: object): string;
  validate<T>(token: string): TokenValidationResponse<T>;
}
