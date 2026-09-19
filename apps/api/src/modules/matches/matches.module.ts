import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Match, MatchSchema } from './schemas/match.schema';
import { MatchesController } from './controllers/matches.controller';
import { MatchesService } from './services/matches.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Match.name,
        schema: MatchSchema,
      },
    ]),
  ],

  controllers: [MatchesController],

  providers: [MatchesService],

  exports: [
    MatchesService,
    MongooseModule,
  ],
})
export class MatchesModule {}