import * as bcrypt from 'bcryptjs';
import IEncrypter from '../Interfaces/IEncrypter';

class Bcrypt implements IEncrypter {
  private encrypter = bcrypt;

  public compare(data: string, hash: string): boolean {
    const isEqual = this.encrypter.compareSync(data, hash);
    return isEqual;
  }

  public encrypt(data: string): string {
    const hash = this.encrypter.hashSync(data);
    return hash;
  }
}

export default Bcrypt;
