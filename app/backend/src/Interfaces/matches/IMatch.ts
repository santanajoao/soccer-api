export default interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

type TTeamName = {
  teamName: string;
};

export type TMatchWithTeamNames = IMatch & {
  homeTeam: TTeamName;
  awayTeam: TTeamName;
};

export type TMatchParams = Partial<IMatch>;
