import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../dbConnection'
import { User } from './users'

export class ReadingLists extends Model {}

ReadingLists.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blog', key: 'id' },
    },
    readingsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'readings', key: 'id' },
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'reading_lists',
  }
)
