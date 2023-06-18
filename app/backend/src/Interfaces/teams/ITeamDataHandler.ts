import { TLeaderboard, TTeamsWithMatches } from './ITeam';

export default interface ITeamDataHandler {
  getLeaderboard(teams: TTeamsWithMatches[], type: string): TLeaderboard[];
}
