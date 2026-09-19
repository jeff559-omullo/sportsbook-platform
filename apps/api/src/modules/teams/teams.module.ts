import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Team,
  TeamSchema,
} from './schemas/team.schema';

import { TeamsController } from './controllers/teams.controller';
import { TeamsService } from './services/teams.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Team.name,
        schema: TeamSchema,
      },
    ]),
  ],

  controllers: [
    TeamsController,
  ],

  providers: [
    TeamsService,
  ],

  exports: [
    TeamsService,
    MongooseModule,
  ],
})
export class TeamsModule {}