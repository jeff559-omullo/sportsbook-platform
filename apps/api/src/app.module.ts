import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import configuration from './config/configuration';
import { envValidationSchema } from './config/env.validation';

import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { MatchesModule } from './modules/matches/matches.module';
import { LeaguesModule } from './modules/leagues/leagues.module';
import { TeamsModule } from './modules/teams/teams.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      validationSchema: envValidationSchema,
    }),

   MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const uri = configService.get<string>('database.uri');

    console.log('================================');
    console.log('MONGO URI:', uri);
    console.log('================================');

    return {
      uri,
    };
  },
}), // <-- This closing }), was missing

HealthModule,
AuthModule,
UsersModule,
AdminModule,
WalletModule,
TransactionsModule,
MatchesModule,
LeaguesModule,
TeamsModule,
PaymentsModule,
  ],
})
export class AppModule {}