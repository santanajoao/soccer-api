import ITeamModel from '../Interfaces/teams/ITeamModel';
import ITeam from '../Interfaces/teams/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';

class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  public findAll = async (): Promise<ITeam[]> => {
    const sequelizeTeams = await this.model.findAll();

    const teams: ITeam[] = sequelizeTeams.map((team) => ({
      id: team.id,
      teamName: team.teamName,
    }));

    return teams;
  };
}

export default TeamModel;
