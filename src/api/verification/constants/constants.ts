export const VERIFY_KEY_TIMESTAMP = 1200000;

export enum VERIFICATION_OK {
  SUCCESS_VERIFICATION = 'user is verified',
}

export enum VERIFICATION_BAD_REQUEST_ERRORS {
  OVERSTAYED = 'Sorry, but you overstayed your verification key. Please reauthenticate',
  WRONG_KEY = 'Wrong verification key',
}

export enum VERIFICATION_SERVER_ERRORS {
  FAILED = 'Failed to send email',
}

export const VERIFY_EXAMPLE = {
  jwtToken: "jwtToken",
  refreshToken: "refreshToken",
}