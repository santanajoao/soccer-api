import IMatch, { TMatchWithTeamNames, TMatchParams, TMatchCreation } from './IMatch';

export default interface IMatchModel {
  findAll(where: TMatchParams): Promise<TMatchWithTeamNames[]>;
  updateById(fields: TMatchParams): Promise<IMatch | null>;
  create(fields: TMatchCreation): Promise<IMatch>
}
