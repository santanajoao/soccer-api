import { TMatchWithTeamNames } from './IMatch';

export default interface IMatchModel {
  findMatches(inProgress?: boolean): Promise<TMatchWithTeamNames[]>;
}
