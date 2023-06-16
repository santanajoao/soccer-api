import IMatch from "../../Interfaces/matches/IMatch";

const matchList: IMatch[] = [
  { id: 1, awayTeamGoals: 1, awayTeamId: 1, homeTeamGoals: 1, homeTeamId: 2, inProgress: false },
]

const sequelizeMatchList = matchList.map((match) => ({ dataValues: match }));

const match = matchList[0];
const sequelizeMatch = sequelizeMatchList[0];

export default {
  match,
  sequelizeMatch,
  sequelizeMatchList,
  matchList,
};
