"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
module.exports = swaggerDocument;
exports.default = swaggerDocument;
