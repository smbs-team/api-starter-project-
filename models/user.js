'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {});
  
  User.fetchAll = async (active = true) => {
    const records = await User.findAll({attributes: ['firstName', 'lastName', 'email', 'isActive']}, { where: { isActive: active } });
    return records;
  }

  User.fetchById = async (userId) => {
    try {
      const record = await User.findOne({ where: { id: userId }});
      delete record.password;
  
      return record;      
    } catch (error) {
      return [];
    }
  }

  User.edit = async(id, userInfo) => {
    const user = await User.update(userInfo, { where: {id} });
    delete user.password;

    return user;
  }

  User.insert = async (newUser) => {
    const hashed = await bcrypt.hash(newUser.password, 10);
    
    const user = await User.create({ ...newUser, password: hashed });
    delete user.password;

    return user;
  }

  User.remove = async (id) => {
    const user = User.update({ isActive: false }, { where: {id} });
    delete user.password;

    return user;
  }

  User.confirmUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if(!user) {
      return false;
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
      return false;
    }

    return user;
  }

  User.associate = function(models) {
    
  };

  return User;
};