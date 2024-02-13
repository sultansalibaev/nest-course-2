import {Module} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Article} from "./articles.model";
import {FilesModule} from "../files/files.module";

@Module({
  providers: [ArticlesService],
  controllers: [ArticlesController],
  imports: [
    SequelizeModule.forFeature([User, Article]),
      FilesModule
  ],
  exports: [
    ArticlesService
  ]
})
export class ArticlesModule {}
