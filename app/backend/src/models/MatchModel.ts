import IMatchModel from '../Interfaces/matches/IMatchModel';
import { TMatchWithTeamNames } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  public findMatches = async (inProgress?: boolean): Promise<TMatchWithTeamNames[]> => {
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
}

export default MatchModel;
