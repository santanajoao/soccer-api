import IMatch from '../matches/IMatch';

export default interface ITeam {
  id: number;
  teamName: string;
}

export type TTeamsWithMatches = ITeam & {
  homeMatches: IMatch[];
  awayMatches: IMatch[];
};

export type TResults = {
  victories: number;
  losses: number;
  draws: number;
  goalsFavor: number;
  goalsOwn: number;
};

export type TLeaderboard = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
};
