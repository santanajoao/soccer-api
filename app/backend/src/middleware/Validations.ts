import { NextFunction, Request, Response } from 'express';
import ITokenManager from '../Interfaces/tokens/ITokenManager';
import IUser from '../Interfaces/users/IUser';

class Validations {
  private tokenManager: ITokenManager;

  constructor(tokenManager: ITokenManager) {
    this.tokenManager = tokenManager;
  }

  public validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  };

  public validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.get('authorization');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const tokenValidation = this.tokenManager.validate<IUser>(token);
    if (!tokenValidation.valid) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    req.body.internals = { token: { data: tokenValidation.data } };
    next();
  };
}

export default Validations;
