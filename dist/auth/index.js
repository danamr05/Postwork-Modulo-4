"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;
var _apolloServerErrors = require("apollo-server-errors");
var _jsonwebtoken = require("jsonwebtoken");
const verifyToken = token => {
  if (!token) throw new _apolloServerErrors.ApolloError('missing token');
  const decoded = (0, _jsonwebtoken.verify)(token, process.env.JWT_SECRET);
  return !!decoded;
};
exports.verifyToken = verifyToken;