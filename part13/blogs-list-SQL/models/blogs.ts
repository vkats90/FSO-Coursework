import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../dbConnection'
import { User } from './users'

export class Blog extends Model {
  id: any
  title: any
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      defaultValue: new Date().getFullYear(),
      validate: {
        min: 1992,
        max: Number(new Date().getFullYear()),
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'blog',
  }
)
