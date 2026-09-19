import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  League,
  LeagueSchema,
} from './schemas/league.schema';

import { LeaguesController } from './controllers/leagues.controller';
import { LeaguesService } from './services/leagues.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: League.name,
        schema: LeagueSchema,
      },
    ]),
  ],

  controllers: [
    LeaguesController,
  ],

  providers: [
    LeaguesService,
  ],

  exports: [
    LeaguesService,
    MongooseModule,
  ],
})
export class LeaguesModule {}