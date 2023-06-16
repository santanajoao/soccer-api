import { Request, Response } from 'express';
import IMatchService from '../Interfaces/matches/IMatchService';
import HTTP from '../utils/HTTP';

class MatchController {
  private matchService: IMatchService;
  private statusMapper = HTTP;

  constructor(matchService: IMatchService) {
    this.matchService = matchService;
  }

  public handleGetMatches = async (_req: Request, res: Response) => {
    const { status, data } = await this.matchService.getAll();

    if (status !== 'SUCCESS') {
      return res
        .status(this.statusMapper.mapStatus(status))
        .json(data);
    }
    res.status(200).json(data);
  };
}

export default MatchController;
