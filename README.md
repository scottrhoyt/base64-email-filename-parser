base64-email-filename-parser
----------------------------

## Installation

```sh
npm install base64-email-filename-parser
```

## Usage

`fileName` should be of the format `<base64-email>.<id>.<extension>`.

```js
var parser = require('base64-email-filename-parser');

var fileName = 'am9obi5kb2VAZW1haWwuY29t.1.txt';
var parsed = parser(fileName, 'txt');

console.log(parsed);
/*
{
  email: 'john.doe@email.com',
  id: '1',
  extension: 'txt'
}
*/
```
