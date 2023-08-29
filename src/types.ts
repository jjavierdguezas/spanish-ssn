export enum SsnValidationErrorCode {
  INVALID_LENGTH = 'INVALID_LENGTH',
  INVALID_CHAR = 'INVALID_CHAR',
  INVALID_PROVINCE_CODE = 'INVALID_PROVINCE_CODE',
  INVALID_CONTROL_DIGITS = 'INVALID_CONTROL_DIGITS'
}

export type SsnValidationResult =
  | {
      isValid: false;
      errorCode: SsnValidationErrorCode;
      provinceCode?: string;
      province?: string;
      number?: string;
      controlDigits?: string;
    }
  | {
      isValid: true;
      errorCode?: SsnValidationErrorCode;
      provinceCode: string;
      province: string;
      number: string;
      controlDigits: string;
    };
