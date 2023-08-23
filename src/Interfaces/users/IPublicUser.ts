import IUser from './IUser';

type IPublicUser = Omit<IUser, 'password'>;

export default IPublicUser;
