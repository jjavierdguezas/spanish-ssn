import { assert } from 'chai';
import { isValidSsn, validateSsn } from '../src';
import { SsnValidationErrorCode } from '../src/types';

describe('`validateSsn` Tests', () => {
  it(`should fail with \`${SsnValidationErrorCode.INVALID_LENGTH}\` for '123'`, () => {
    const result = validateSsn('123');
    assert.isNotNull(result);
    assert.isFalse(result.isValid);
    assert.equal(result.errorCode, SsnValidationErrorCode.INVALID_LENGTH);
  });
  it(`should fail with \`${SsnValidationErrorCode.INVALID_CHAR}\` for '28099999996x'`, () => {
    const result = validateSsn('28099999996x');
    assert.isNotNull(result);
    assert.isFalse(result.isValid);
    assert.equal(result.errorCode, SsnValidationErrorCode.INVALID_CHAR);
  });
  it(`should fail with \`${SsnValidationErrorCode.INVALID_PROVINCE_CODE}\` for '770999999969'`, () => {
    const result = validateSsn('770999999969');
    assert.isNotNull(result);
    assert.isFalse(result.isValid);
    assert.equal(
      result.errorCode,
      SsnValidationErrorCode.INVALID_PROVINCE_CODE
    );
  });
  it(`should fail with \`${SsnValidationErrorCode.INVALID_CONTROL_DIGITS}\` for '280999999961'`, () => {
    const result = validateSsn('280999999961');
    assert.isNotNull(result);
    assert.isFalse(result.isValid);
    assert.equal(
      result.errorCode,
      SsnValidationErrorCode.INVALID_CONTROL_DIGITS
    );
  });
  it("should success for '280999999969'", () => {
    const result = validateSsn('280999999969');
    assert.isNotNull(result);
    assert.isTrue(result.isValid, `errorCode: ${result.errorCode}`);
    assert.isUndefined(result.errorCode);
  });
  it("should success for '280999999969' and extract valid data", () => {
    const result = validateSsn('280999999969');
    assert.isNotNull(result);
    assert.isTrue(result.isValid, `errorCode: ${result.errorCode}`);
    assert.isUndefined(result.errorCode);
    assert.equal(result.provinceCode, '28');
    assert.equal(result.province, 'Madrid');
    assert.equal(result.number, '289999999');
    assert.equal(result.controlDigits, '69');
  });
  it("should success for '28999999969' and extract valid data", () => {
    const result = validateSsn('28999999969');
    assert.isNotNull(result);
    assert.isTrue(result.isValid, `errorCode: ${result.errorCode}`);
    assert.isUndefined(result.errorCode);
    assert.equal(result.provinceCode, '28');
    assert.equal(result.province, 'Madrid');
    assert.equal(result.number, '289999999');
    assert.equal(result.controlDigits, '69');
  });
  it("should success for '280012345666' and extract valid data", () => {
    const result = validateSsn('280012345666');
    assert.isNotNull(result);
    assert.isTrue(result.isValid, `errorCode: ${result.errorCode}`);
    assert.isUndefined(result.errorCode);
    assert.equal(result.provinceCode, '28');
    assert.equal(result.province, 'Madrid');
    assert.equal(result.number, '280123456');
    assert.equal(result.controlDigits, '66');
  });
  it("should success for '28012345666' and extract valid data", () => {
    const result = validateSsn('28012345666');
    assert.isNotNull(result);
    assert.isTrue(result.isValid, `errorCode: ${result.errorCode}`);
    assert.isUndefined(result.errorCode);
    assert.equal(result.provinceCode, '28');
    assert.equal(result.province, 'Madrid');
    assert.equal(result.number, '280123456');
    assert.equal(result.controlDigits, '66');
  });
  it("should success for '281000000016' and extract valid data", () => {
    const result = validateSsn('281000000016');
    assert.isNotNull(result);
    assert.isTrue(result.isValid, `errorCode: ${result.errorCode}`);
    assert.isUndefined(result.errorCode);
    assert.equal(result.provinceCode, '28');
    assert.equal(result.province, 'Madrid');
    assert.equal(result.number, '2810000000');
    assert.equal(result.controlDigits, '16');
  });
});

describe('`isValidSsn` Tests', () => {
  it("should return `false` for '123'", () => {
    const result = isValidSsn('123');
    assert.isFalse(result);
  });
  it("should return `false` for '28099999996x'", () => {
    const result = isValidSsn('28099999996x');
    assert.isFalse(result);
  });
  it("should return `false` for '770999999969'", () => {
    const result = isValidSsn('770999999969');
    assert.isFalse(result);
  });
  it("should return `false` for '280999999961'", () => {
    const result = isValidSsn('280999999961');
    assert.isFalse(result);
  });
  it("should return `true` for '280999999969", () => {
    const result = isValidSsn('280999999969');
    assert.isTrue(result);
  });
  it("should return `true` for '280999999969'", () => {
    const result = validateSsn('280999999969');
    assert.isNotNull(result);
    assert.isTrue(result.isValid, `errorCode: ${result.errorCode}`);
    assert.isUndefined(result.errorCode);
    assert.equal(result.provinceCode, '28');
    assert.equal(result.province, 'Madrid');
    assert.equal(result.number, '289999999');
    assert.equal(result.controlDigits, '69');
  });
  it("should return `true` for '280012345666'", () => {
    const result = validateSsn('280012345666');
    assert.isNotNull(result);
    assert.isTrue(result.isValid, `errorCode: ${result.errorCode}`);
    assert.isUndefined(result.errorCode);
    assert.equal(result.provinceCode, '28');
    assert.equal(result.province, 'Madrid');
    assert.equal(result.number, '280123456');
    assert.equal(result.controlDigits, '66');
  });
  it("should return `true` for '281000000016'", () => {
    const result = validateSsn('281000000016');
    assert.isNotNull(result);
    assert.isTrue(result.isValid, `errorCode: ${result.errorCode}`);
    assert.isUndefined(result.errorCode);
    assert.equal(result.provinceCode, '28');
    assert.equal(result.province, 'Madrid');
    assert.equal(result.number, '2810000000');
    assert.equal(result.controlDigits, '16');
  });
});
