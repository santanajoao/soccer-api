export type ErrorStatus = 'NOT_FOUND' | 'UNAUTHORIZED' | 'INVALID_VALUE';

type SuccessResponse<T> = {
  status: 'SUCCESS';
  data: T;
};

type ErrorMessageObject = {
  message: string;
};

type ErrorResponse = {
  status: ErrorStatus;
  data: ErrorMessageObject;
};

type ServiceResponse<T> = SuccessResponse<T> | ErrorResponse;

export default ServiceResponse;
