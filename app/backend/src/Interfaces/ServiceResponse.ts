type ErrorStatuses = 'NOT_FOUND' | 'UNAUTHORIZED' | 'INTERNAL_SERVER_ERROR';

type SuccessResponse<T> = {
  status: 'SUCCESS';
  data: T;
};

type ErrorMessageObject = {
  message: string;
};

type ErrorResponse = {
  status: ErrorStatuses;
  data: ErrorMessageObject;
};

type ServiceResponse<T> = SuccessResponse<T> | ErrorResponse;

export default ServiceResponse;
