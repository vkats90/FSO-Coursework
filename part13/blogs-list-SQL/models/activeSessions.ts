import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../dbConnection'

export class activeSessions extends Model {
  token: any
  userId: any
}

activeSessions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'active_sessions',
  }
)
