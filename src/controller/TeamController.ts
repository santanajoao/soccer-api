import { Request, Response } from 'express';
import ITeamService from '../Interfaces/teams/ITeamService';
import HTTP from '../utils/HTTP';

class TeamController {
  private teamService: ITeamService;
  private statusMapper = HTTP;

  constructor(teamService: ITeamService) {
    this.teamService = teamService;
  }

  public handleGetTeams = async (_req: Request, res: Response) => {
    const { status, data } = await this.teamService.getAll();

    if (status !== 'SUCCESS') {
      return res
        .status(this.statusMapper.mapStatus(status))
        .json(data);
    }
    res.status(200).json(data);
  };

  public handleGetTeamById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { status, data } = await this.teamService.getById(id);

    if (status !== 'SUCCESS') {
      return res
        .status(this.statusMapper.mapStatus(status))
        .json(data);
    }
    res.status(200).json(data);
  };

  public handleGetGeneralLeaderboard = async (req: Request, res: Response) => {
    const { status, data } = await this.teamService.getLeaderboard('all');

    if (status !== 'SUCCESS') {
      return res
        .status(this.statusMapper.mapStatus(status))
        .json(data);
    }
    res.status(200).json(data);
  };

  public handleGetHomeLeaderboard = async (req: Request, res: Response) => {
    const { status, data } = await this.teamService.getLeaderboard('home');

    if (status !== 'SUCCESS') {
      return res
        .status(this.statusMapper.mapStatus(status))
        .json(data);
    }
    res.status(200).json(data);
  };

  public handleGetAwayLeaderboard = async (req: Request, res: Response) => {
    const { status, data } = await this.teamService.getLeaderboard('away');

    if (status !== 'SUCCESS') {
      return res
        .status(this.statusMapper.mapStatus(status))
        .json(data);
    }
    res.status(200).json(data);
  };
}

export default TeamController;
