import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tags.model';
import { Op } from 'sequelize';

@Injectable()
export class TagsService {
    constructor(
      @InjectModel(Tag)
      private readonly tagModel: typeof Tag,
    ) {}
  
    async findByIds(ids: number[]) {
      return this.tagModel.findAll({
        where: {
          id: {
            [Op.in]: ids
          }
        }
      });
    }
}
