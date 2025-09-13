import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../dbConnection'
import { Blog } from './blogs'

export class User extends Model {
  passwordHash: any
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      unique: true,
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
    },
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'user',
  }
)
