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

  public findById = async (id: number): Promise<ITeam | null> => {
    const sequelizeTeam = await this.model.findByPk(id);
    if (!sequelizeTeam) return null;

    return {
      id: sequelizeTeam.id,
      teamName: sequelizeTeam.teamName,
    };
  };
}

export default TeamModel;
