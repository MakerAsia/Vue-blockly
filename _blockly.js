const Blockly = require('./dist/blockly_compressed');
Blockly.Blocks = Object.assign(Blockly.Blocks, require('./dist/blocks_compressed')(Blockly));
Blockly.JavaScript = require('./dist/javascript_compressed')(Blockly);
Blockly.Msg = require('./dist/msg/en');
module.exports = Blockly;