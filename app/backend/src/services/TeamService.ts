import ServiceResponse from '../Interfaces/TServiceResponse';
import ITeamService from '../Interfaces/teams/ITeamService';
import ITeamModel from '../Interfaces/teams/ITeamModel';
import ITeam from '../Interfaces/teams/ITeam';

class TeamService implements ITeamService {
  private teamModel: ITeamModel;

  constructor(teamModel: ITeamModel) {
    this.teamModel = teamModel;
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
}

export default TeamService;
