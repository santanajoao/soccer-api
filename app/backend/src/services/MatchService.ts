import ServiceResponse from '../Interfaces/TServiceResponse';
import IMatchService from '../Interfaces/matches/IMatchService';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import { TMatchWithTeamNames } from '../Interfaces/matches/IMatch';

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
}

export default MatchService;
