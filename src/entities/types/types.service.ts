import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Type } from './types.model';
import { Op } from 'sequelize';

@Injectable()
export class TypesService {
    constructor(
      @InjectModel(Type)
      private readonly typeModel: typeof Type,
    ) {}
  
    async findByIds(ids: number[]) {
      return this.typeModel.findAll({
        where: {
          id: {
            [Op.in]: ids
          }
        }
      });
    }
}
