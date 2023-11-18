import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [__dirname + '/../**/entity/*.entity.{js,ts}'],
  synchronize: true,
};
