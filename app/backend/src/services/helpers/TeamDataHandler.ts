import ITeamDataHandler from '../../Interfaces/teams/ITeamDataHandler';
import { TLeaderboard, TResults, TTeamsWithMatches } from '../../Interfaces/teams/ITeam';
import IMatch, { TMatchesGoals } from '../../Interfaces/matches/IMatch';

class TeamDataHandler implements ITeamDataHandler {
  private formatMatches = (homeMatches: IMatch[], awayMatches: IMatch[]): TMatchesGoals[] => {
    const formattedHomeMatches = homeMatches
      .map(({ homeTeamGoals, awayTeamGoals }) => ({
        goals: homeTeamGoals,
        opponentGoals: awayTeamGoals,
      }));

    const formattedAwayMatches = awayMatches
      .map(({ homeTeamGoals, awayTeamGoals }) => ({
        goals: awayTeamGoals,
        opponentGoals: homeTeamGoals,
      }));

    return [...formattedHomeMatches, ...formattedAwayMatches];
  };

  private getResults = (matches: TMatchesGoals[]): TResults => {
    const gameResults = matches.reduce((results, match) => {
      const updatedResults = { ...results };
      const { goals, opponentGoals } = match;

      updatedResults.goalsFavor += goals;
      updatedResults.goalsOwn += opponentGoals;

      if (goals > opponentGoals) {
        updatedResults.victories += 1;
      } else if (goals < opponentGoals) {
        updatedResults.losses += 1;
      } else {
        updatedResults.draws += 1;
      }

      return updatedResults;
    }, { victories: 0, draws: 0, losses: 0, goalsFavor: 0, goalsOwn: 0 });

    return gameResults;
  };

  public getLeaderboard = (teams: TTeamsWithMatches[]): TLeaderboard[] => {
    const leaderboard = teams.map((team) => {
      const finishedHomeMatches = team.homeMatches.filter((match) => !match.inProgress);
      const finishedAwayMatches = team.awayMatches.filter((match) => !match.inProgress);
      const finishedMatches = this.formatMatches(finishedHomeMatches, finishedAwayMatches);
      const results = this.getResults(finishedMatches);
      const points = results.victories * 3 + results.draws;

      return {
        name: team.teamName,
        totalPoints: points,
        totalGames: finishedMatches.length,
        totalVictories: results.victories,
        totalDraws: results.draws,
        totalLosses: results.losses,
        goalsFavor: results.goalsFavor,
        goalsOwn: results.goalsOwn,
      };
    });

    return leaderboard;
  };
}

export default TeamDataHandler;
