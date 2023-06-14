import ServiceResponse from '../Interfaces/ServiceResponse';
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
}

export default TeamService;
