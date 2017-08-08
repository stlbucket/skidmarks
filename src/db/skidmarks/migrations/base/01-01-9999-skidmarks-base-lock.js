const commandLineArgs = require('command-line-args');
const optionDefinitions = [
  {
    name: 'rollbackBase01',
    type: Boolean
  }
];

const options = commandLineArgs(optionDefinitions, {
  partial: true
});

exports.up = function (knex, Promise) {
}

exports.down = function (knex, Promise) {
  if (!options.rollbackBase01)
    throw new Error(`MUST SPECIFY COMMAND LINE ARG '--rollbackBase' TO ROLLBACK SORO BASE 01 SCRIPTS`)
}
