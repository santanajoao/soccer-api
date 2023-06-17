import { ErrorStatus } from '../Interfaces/TServiceResponse';

class HTTP {
  public static mapStatus = (status: ErrorStatus): number => {
    switch (status) {
      case 'NOT_FOUND': return 404;
      case 'UNAUTHORIZED': return 401;
      case 'INVALID_VALUE': return 400;
      case 'UNPROCESSABLE_CONTENT': return 422;
      default: return 500;
    }
  };
}

export default HTTP;
