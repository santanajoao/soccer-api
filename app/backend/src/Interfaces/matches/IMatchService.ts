import ServiceResponse from '../TServiceResponse';
import { TMatchWithTeamNames } from './IMatch';

export default interface IMatchService {
  getAll(): Promise<ServiceResponse<TMatchWithTeamNames[]>>;
  getByProgress(inProgress: boolean): Promise<ServiceResponse<TMatchWithTeamNames[]>>;
  getMatches(inProgress?: boolean): Promise<ServiceResponse<TMatchWithTeamNames[]>>;
}
