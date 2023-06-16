import IMatchModel from '../Interfaces/matches/IMatchModel';
import IMatch, { TMatchWithTeamNames, TMatchParams } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  public findAll = async (where: TMatchParams): Promise<TMatchWithTeamNames[]> => {
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
    fields: TMatchParams,
  ): Promise<IMatch | null> => {
    const { id, ...newValues } = fields;
    await this.model.update(
      newValues,
      { where: { id } },
    );

    const updatedMatch = await this.model.findByPk(id);

    if (!updatedMatch) return null;
    return updatedMatch.dataValues;
  };
}

export default MatchModel;
