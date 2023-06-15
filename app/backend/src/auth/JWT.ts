import * as jwt from 'jsonwebtoken';
import TokenValidationResponse from '../Interfaces/tokens/TTokenValidationResponse';
import ITokenManager from '../Interfaces/tokens/ITokenManager';

class JWT implements ITokenManager {
  private manager = jwt;

  private static getSecret = (): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT secret not found');
    }
    return secret;
  };

  public generate = (payload: object): string => {
    const token = this.manager.sign(payload, JWT.getSecret());
    return token;
  };

  public validate<T>(token: string): TokenValidationResponse<T> {
    const secret = JWT.getSecret();
    try {
      const payload = this.manager.verify(token, secret) as T;
      return { valid: true, data: payload };
    } catch {
      return { valid: false, data: null };
    }
  }
}

export default JWT;
