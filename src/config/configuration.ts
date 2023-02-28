import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default () => {
  return <ConfigurationI>(<unknown>{
    seedFile: process.env.CSV_DATA_FILE_PATH,
    port: parseInt(process.env.PORT, 10) || 3000,
    clearData: process.env.DATABASE_EMPTY === 'true' ? true : false,
    database: {
      postgres: {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        entities: [],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      },
    },
  });
};

interface ConfigurationI {
  seedFile: string;
  port: number;
  database: {
    postgres: TypeOrmModuleOptions;
  };
}
