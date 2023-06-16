import ServiceResponse from '../Interfaces/TServiceResponse';
import IMatchService from '../Interfaces/matches/IMatchService';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import IMatch, { TMatchWithTeamNames, TUpdateMatchGoals } from '../Interfaces/matches/IMatch';

class MatchService implements IMatchService {
  private matchModel: IMatchModel;

  constructor(matchModel: IMatchModel) {
    this.matchModel = matchModel;
  }

  public getMatches = async (
    inProgress?: boolean,
  ): Promise<ServiceResponse<TMatchWithTeamNames[]>> => {
    const matches = await this.matchModel.findMatches(inProgress);

    return { status: 'SUCCESS', data: matches };
  };

  public updateGoals = async (
    props: TUpdateMatchGoals,
  ): Promise<ServiceResponse<IMatch>> => {
    const updatedMatch = await this.matchModel.updateGoals(props);
    if (updatedMatch === null) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }
    return { status: 'SUCCESS', data: updatedMatch };
  };
}

export default MatchService;
