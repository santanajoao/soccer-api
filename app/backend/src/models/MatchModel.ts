import IMatchModel from '../Interfaces/matches/IMatchModel';
import IMatch, { TMatchWithTeamNames, TMatchParams } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  public findAll = async (inProgress?: boolean): Promise<TMatchWithTeamNames[]> => {
    const where = inProgress === undefined ? {} : { inProgress };
    const sequelizeMatches = await this.model.findAll({
      where,
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    const matches = sequelizeMatches
      .map((match) => match.dataValues) as TMatchWithTeamNames[];

    return matches;
  };

  public updateById = async (
    { id, homeTeamGoals, awayTeamGoals, inProgress }: TMatchParams,
  ): Promise<IMatch | null> => {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals, inProgress },
      { where: { id } },
    );

    const updatedMatch = await this.model.findByPk(id);

    if (!updatedMatch) return null;
    return updatedMatch;
  };
}

export default MatchModel;
