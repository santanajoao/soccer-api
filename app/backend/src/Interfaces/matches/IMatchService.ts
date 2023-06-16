import ServiceResponse from '../TServiceResponse';
import { TMatchWithTeamNames } from './IMatch';

export default interface IMatchService {
  getMatches(inProgress?: boolean): Promise<ServiceResponse<TMatchWithTeamNames[]>>;
}
