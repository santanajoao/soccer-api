import IMatchModel from '../Interfaces/matches/IMatchModel';
import IMatch from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

type TTeamName = {
  teamName: string;
};

type TMatchWithTeamNames = IMatch & {
  homeTeam: TTeamName;
  awayTeam: TTeamName;
};

class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  public findAll = async (): Promise<TMatchWithTeamNames[]> => {
    const sequelizeMatches = await this.model.findAll({
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
