import ITeam, { TTeamsWithMatches } from './ITeam';

export default interface ITeamModel {
  findAll(): Promise<ITeam[]>;
  findById(id: number): Promise<ITeam | null>;
  findManyById(ids: number[]): Promise<ITeam[]>;
  findAllWithMatches(): Promise<TTeamsWithMatches[]>
}
