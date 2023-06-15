export default interface ITokenManager {
  generate(payload: object): string;
  // validate<T>(token: string): T;
}
