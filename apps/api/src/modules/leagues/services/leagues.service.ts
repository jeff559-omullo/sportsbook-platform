import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateLeagueDto } from '../dto/create-league.dto';
import { UpdateLeagueDto } from '../dto/update-league.dto';
import {
  League,
  LeagueDocument,
} from '../schemas/league.schema';

@Injectable()
export class LeaguesService {
  constructor(
    @InjectModel(League.name)
    private readonly leagueModel: Model<LeagueDocument>,
  ) {}

  async create(
    createLeagueDto: CreateLeagueDto,
  ) {
    const league =
      new this.leagueModel(createLeagueDto);

    return league.save();
  }

  async findAll() {
    return this.leagueModel
      .find()
      .sort({
        priority: 1,
        name: 1,
      })
      .exec();
  }

  async findOne(id: string) {
    const league =
      await this.leagueModel.findById(id);

    if (!league) {
      throw new NotFoundException(
        'League not found',
      );
    }

    return league;
  }

  async update(
    id: string,
    updateLeagueDto: UpdateLeagueDto,
  ) {
    const league =
      await this.leagueModel.findByIdAndUpdate(
        id,
        updateLeagueDto,
        {
          new: true,
        },
      );

    if (!league) {
      throw new NotFoundException(
        'League not found',
      );
    }

    return league;
  }

  async remove(id: string) {
    const league =
      await this.leagueModel.findByIdAndDelete(id);

    if (!league) {
      throw new NotFoundException(
        'League not found',
      );
    }

    return {
      message:
        'League deleted successfully',
    };
  }
}