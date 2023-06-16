import IMatch, { TMatchWithTeamNames, TMatchParams } from './IMatch';

export default interface IMatchModel {
  findAll(where: TMatchParams): Promise<TMatchWithTeamNames[]>;
  updateById(fields: TMatchParams): Promise<IMatch | null>;
}
