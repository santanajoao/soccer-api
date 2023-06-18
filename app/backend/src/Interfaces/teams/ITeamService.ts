import ServiceResponse from '../TServiceResponse';
import ITeam, { TLeaderboard } from './ITeam';

export default interface ITeamService {
  getAll(): Promise<ServiceResponse<ITeam[]>>;
  getById(id: number): Promise<ServiceResponse<ITeam>>;
  getLeaderboard(teamType: string): Promise<ServiceResponse<TLeaderboard[]>>
}
