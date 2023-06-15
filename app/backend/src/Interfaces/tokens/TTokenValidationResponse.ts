type InvalidTokenResponse = {
  valid: false,
  data: null,
};

type ValidTokenResponse<T> = {
  valid: true,
  data: T
};

type TokenValidationResponse<T> = InvalidTokenResponse | ValidTokenResponse<T>;

export default TokenValidationResponse;
