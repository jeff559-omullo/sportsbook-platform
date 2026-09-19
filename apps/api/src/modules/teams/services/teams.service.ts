import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';

import {
  Team,
  TeamDocument,
} from '../schemas/team.schema';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<TeamDocument>,
  ) {}

  async create(
    createTeamDto: CreateTeamDto,
  ) {
    const team = new this.teamModel(
      createTeamDto,
    );

    return team.save();
  }

  async findAll() {
    return this.teamModel
      .find()
      .populate('league')
      .sort({
        name: 1,
      })
      .exec();
  }

  async findByLeague(
    leagueId: string,
  ) {
    return this.teamModel
      .find({
        league: leagueId,
      })
      .sort({
        name: 1,
      })
      .exec();
  }

  async findOne(id: string) {
    const team =
      await this.teamModel
        .findById(id)
        .populate('league');

    if (!team) {
      throw new NotFoundException(
        'Team not found',
      );
    }

    return team;
  }

  async update(
    id: string,
    updateTeamDto: UpdateTeamDto,
  ) {
    const team =
      await this.teamModel.findByIdAndUpdate(
        id,
        updateTeamDto,
        {
          new: true,
        },
      );

    if (!team) {
      throw new NotFoundException(
        'Team not found',
      );
    }

    return team;
  }

  async remove(id: string) {
    const team =
      await this.teamModel.findByIdAndDelete(
        id,
      );

    if (!team) {
      throw new NotFoundException(
        'Team not found',
      );
    }

    return {
      message:
        'Team deleted successfully',
    };
  }
}