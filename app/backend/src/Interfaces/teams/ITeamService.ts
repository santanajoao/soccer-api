import ServiceResponse from '../TServiceResponse';
import ITeam from './ITeam';

export default interface ITeamService {
  getAll(): Promise<ServiceResponse<ITeam[]>>;
  getById(id: number): Promise<ServiceResponse<ITeam>>;
}
