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
  totalVictories: number;
  totalLosses: number;
  totalDraws: number;
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
  efficiency: string;
  goalsBalance: number;
};
