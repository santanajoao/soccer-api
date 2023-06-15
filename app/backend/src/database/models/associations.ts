import SequelizeTeam from './SequelizeTeam';
import SequelizeMatch from './SequelizeMatch';

SequelizeMatch.belongsTo(SequelizeTeam, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeTeam.hasMany(SequelizeMatch, { foreignKey: 'homeTeamId', as: 'homeTeam' });

SequelizeMatch.belongsTo(SequelizeTeam, { foreignKey: 'awayTeamId', as: 'awayTeam' });
SequelizeTeam.hasMany(SequelizeMatch, { foreignKey: 'awayTeamId', as: 'awayTeam' });
