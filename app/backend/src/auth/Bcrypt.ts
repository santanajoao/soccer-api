import * as bcrypt from 'bcryptjs';
import IEncrypter from '../Interfaces/IEncrypter';

class Bcrypt implements IEncrypter {
  private encrypter = bcrypt;

  compare(data: string, hash: string): boolean {
    const isEqual = this.encrypter.compareSync(data, hash);
    return isEqual;
  }
}

export default Bcrypt;
