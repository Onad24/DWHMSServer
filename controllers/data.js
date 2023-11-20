import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import initModels from '../models/init-models.cjs';
import moment from 'moment/moment.js';

// import sched_list from '../models/sched_list.js';
// import departments from '../models/departments.js';
// import roles from '../models/roles.js';
// import patients from '../models/patients.js';
import { newDB } from '../utils/database.js';
import { Sequelize } from 'sequelize';

const models = initModels(newDB);
const Op = Sequelize.Op;
// const insert = (req, res, next) => {
//   // checks if email already exists
//   Users.findOne({
//     where: {
//       email: req.body.email,
//     },
//   })
//     .then((dbUser) => {
//       if (dbUser) {
//         return res.status(409).json({ message: 'email already exists' });
//       } else if (req.body.email && req.body.password) {
//         // password hash
//         bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
//           if (err) {
//             return res
//               .status(500)
//               .json({ message: 'couldnt hash the password' });
//           } else if (passwordHash) {
//             return Users.create({
//               email: req.body.email,
//               password: passwordHash,
//               firstName: req.body.firstName,
//               middleName: req.body.middleName,
//               lastName: req.body.lastName,
//               phone: req.body.phone,
//               address: req.body.address,
//               status: req.body.status,
//               birthDate: req.body.birthdate,
//             })
//               .then(() => {
//                 res.status(200).json({ message: 'user created' });
//               })
//               .catch((err) => {
//                 console.log(err);
//                 res
//                   .status(502)
//                   .json({ message: 'error while creating the user' });
//               });
//           }
//         });
//       } else if (!req.body.password) {
//         return res.status(400).json({ message: 'password not provided' });
//       } else if (!req.body.email) {
//         return res.status(400).json({ message: 'email not provided' });
//       }
//     })
//     .catch((err) => {
//       console.log('error', err);
//     });
// };

// const select = (req, res, next) => {
//   // checks if email exists
//   Users.findOne({
//     where: {
//       emailAddress: req.body.email,
//     },
//   })
//     .then((dbUser) => {
//       if (!dbUser) {
//         return res.status(404).json({ message: 'user not found' });
//       } else {
//         // password hash
//         bcrypt.compare(
//           req.body.password,
//           dbUser.password,
//           (err, compareRes) => {
//             if (err) {
//               // error while comparing
//               res
//                 .status(502)
//                 .json({ message: 'error while checking user password' });
//             } else if (compareRes) {
//               // password match
//               const token = jwt.sign({ email: req.body.email }, 'secret', {
//                 expiresIn: '1h',
//               });
//               res.status(200).json({ message: 'user logged in', token: token });
//             } else {
//               // password doesnt match
//               res.status(401).json({ message: 'invalid credentials' });
//             }
//           }
//         );
//       }
//     })
//     .catch((err) => {
//       console.log('error', err);
//     });
// };

const getDepartments = (req, res, next) => {
  // checks if email exists
  models.departments
    .findAll()
    .then((dbContent) => {
      if (!dbContent) {
        res.status(404).json({ message: 'no data found' });
      } else {
        res.status(200).json({ message: 'fetched data', data: dbContent });
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
};

const getRoles = (req, res, next) => {
  // checks if email exists
  models.roles
    .findAll()
    .then((dbContent) => {
      if (!dbContent) {
        res.status(404).json({ message: 'no data found' });
      } else {
        res.status(200).json({ message: 'fetched data', data: dbContent });
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
};

const getLabTest = (req, res, next) => {
  // checks if email exists
  newDB
    .query(
      "SELECT CODE, DESCRIPTION FROM LABORATORY_TYPES where CODE != 'N/A' AND  CODE != '' ORDER BY DESCRIPTION"
    )
    .then((dbContent) => {
      if (!dbContent) {
        res.status(404).json({ message: 'no data found' });
      } else {
        res.status(200).json({ message: 'fetched data', data: dbContent });
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
};

const getBarangay = (req, res, next) => {
  // checks if email exists
  newDB
    .query(
      "SELECT A.CODE, A.DESCRIPTION, B.CODE AS LOCATION FROM BARANGAYS AS A INNER JOIN MUNICIPALITIES AS B ON A.Location = B.DESCRIPTION where A.Location != '' and A.CODE != '' ORDER BY A.DESCRIPTION"
    )
    .then((dbContent) => {
      if (!dbContent) {
        res.status(404).json({ message: 'no data found' });
      } else {
        res.status(200).json({ message: 'fetched data', data: dbContent });
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
};

const getMunicipality = (req, res, next) => {
  // checks if email exists
  newDB
    .query(
      "SELECT A.CODE,A.DESCRIPTION,B.CODE AS AREA FROM MUNICIPALITIES AS A INNER JOIN PROVINCES AS B ON A.Area = B.DESCRIPTION where A.CODE != '' ORDER BY A.DESCRIPTION;"
    )
    .then((dbContent) => {
      if (!dbContent) {
        res.status(404).json({ message: 'no data found' });
      } else {
        res.status(200).json({ message: 'fetched data', data: dbContent });
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
};

const getProvinces = (req, res, next) => {
  // checks if email exists
  newDB
    .query(
      "SELECT CODE, DESCRIPTION FROM PROVINCES WHERE CODE != '' ORDER BY DESCRIPTION;"
    )
    .then((dbContent) => {
      if (!dbContent) {
        res.status(404).json({ message: 'no data found' });
      } else {
        res.status(200).json({ message: 'fetched data', data: dbContent });
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
};

const insertPatient = (req, res, next) => {
  // checks if email already exists

  models.patients
    .create({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      area: req.body.area,
      barangay: req.body.barangay,
      municipality: req.body.municipality,
      zipCode: parseInt(req.body.zipCode),
      phoneNo: req.body.phoneNo,
    })
    .then((response) => {
      res.status(200).json({ success: true, message: 'patient added' });
    })
    .catch((err) => {
      res
        .status(502)
        .json({ success: false, message: 'error while adding patient' });
    });
};

const getPatientByName = (req, res, next) => {
  models.patients
    .findAll({
      limit: 10,
      order: [['id', 'DESC']],
      where: {
        [Op.or]: [
          {
            lastName: { [Op.like]: req.query.name + '%' },
          },
          {
            firstName: { [Op.like]: req.query.name + '%' },
          },
        ],
      },
    })
    .then((data) => {
      return res.status(200).json({ message: 'Patients Migrated', data: data });
    })
    .catch((error) => {
      console.log(error);
    });
};

const getPatients = (req, res, next) => {
  const namefix = req.query.name.replaceAll(' ', '').replaceAll(',', '');
  models.patients
    .findAndCountAll({
      limit: 20,
      offset: parseInt(req.query.page),
      order: [['id', 'DESC']],
      where: {
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn(
              'concat',
              Sequelize.col('firstname'),
              Sequelize.col('lastname')
            ),
            {
              [Op.like]: namefix + '%',
            }
          ),
          Sequelize.where(
            Sequelize.fn(
              'concat',
              Sequelize.col('lastname'),
              Sequelize.col('firstname')
            ),
            {
              [Op.like]: namefix + '%',
            }
          ),
        ],
      },
    })
    .then(async (data) => {
      // console.log(data.count);
      // const _count = await models.patients.count();
      return res.status(200).json({
        message: 'Patients Migrated',
        data: data.rows,
        count: data.count,
      });
    });
};

// const getSched = (req, res, next) => {
//   // checks if email exists

//   const today = new Date(req.query.date);
//   const tomorrow = new Date(today);
//   tomorrow.setDate(tomorrow.getDate() + 1);

//   models.sched_list
//     .findAll({
//       where: {
//         schedTime: {
//           [Op.gte]: Sequelize.fn('date', today),
//           [Op.lte]: Sequelize.fn('date', tomorrow),
//         },
//       },
//     })
//     .then((dbContent) => {
//       if (!dbContent) {
//         res.status(404).json({ message: 'no data found' });
//       } else {
//         res.status(200).json({ message: 'fetched data', data: dbContent });
//       }
//     })
//     .catch((err) => {
//       console.log('error', err);
//     });
// };

const getSched = (req, res, next) => {
  // checks if email exists

  const today = moment(req.query.date).format('YYYY-MM-DD 00:00:00');
  const tomorrow = moment(req.query.date)
    .add(1, 'd')
    .format('YYYY-MM-DD 00:00:00');
  models.schedules
    .findAll({
      where: {
        schedTime: {
          [Op.gte]: Sequelize.fn('date', today),
          [Op.lt]: Sequelize.fn('date', tomorrow),
        },
      },
    })
    .then((dbContent) => {
      if (!dbContent) {
        res.status(404).json({ message: 'no data found' });
      } else {
        res.status(200).json({ message: 'fetched data', data: dbContent });
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
};

const getSchedCount = (req, res, next) => {
  // checks if email exists

  const today = moment
    .utc(req.query.date)
    .date(1)
    .format('YYYY-MM-DD 00:00:00');
  const tomorrow = moment
    .utc(req.query.date)
    .date(1)
    .add(1, 'M')
    .format('YYYY-MM-DD 00:00:00');
  models.schedules
    .findAll({
      where: {
        schedTime: {
          [Op.gte]: Sequelize.fn('date', today),
          [Op.lte]: Sequelize.fn('date', tomorrow),
        },
      },
    })
    .then((dbContent) => {
      if (!dbContent) {
        res.status(404).json({ message: 'no data found' });
      } else {
        res.status(200).json({ message: 'fetched data', data: dbContent });
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
};

const getSMS = (req, res, next) => {
  models.schedules
    .findAll({
      where: {
        notificationSent: {
          [Op.ne]: 3,
        },
      },
    })
    .then((dbContent) => {
      console.log(dbContent);
      if (!dbContent) {
        res.status(404).json({ message: 'no data found' });
      } else {
        res.status(200).json({ message: 'fetched data', data: dbContent });
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
};

const updateSMS = (req, res, next) => {
  console.log(req.body.notificationSent);
  console.log(req.body.id);
  models.schedules
    .update(
      { notificationSent: parseInt(req.body.notificationSent) + 1 },
      {
        where: {
          id: parseInt(req.body.id),
        },
      }
    )
    .then((dbContent) => {
      console.log(dbContent);
      if (!dbContent) {
        res.status(404).json({ message: 'no data found' });
      } else {
        res.status(200).json({ message: 'fetched data', data: dbContent });
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
};

const getRequests = (req, res, next) => {
  const namefix = req.query.name.replaceAll(' ', '').replaceAll(',', '');

  let _approved = [null];

  if (req.query.viewAll == 1) {
    _approved = [null, 1];
  }
  models.sched_info
    .findAndCountAll({
      where: {
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn(
              'concat',
              Sequelize.col('firstname'),
              Sequelize.col('lastname')
            ),
            {
              [Op.like]: namefix + '%',
            }
          ),
          Sequelize.where(
            Sequelize.fn(
              'concat',
              Sequelize.col('lastname'),
              Sequelize.col('firstname')
            ),
            {
              [Op.like]: namefix + '%',
            }
          ),
        ],
        approved: { [Op.or]: _approved },
      },
      limit: 20,
      offset: parseInt(req.query.page),
      attributes: [
        'id',
        'requestId',
        [
          Sequelize.fn('GROUP_CONCAT', Sequelize.col('additionalRemarks')),
          'additionalRemarks',
        ],
        'firstName',
        'lastName',
        'middleName',
        [Sequelize.fn('GROUP_CONCAT', Sequelize.col('labCode')), 'labCode'],
        [Sequelize.fn('MIN', Sequelize.col('schedTime')), 'schedTime'],
      ],
      group: ['requestId'],
    })
    .then(async (data) => {
      return res.status(200).json({
        message: 'Patients Migrated',
        data: data.rows,
        count: data.count,
      });
    });
};

const getScheduledRequests = (req, res, next) => {
  const namefix = req.query.name.replaceAll(' ', '').replaceAll(',', '');

  models.sched_info
    .findAndCountAll({
      where: {
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn(
              'concat',
              Sequelize.col('firstname'),
              Sequelize.col('lastname')
            ),
            {
              [Op.like]: namefix + '%',
            }
          ),
          Sequelize.where(
            Sequelize.fn(
              'concat',
              Sequelize.col('lastname'),
              Sequelize.col('firstname')
            ),
            {
              [Op.like]: namefix + '%',
            }
          ),
        ],
        approved: 1,
      },
      limit: 20,
      offset: parseInt(req.query.page),
      attributes: [
        'id',
        'caseID',
        'requestId',
        [Sequelize.fn('MIN', Sequelize.col('schedTime')), 'schedTime'],
        [Sequelize.fn('MIN', Sequelize.col('schedDuration')), 'schedDuration'],
        [
          Sequelize.fn('GROUP_CONCAT', Sequelize.col('additionalRemarks')),
          'additionalRemarks',
        ],
        'firstName',
        'lastName',
        'middleName',
        [Sequelize.fn('GROUP_CONCAT', Sequelize.col('labCode')), 'labCode'],
      ],
      group: ['requestId'],
    })
    .then(async (data) => {
      return res.status(200).json({
        message: 'Patients Migrated',
        data: data.rows,
        count: data.count,
      });
    });
};

const insertLabRequests = (req, res, next) => {
  // checks if email already exists
  models.cases
    .create({
      patientID: parseInt(req.body.patientID),
    })
    .then((response) => {
      models.laboratory_request
        .create({
          caseID: parseInt(response.id),
          patientID: parseInt(req.body.patientID),
          staffID: parseInt(req.body.staffID),
          otherRemarks: req.body.otherRemarks,
        })
        .then((response) => {
          const tests = JSON.parse(req.body.labRequests);
          tests.map((data) => {
            models.laboratory_request_tests.create({
              requestID: parseInt(response.id),
              labCode: data.testID,
              additionalRemarks: data.testRemarks,
            });
          });
          res.status(200).json({ success: true, message: 'patient added' });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(502)
            .json({ success: false, message: 'error while adding patient' });
        });
    });
};

const insertSchedule = (req, res, next) => {
  // checks if email already exists

  models.schedules
    .create({
      schedTime: req.body.schedTime,
      schedDuration: req.body.schedDuration,
      patientID: req.body.patientId,
      requestID: req.body.requestId,
    })
    .then((response) => {
      models.laboratory_request.update(
        { approved: req.body.approved },
        {
          where: {
            id: req.body.requestId,
          },
        }
      );
      res.status(200).json({ success: true, message: 'patient added' });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(502)
        .json({ success: false, message: 'error while adding patient' });
    });
};

export {
  getDepartments,
  getRoles,
  getBarangay,
  getMunicipality,
  getProvinces,
  insertPatient,
  getRequests,
  getScheduledRequests,
  getPatientByName,
  getPatients,
  getSched,
  getLabTest,
  insertLabRequests,
  insertSchedule,
  getSMS,
  updateSMS,
  getSchedCount,
};
