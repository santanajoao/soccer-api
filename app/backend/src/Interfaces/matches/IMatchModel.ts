import IMatch, { TMatchWithTeamNames, TUpdateMatchGoals } from './IMatch';

export default interface IMatchModel {
  findMatches(inProgress?: boolean): Promise<TMatchWithTeamNames[]>;
  updateGoals(props: TUpdateMatchGoals): Promise<IMatch | null>;
}
