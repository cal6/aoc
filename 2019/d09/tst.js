const applyMod = (intCode, modParam, index, relativeBase) => {
  switch (modParam) {
    case 0:
      return intCode[intCode[index]];
    case 1:
      return intCode[index];
    case 2:
      return intCode[intCode[index] + relativeBase];
    default:
      console.log(`Mod parametter ${modParam} not valid!`);
      return -1;
  }
};

const applyModWrite = (intCode, modParam, index, relativeBase) => {
  switch (modParam) {
    case 0:
    case 1:
      return intCode[index];
    case 2:
      return intCode[index] + relativeBase;
    default:
      console.log(`Mod parametter ${modParam} not valid!`);
      return -1;
  }
};

const getOpCodeAndMode = op => {
  const opCode = op.length == 1 ? 0 + op : op[op.length - 2] + op[op.length - 1];
  const mode = op.substring(0, op.length - 2);
  const result = [
    opCode,
    mode
      .split('')
      .reverse()
      .join('')
  ];

  return result;
};

const part1 = (input, userInput = 1) => {
  const intCode = [...input];
  let loopLength = 1;
  let solution = [];
  let relativeBase = 0;
  let parameters = {};
  let error = false;

  for (let index = 0; index < intCode.length && !error; index += loopLength) {
    const operation = getOpCodeAndMode(intCode[index].toString());
    const opCode = parseInt(operation[0]);
    if (opCode === 99) {
      //console.log(`Operation ${opCode} - FINISH`);
      break;
    }
    const modParams = [
      parseInt(operation[1][0] === undefined ? 0 : operation[1][0]),
      parseInt(operation[1][1] === undefined ? 0 : operation[1][1]),
      parseInt(operation[1][2] === undefined ? 0 : operation[1][2])
    ];

    /*console.log(
      `Operation ${opCode}: ${modParams} @${index}-${intCode[index]}:${intCode[index + 1]}:${
        intCode[index + 2]
      }:${intCode[index + 3]}`
    );*/

    switch (opCode) {
      case 1:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase),
          second: applyMod(intCode, modParams[1], index + 2, relativeBase),
          result: applyModWrite(intCode, modParams[2], index + 3, relativeBase)
        };

        intCode[parameters.result] = parameters.first + parameters.second;
        loopLength = 4;
        break;
      case 2:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase),
          second: applyMod(intCode, modParams[1], index + 2, relativeBase),
          result: applyModWrite(intCode, modParams[2], index + 3, relativeBase)
        };

        intCode[parameters.result] = parameters.first * parameters.second;
        loopLength = 4;
        break;
      case 3:
        intCode[applyModWrite(intCode, modParams[0], index + 1, relativeBase)] = userInput;
        loopLength = 2;
        break;
      case 4:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase)
        };

        solution.push(parameters.first);
        loopLength = 2;
        break;
      case 5:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase),
          second: applyMod(intCode, modParams[1], index + 2, relativeBase)
        };

        if (parameters.first != 0) {
          index = parameters.second;
          loopLength = 0;
        } else {
          loopLength = 3;
        }
        break;
      case 6:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase),
          second: applyMod(intCode, modParams[1], index + 2, relativeBase)
        };

        if (parameters.first == 0) {
          index = parameters.second;
          loopLength = 0;
        } else {
          loopLength = 3;
        }
        break;
      case 7:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase),
          second: applyMod(intCode, modParams[1], index + 2, relativeBase),
          result: applyModWrite(intCode, modParams[2], index + 3, relativeBase)
        };

        intCode[parameters.result] = parameters.first < parameters.second ? 1 : 0;
        loopLength = 4;
        break;
      case 8:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase),
          second: applyMod(intCode, modParams[1], index + 2, relativeBase),
          result: applyModWrite(intCode, modParams[2], index + 3, relativeBase)
        };

        intCode[parameters.result] = parameters.first == parameters.second ? 1 : 0;
        loopLength = 4;
        break;
      case 9:
        parameters = {
          first: applyMod(intCode, modParams[0], index + 1, relativeBase)
        };

        relativeBase += parameters.first;
        loopLength = 2;
        break;

      default:
        console.log(`Operation code ${opCode} not valid!`);
        error = true;
        break;
    }
    console.log('Parameters:', index, loopLength, parameters, modParams);
    console.log(`After operation ${opCode}: ${intCode[parameters.result]}`);
    console.log('relativeBase', relativeBase);
  }

  return solution;
};

const input = require('fs').readFileSync('input.txt').toString('utf8').split(',').map(a => parseInt(a, 10));
const ret = part1(input, []);
console.log(ret);