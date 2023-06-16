import ServiceResponse from '../Interfaces/TServiceResponse';
import IMatchService, { TUpdateGoals } from '../Interfaces/matches/IMatchService';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import IMatch, { TMatchParams, TMatchWithTeamNames } from '../Interfaces/matches/IMatch';

class MatchService implements IMatchService {
  private matchModel: IMatchModel;

  constructor(matchModel: IMatchModel) {
    this.matchModel = matchModel;
  }

  public getMatches = async (
    { inProgress }: TMatchParams,
  ): Promise<ServiceResponse<TMatchWithTeamNames[]>> => {
    const matches = await this.matchModel.findAll(inProgress);

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
}

export default MatchService;
