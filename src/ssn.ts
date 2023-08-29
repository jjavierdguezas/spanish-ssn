import { PROVINCE_CODES, PROVINCE_DICT } from './constants';
import { type SsnValidationResult, SsnValidationErrorCode } from './types';

export const isValidSsn = (str: string): boolean => {
  return validateSsn(str).isValid;
};

export const validateSsn = (str: string): SsnValidationResult => {
  if (![11, 12].includes((str ?? '').length))
    return {
      isValid: false,
      errorCode: SsnValidationErrorCode.INVALID_LENGTH
    };

  if (![...str].every((c) => c >= '0' && c <= '9'))
    return {
      isValid: false,
      errorCode: SsnValidationErrorCode.INVALID_CHAR
    };

  // code/number/control
  //   aa/bbbbbbb/cc
  //   aabbbbbbb % 97 === cc
  const l1 = str.slice(0, 2);
  const l2 = str.slice(2, -2);
  const l3 = str.slice(-2);

  if (!PROVINCE_CODES.has(l1))
    return {
      isValid: false,
      errorCode: SsnValidationErrorCode.INVALID_PROVINCE_CODE
    };

  const ns =
    l2[0] === '0' && str.length === 12 ? `${l1}${l2.slice(1)}` : `${l1}${l2}`;
  const r = parseInt(ns) % 97;

  if (r.toString().padStart(2, '0') !== l3)
    return {
      isValid: false,
      errorCode: SsnValidationErrorCode.INVALID_CONTROL_DIGITS
    };

  return {
    isValid: true,
    controlDigits: l3,
    number: ns,
    province: PROVINCE_DICT[l1],
    provinceCode: l1
  };
};
