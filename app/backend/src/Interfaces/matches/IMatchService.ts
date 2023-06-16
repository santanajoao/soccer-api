import ServiceResponse from '../TServiceResponse';
import IMatch, { TMatchWithTeamNames, TUpdateMatchGoals } from './IMatch';

export default interface IMatchService {
  getMatches(inProgress?: boolean): Promise<ServiceResponse<TMatchWithTeamNames[]>>;
  updateGoals(props: TUpdateMatchGoals): Promise<ServiceResponse<IMatch>>;
}
