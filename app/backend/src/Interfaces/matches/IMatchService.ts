import ServiceResponse from '../TServiceResponse';
import IMatch, { TMatchParams, TMatchWithTeamNames } from './IMatch';

export default interface IMatchService {
  getMatches(where: TMatchParams): Promise<ServiceResponse<TMatchWithTeamNames[]>>;
  updateGoals(fields: TMatchParams): Promise<ServiceResponse<IMatch>>;
  finishMatch(id: number): Promise<ServiceResponse<IMatch>>;
}

export type TUpdateGoals = Pick<IMatch, 'id' | 'homeTeamGoals' | 'awayTeamGoals'>;
