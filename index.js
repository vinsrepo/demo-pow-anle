var abi = require('ethereumjs-abi');

var paramerTypes = ['address', 'string', 'uint'];
var paramerValues = ['0xa7c5973e2b760b62f5d6a2557c1078fff2adc2aa', 'An', '18'];

var encoded = abi.rawEncode(paramerTypes, paramerValues);

console.log('Encoded: \n', encoded.toString('hex'));