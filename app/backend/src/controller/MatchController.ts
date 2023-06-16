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

    const { status, data } = await this.matchService
      .getMatches({ inProgress: booleanInProgress });

    if (status !== 'SUCCESS') {
      return res
        .status(this.statusMapper.mapStatus(status))
        .json(data);
    }
    res.status(200).json(data);
  };

  public handlePatchMatches = async (req: Request, res: Response) => {
    const fields = {
      id: Number(req.params.id),
      homeTeamGoals: Number(req.body.homeTeamGoals),
      awayTeamGoals: Number(req.body.awayTeamGoals),
    };

    const { status, data } = await this.matchService.updateGoals(fields);

    if (status !== 'SUCCESS') {
      return res
        .status(this.statusMapper.mapStatus(status))
        .json(data);
    }
    res.status(200).json(data);
  };

  public handlePatchFinishMatch = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { status, data } = await this.matchService.finishMatch(id);

    if (status !== 'SUCCESS') {
      return res
        .status(this.statusMapper.mapStatus(status))
        .json(data);
    }
    res.status(200).json({ message: 'Finished' });
  };

  public handlePostMatch = async (req: Request, res: Response) => {
    const { status, data } = await this.matchService.createMatch(req.body);

    if (status !== 'SUCCESS') {
      return res
        .status(this.statusMapper.mapStatus(status))
        .json(data);
    }
    res.status(201).json(data);
  };
}

export default MatchController;
