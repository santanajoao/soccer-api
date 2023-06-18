import ServiceResponse from '../Interfaces/TServiceResponse';
import ITeamService from '../Interfaces/teams/ITeamService';
import ITeamModel from '../Interfaces/teams/ITeamModel';
import ITeam, { TLeaderboard } from '../Interfaces/teams/ITeam';
import ITeamDataHandler from '../Interfaces/teams/ITeamDataHandler';

class TeamService implements ITeamService {
  private teamModel: ITeamModel;
  private dataHandler: ITeamDataHandler;

  constructor(teamModel: ITeamModel, dataHandler: ITeamDataHandler) {
    this.teamModel = teamModel;
    this.dataHandler = dataHandler;
  }

  public getAll = async (): Promise<ServiceResponse<ITeam[]>> => {
    const teams = await this.teamModel.findAll();

    return { status: 'SUCCESS', data: teams };
  };

  public getById = async (id: number): Promise<ServiceResponse<ITeam>> => {
    const team = await this.teamModel.findById(id);
    if (!team) {
      return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    }
    return { status: 'SUCCESS', data: team };
  };

  public getLeaderboard = async (teamType: string): Promise<ServiceResponse<TLeaderboard[]>> => {
    const teams = await this.teamModel.findAllWithMatches();
    const leaderBoard = this.dataHandler.getLeaderboard(teams, teamType);
    return { status: 'SUCCESS', data: leaderBoard };
  };
}

export default TeamService;
