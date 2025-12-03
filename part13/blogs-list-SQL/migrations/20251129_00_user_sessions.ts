import { DataTypes, QueryInterface } from 'sequelize'

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable('active_sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    })
    await queryInterface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    })
    await queryInterface.addColumn('users', 'active_session_id', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'active_sessions', key: 'id' },
    })
  },
  down: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.dropTable('active_sessions', { cascade: true })
    await queryInterface.removeColumn('users', 'disabled')
    await queryInterface.removeColumn('users', 'active_session')
  },
}
