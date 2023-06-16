import ServiceResponse from '../Interfaces/TServiceResponse';
import IMatchService, { TUpdateGoals } from '../Interfaces/matches/IMatchService';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import IMatch, { TMatchParams, TMatchWithTeamNames } from '../Interfaces/matches/IMatch';
import DataHandler from '../utils/DataHandler';

class MatchService implements IMatchService {
  private matchModel: IMatchModel;

  constructor(matchModel: IMatchModel) {
    this.matchModel = matchModel;
  }

  public getMatches = async (
    where: TMatchParams,
  ): Promise<ServiceResponse<TMatchWithTeamNames[]>> => {
    const tratedWhere = DataHandler.removeObjectUndefined(where);

    const matches = await this.matchModel.findAll(tratedWhere);

    return { status: 'SUCCESS', data: matches };
  };

  public updateGoals = async (
    { id, homeTeamGoals, awayTeamGoals }: TUpdateGoals,
  ): Promise<ServiceResponse<IMatch>> => {
    const updatedMatch = await this.matchModel.updateById({
      id, homeTeamGoals, awayTeamGoals,
    });

    if (updatedMatch === null) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }
    return { status: 'SUCCESS', data: updatedMatch };
  };

  public finishMatch = async (id: number): Promise<ServiceResponse<IMatch>> => {
    const updatedMatch = await this.matchModel.updateById({ id, inProgress: false });
    if (!updatedMatch) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }

    return { status: 'SUCCESS', data: updatedMatch };
  };

  public createMatch = async (fields: IMatch): Promise<ServiceResponse<IMatch>> => {
    const match = await this.matchModel.create({
      homeTeamGoals: fields.homeTeamGoals,
      homeTeamId: fields.homeTeamId,
      awayTeamGoals: fields.awayTeamGoals,
      awayTeamId: fields.awayTeamId,
      inProgress: true,
    });

    return { status: 'SUCCESS', data: match };
  };
}

export default MatchService;
