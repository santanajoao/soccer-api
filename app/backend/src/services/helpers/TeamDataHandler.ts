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
        updatedResults.totalVictories += 1;
      } else if (goals < opponentGoals) {
        updatedResults.totalLosses += 1;
      } else {
        updatedResults.totalDraws += 1;
      }

      return updatedResults;
    }, {
      totalVictories: 0, totalDraws: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0,
    });

    return gameResults;
  };

  private getEfficiency = (points: number, totalGames: number) => {
    const efficiency = (points / (totalGames * 3)) * 100;
    return efficiency.toFixed(2);
  };

  private getFinishedMatches = (team: TTeamsWithMatches, type: string) => {
    let finishedHomeMatches: IMatch[] = [];
    let finishedAwayMatches: IMatch[] = [];

    if (type === 'all' || type === 'home') {
      finishedHomeMatches = team.homeMatches.filter((match) => !match.inProgress);
    }
    if (type === 'all' || type === 'away') {
      finishedAwayMatches = team.awayMatches.filter((match) => !match.inProgress);
    }

    const finishedMatches = this.formatMatches(finishedHomeMatches, finishedAwayMatches);
    return finishedMatches;
  };

  private sortLeaderboard = (leaderboard: TLeaderboard[]) => {
    const sorted = leaderboard.sort((a, b) => {
      const pointsDiff = b.totalPoints - a.totalPoints;
      if (pointsDiff !== 0) return pointsDiff;
      const victoriesDiff = b.totalVictories - a.totalVictories;
      if (victoriesDiff !== 0) return victoriesDiff;
      const goalsBalanceDiff = b.goalsBalance - a.goalsBalance;
      if (goalsBalanceDiff !== 0) return goalsBalanceDiff;
      return b.goalsFavor - a.goalsFavor;
    });
    return sorted;
  };

  public getLeaderboard = (teams: TTeamsWithMatches[], type: string): TLeaderboard[] => {
    const leaderboard = teams.map((team) => {
      const finishedMatches = this.getFinishedMatches(team, type);
      const results = this.getResults(finishedMatches);
      const points = results.totalVictories * 3 + results.totalDraws;
      return {
        name: team.teamName,
        totalPoints: points,
        totalGames: finishedMatches.length,
        ...results,
        goalsFavor: results.goalsFavor,
        goalsOwn: results.goalsOwn,
        goalsBalance: results.goalsFavor - results.goalsOwn,
        efficiency: this.getEfficiency(points, finishedMatches.length),
      };
    });
    return this.sortLeaderboard(leaderboard);
  };
}

export default TeamDataHandler;
