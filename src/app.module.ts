import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SnakesModule } from './modules/snakes/snakes.module';
import { PestsModule } from './modules/pests/pests.module';
import { HospitalsModule } from './modules/hospitals/hospitals.module';
import { IdentificationModule } from './modules/identification/identification.module';
import { EmergencyModule } from './modules/emergency/emergency.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.example'],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    SnakesModule,
    PestsModule,
    HospitalsModule,
    IdentificationModule,
    EmergencyModule,
  ],
})
export class AppModule {}
