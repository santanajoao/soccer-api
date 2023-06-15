import * as jwt from 'jsonwebtoken';
import ITokenManager from '../Interfaces/ITokenManager';

class JWT implements ITokenManager {
  private secret = process.env.JWT_SECRET || '';
  private manager = jwt;

  private checkSecret = () => {
    if (this.secret === '') {
      throw new Error('Secret not found');
    }
  };

  public generate = (payload: object): string => {
    this.checkSecret();

    const token = this.manager.sign(payload, this.secret);
    return token;
  };
}

export default JWT;
