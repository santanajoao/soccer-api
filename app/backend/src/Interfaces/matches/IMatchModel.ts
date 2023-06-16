import IMatch, { TMatchWithTeamNames, TMatchParams } from './IMatch';

export default interface IMatchModel {
  findAll(inProgress?: boolean): Promise<TMatchWithTeamNames[]>;
  updateById(props: TMatchParams): Promise<IMatch | null>;
}
