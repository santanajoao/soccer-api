import { Op } from 'sequelize';
import SequelizeMatch from '../database/models/SequelizeMatch';
import ITeamModel from '../Interfaces/teams/ITeamModel';
import ITeam, { TTeamsWithMatches } from '../Interfaces/teams/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';

class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  public findAll = async (): Promise<ITeam[]> => {
    const sequelizeTeams = await this.model.findAll();

    const teams: ITeam[] = sequelizeTeams.map((team) => team.dataValues);
    return teams;
  };

  public findById = async (id: number): Promise<ITeam | null> => {
    const sequelizeTeam = await this.model.findByPk(id);
    if (!sequelizeTeam) return null;

    return sequelizeTeam.dataValues;
  };

  public findManyById = async (ids: number[]): Promise<ITeam[]> => {
    const sequelizeTeams = await this.model.findAll({
      where: { id: { [Op.in]: ids } },
    });

    const teams = sequelizeTeams.map((team) => team.dataValues);
    return teams;
  };

  public findAllWithMatches = async (): Promise<TTeamsWithMatches[]> => {
    const sequelizeTeams = await this.model.findAll({
      include: [
        { model: SequelizeMatch, as: 'homeMatches' },
        { model: SequelizeMatch, as: 'awayMatches' },
      ],
    });
    const teams = sequelizeTeams.map((team) => team.dataValues) as TTeamsWithMatches[];
    return teams;
  };
}

export default TeamModel;
