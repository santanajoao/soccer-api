import ITeam from "../../Interfaces/teams/ITeam";

const teamList: ITeam[] = [
  { id: 1, teamName: 'a' },
  { id: 2, teamName: 'b' },
];

const teamListWithExtraProps = teamList
  .map((team: ITeam) => ({ ...team, extra: null }));

export default {
  teamList,
  teamListWithExtraProps,
};
