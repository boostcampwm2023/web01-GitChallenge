import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Session, SessionSchema } from './schema/session.schema';
import { SessionController } from './session.controller';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_HOST'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  providers: [SessionService],
  exports: [SessionService],
  controllers: [SessionController],
})
export class SessionModule {}
