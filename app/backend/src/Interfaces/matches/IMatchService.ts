import ServiceResponse from '../TServiceResponse';
import { TMatchWithTeamNames } from './IMatch';

export default interface IMatchService {
  getAll(): Promise<ServiceResponse<TMatchWithTeamNames[]>>;
}
