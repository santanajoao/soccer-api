import { Request, Response } from 'express';
import ILoginService from '../Interfaces/login/ILoginService';
import HTTP from '../utils/HTTP';

class LoginController {
  private loginService: ILoginService;
  private statusMapper = HTTP;

  constructor(loginService: ILoginService) {
    this.loginService = loginService;
  }

  public handlePostLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { status, data } = await this.loginService.login(email, password);
    if (status !== 'SUCCESS') {
      return res.status(this.statusMapper.mapStatus(status)).json(data);
    }
    res.status(200).json(data);
  };
}

export default LoginController;
