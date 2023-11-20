var DataTypes = require('sequelize').DataTypes;
var _departments = require('./departments.cjs');
var _patient_authentications = require('./patient_authentications.cjs');
var _patients = require('./patients.cjs');
var _roles = require('./roles.cjs');
var _sched_list = require('./sched_list.cjs');
var _sched_info = require('./sched_info.cjs');
var _sched_purposes = require('./sched_purposes.cjs');
var _schedules = require('./schedules.cjs');
var _users = require('./users.cjs');
var _laboratory_request = require('./laboratory_request.cjs');
var _laboratory_request_tests = require('./laboratory_request_tests.cjs');
var _cases = require('./cases.cjs');

function initModels(sequelize) {
  var departments = _departments(sequelize, DataTypes);
  var patient_authentications = _patient_authentications(sequelize, DataTypes);
  var patients = _patients(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var sched_list = _sched_list(sequelize, DataTypes);
  var sched_info = _sched_info(sequelize, DataTypes);
  var sched_purposes = _sched_purposes(sequelize, DataTypes);
  var schedules = _schedules(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var laboratory_request = _laboratory_request(sequelize, DataTypes);
  var cases = _cases(sequelize, DataTypes);
  var laboratory_request_tests = _laboratory_request_tests(
    sequelize,
    DataTypes
  );

  return {
    departments,
    patient_authentications,
    patients,
    roles,
    sched_list,
    sched_info,
    sched_purposes,
    schedules,
    users,
    laboratory_request,
    laboratory_request_tests,
    cases,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
