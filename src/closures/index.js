'use strict';

const argumentFinderRegex = /function\s.*?\(([^)]*)\)/;
const multilineCommentRegex = /\/\*.*\*\//;

const findFunctionArguments = (str) => {
  const [, args] = str.match(argumentFinderRegex);
  return args.split(',');
};

const removeMultilineComments = (str) => str.replace(multilineCommentRegex, '');

const cleanArguments = (args) => args.map((arg) => removeMultilineComments(arg).trim());

const getArgs = (func) => {
  const sourceCode = func.toString();
  const args = findFunctionArguments(sourceCode);
  return cleanArguments(args);
};

const defaultArguments = (func, params = {}) => {
  const closure = (...args) => {
    const argumentNames = getArgs(func);
    const newValues = argumentNames.map((el, index) => args[index] || params[el]);
    return func.apply(this, newValues);
  };

  closure.toString = function toString() {
    return func.toString();
  };

  return closure;
};

module.exports = defaultArguments;
