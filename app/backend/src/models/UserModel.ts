import IUserModel from '../Interfaces/users/IUserModel';
import IUser from '../Interfaces/users/IUser';
import SequelizeUser from '../database/models/SequelizeUser';

class UserModel implements IUserModel {
  private model = SequelizeUser;

  public findByEmail = async (email: string): Promise<IUser | null> => {
    const sequelizeUser = await this.model.findOne({
      where: { email },
    });

    if (!sequelizeUser) return null;

    return sequelizeUser.dataValues;
  };
}

export default UserModel;
