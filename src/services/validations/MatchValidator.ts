import ServiceResponse from '../../Interfaces/TServiceResponse';
import IMatchModel from '../../Interfaces/matches/IMatchModel';
import ITeamModel from '../../Interfaces/teams/ITeamModel';

class MatchValidator {
  private matchModel: IMatchModel;
  private teamModel: ITeamModel;

  constructor(matchModel: IMatchModel, teamModel: ITeamModel) {
    this.matchModel = matchModel;
    this.teamModel = teamModel;
  }

  public validateTeamsExistance = async (
    homeTeamId: number,
    awayTeamId: number,
  ): Promise<ServiceResponse<null>> => {
    const teams = await this.teamModel.findManyById([homeTeamId, awayTeamId]);
    if (teams.length < 2) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    return { status: 'SUCCESS', data: null };
  };

  public validateIds = (homeTeamId: number, awayTeamId: number): ServiceResponse<null> => {
    if (homeTeamId === awayTeamId) {
      return {
        status: 'UNPROCESSABLE_CONTENT',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    return { status: 'SUCCESS', data: null };
  };

  public validateTeams = async (
    homeTeamId: number,
    awayTeamId: number,
  ): Promise<ServiceResponse<null>> => {
    const idValidation = this.validateIds(homeTeamId, awayTeamId);
    if (idValidation.status !== 'SUCCESS') return idValidation;

    const existanceValidation = await this.validateTeamsExistance(homeTeamId, awayTeamId);
    return existanceValidation;
  };
}

export default MatchValidator;
