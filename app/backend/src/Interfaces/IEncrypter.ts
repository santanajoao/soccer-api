export default interface IEncrypter {
  encrypt(data: string):string;
  compare(data: string, hash: string): boolean;
}
