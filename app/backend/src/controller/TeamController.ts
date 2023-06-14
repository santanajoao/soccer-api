import { Request, Response } from 'express';
import ITeamService from '../Interfaces/teams/ITeamService';
import HTTP from '../utils/HTTP';

class TeamController {
  private teamService: ITeamService;
  private statusMapper = HTTP;

  constructor(teamService: ITeamService) {
    this.teamService = teamService;
  }

  public handleGetTeams = async (req: Request, res: Response) => {
    const { status, data } = await this.teamService.getAll();

    if (status !== 'SUCCESS') {
      return res
        .status(this.statusMapper.mapStatus(status))
        .json(data);
    }
    res.status(200).json(data);
  };
}

export default TeamController;
