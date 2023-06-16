import { Request, Response } from 'express';
import IMatchService from '../Interfaces/matches/IMatchService';
import HTTP from '../utils/HTTP';
import Parser from '../utils/Parser';

class MatchController {
  private matchService: IMatchService;
  private statusMapper = HTTP;

  constructor(matchService: IMatchService) {
    this.matchService = matchService;
  }

  public handleGetMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const booleanInProgress = Parser.parseBoolean(inProgress as string);

    const { status, data } = await this.matchService.getMatches(booleanInProgress);

    if (status !== 'SUCCESS') {
      return res
        .status(this.statusMapper.mapStatus(status))
        .json(data);
    }
    res.status(200).json(data);
  };
}

export default MatchController;
