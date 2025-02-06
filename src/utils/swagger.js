const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

module.exports = swaggerDocument;