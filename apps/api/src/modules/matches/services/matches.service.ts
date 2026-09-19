import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { Match, MatchDocument } from '../schemas/match.schema';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(Match.name)
    private readonly matchModel: Model<MatchDocument>,
  ) {}

  async create(createMatchDto: CreateMatchDto) {
    const match = new this.matchModel(createMatchDto);

    return match.save();
  }

  async findAll() {
    return this.matchModel
      .find()
      .sort({
        kickoff: 1,
      })
      .exec();
  }

  async findOne(id: string) {
    const match = await this.matchModel.findById(id);

    if (!match) {
      throw new NotFoundException(
        'Match not found',
      );
    }

    return match;
  }

  async update(
    id: string,
    updateMatchDto: UpdateMatchDto,
  ) {
    const match =
      await this.matchModel.findByIdAndUpdate(
        id,
        updateMatchDto,
        {
          new: true,
        },
      );

    if (!match) {
      throw new NotFoundException(
        'Match not found',
      );
    }

    return match;
  }

  async remove(id: string) {
    const match =
      await this.matchModel.findByIdAndDelete(id);

    if (!match) {
      throw new NotFoundException(
        'Match not found',
      );
    }

    return {
      message: 'Match deleted successfully',
    };
  }
}