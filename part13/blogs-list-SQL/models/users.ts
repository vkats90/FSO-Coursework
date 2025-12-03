import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../dbConnection'

export class User extends Model {
  passwordHash: any
  name: any
  id: any
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
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.TEXT,
    },
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'user',
  }
)
