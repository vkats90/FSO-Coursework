import { Umzug, SequelizeStorage } from 'umzug'
import { MigrationMeta } from 'umzug'
import { sequelize } from '../dbConnection'

const migrationConf = {
  migrations: {
    glob: 'migrations/*.ts',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig: MigrationMeta) => mig.name),
  })
  await sequelize.close()
}

const rollBackMigration = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.down()
  console.log('Migrations rolled back', {
    files: migrations.map((mig: MigrationMeta) => mig.name),
  })
  await sequelize.close()
}

export default { rollBackMigration, runMigrations }
