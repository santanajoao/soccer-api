import ServiceResponse from '../Interfaces/TServiceResponse';
import IMatchService from '../Interfaces/matches/IMatchService';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import { TMatchWithTeamNames } from '../Interfaces/matches/IMatch';

class MatchService implements IMatchService {
  private matchModel: IMatchModel;

  constructor(matchModel: IMatchModel) {
    this.matchModel = matchModel;
  }

  public getAll = async (): Promise<ServiceResponse<TMatchWithTeamNames[]>> => {
    const matches = await this.matchModel.findAll();

    return { status: 'SUCCESS', data: matches };
  };

  public getByProgress = async (
    inProgress: boolean,
  ): Promise<ServiceResponse<TMatchWithTeamNames[]>> => {
    const matches = await this.matchModel.findByProgress(inProgress);

    return { status: 'SUCCESS', data: matches };
  };

  public getMatches = async (inProgress?: boolean) => {
    if (inProgress === undefined) {
      return this.getAll();
    }
    return this.getByProgress(inProgress);
  };
}

export default MatchService;
