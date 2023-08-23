import ITeam from '../../Interfaces/teams/ITeam';

const teamList: ITeam[] = [
  { id: 1, teamName: 'a' },
  { id: 2, teamName: 'b' },
];

const sequelizeTeamList = teamList.map((team) => ({ dataValues: team }));

const team = teamList[0];
const sequelizeTeam = sequelizeTeamList[0];

export default {
  teamList,
  sequelizeTeamList,
  team,
  sequelizeTeam,
};
