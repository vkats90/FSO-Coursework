import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../dbConnection'
import { User } from './users'

export class Readings extends Model {}

Readings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'readings',
  }
)
