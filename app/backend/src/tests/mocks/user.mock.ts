import IUser from '../../Interfaces/users/IUser';
import Bcrypt from '../../auth/Bcrypt';

const encrypter = new Bcrypt();

const validEmail = 'test@test.com';
const validPassword = '123456';
const validPasswordHash = encrypter.encrypt(validPassword);

const invalidEmail = '@test.com';
const invalidPassword = '1';

const user: IUser = {
  id: 1,
  email: validEmail,
  password: validPasswordHash,
  role: 'User',
  username: 'test',
};

const userWithExtraProps = {
  ...user,
  extra: null,
};

export default {
  user,
  userWithExtraProps,
  validEmail,
  validPassword,
  invalidEmail,
  invalidPassword,
};
