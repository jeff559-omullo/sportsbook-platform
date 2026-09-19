import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';

import { TeamsService } from '../services/teams.service';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
  ) {}

  @Post()
  create(
    @Body()
    createTeamDto: CreateTeamDto,
  ) {
    return this.teamsService.create(
      createTeamDto,
    );
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get('league/:leagueId')
  findByLeague(
    @Param('leagueId')
    leagueId: string,
  ) {
    return this.teamsService.findByLeague(
      leagueId,
    );
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,

    @Body()
    updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamsService.update(
      id,
      updateTeamDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.teamsService.remove(id);
  }
}