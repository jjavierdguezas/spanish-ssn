# `spanish-ssn`

Spanish Social Security Number validation library

## Instalation

```shell
> npm install spanish-ssn
or
> yarn add spanish-ssn
```

## Definitions

```typescript
isValidSsn: (str: string) => boolean;

validateSsn: (str: string) => SsnValidationResult;

type SsnValidationResult = {
  isValid: boolean;

  //if isValid === false
  errorCode: SsnValidationErrorCode;

  //if isValid === true
  provinceCode: string;
  province: string;
  number: string;
  controlDigits: string;
};

enum SsnValidationErrorCode {
  INVALID_LENGTH,
  INVALID_CHAR,
  INVALID_PROVINCE_CODE,
  INVALID_CONTROL_DIGITS
}
```

## Usage

```typescript
import { isValidSsn, validateSsn } from 'spanish-ssn';

const ok1 = isValidSsn('770999999969'); // returns false
const ok2 = isValidSsn('280999999969'); // returns true

const result1 = validateSsn('770999999969');
/* returns
{
  isValid: false,
  errorCode: 'INVALID_PROVINCE_CODE'
}
*/

const result2 = validateSsn('280999999969');
/* returns
{
  isValid: true,
  provinceCode: '28'
  province: 'Madrid'
  number: '2809999999'
  controlDigits: '69'
}
*/
```

## Disclaimer

I have not found any _official_ place where it is well explained how social security numbers are formed, this lib is the product of research on various online sites (ie: [www.migoia.com](http://www.migoia.com/migoia/util/NSS/NSS.pdf)). I am not responsible for any malfunction. PRs are welcome.
