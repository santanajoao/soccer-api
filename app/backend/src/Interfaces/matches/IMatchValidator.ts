import ServiceResponse from '../TServiceResponse';

export default interface IMatchValidator {
  validateTeams(homeTeamId: number, awayTeamId: number): Promise<ServiceResponse<null>>;
}
