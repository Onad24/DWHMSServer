import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import initModels from '../models/init-models.cjs';
import { newDB } from '../utils/database.js';

const models = initModels(newDB);

const signup = (req, res, next) => {
  // checks if email already exists
  models.users
    .findOne({
      where: {
        emailAddress: req.body.emailAddress,
      },
    })
    .then((dbUser) => {
      if (dbUser) {
        return res.status(409).json({ message: 'email already exists' });
      } else if (req.body.emailAddress && req.body.password) {
        // password hash
        bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
          if (err) {
            return res
              .status(500)
              .json({ message: 'couldnt hash the password' });
          } else if (passwordHash) {
            return models.users
              .create({
                emailAddress: req.body.emailAddress,
                password: passwordHash,
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                extensionName: req.body.extensionName,
                contactNo: req.body.contactNo,
                department: req.body.department,
                role: req.body.role,
                approval: 0,
              })
              .then(() => {
                res.status(200).json({ message: 'user created' });
              })
              .catch((err) => {
                console.log(err);
                res
                  .status(502)
                  .json({ message: 'error while creating the user' });
              });
          }
        });
      } else if (!req.body.password) {
        return res.status(400).json({ message: 'password not provided' });
      } else if (!req.body.emailAddress) {
        return res.status(400).json({ message: 'email not provided' });
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
};

const login = (req, res, next) => {
  // checks if email exists
  models.users
    .findOne({
      where: {
        emailAddress: req.body.emailAddress,
      },
    })
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(404).json({ message: 'user not found' });
      } else {
        // password hash

        bcrypt.compare(
          req.body.password,
          dbUser.password,
          (err, compareRes) => {
            if (err) {
              // error while comparing
              res
                .status(502)
                .json({ message: 'error while checking user password' });
            } else if (compareRes) {
              // password match
              const token = jwt.sign(
                {
                  emailAddress: dbUser.emailAddress,
                  userID: dbUser.id,
                  role: dbUser.role,
                },
                'secret',
                {
                  expiresIn: '1h',
                }
              );
              res.status(200).json({
                message: 'user logged in',
                token: token,
              });
            } else {
              // password doesnt match
              res.status(401).json({ message: 'invalid credentials' });
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
};

const isAuth = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'not authenticated' });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret');
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || 'could not decode the token' });
  }
  if (!decodedToken) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    res.status(200).json({
      message: 'here is your resource',
      token: decodedToken,
      dirtyToken: token,
    });
  }
};

export { signup, login, isAuth };
