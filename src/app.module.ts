import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from 'src/entities/users/users.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {User} from "src/entities/users/users.model";
import { RolesModule } from 'src/entities/roles/roles.module';
import {Role} from "src/entities/roles/roles.model";
import {UserRoles} from "src/entities/roles/user-roles.model";
import { AuthModule } from 'src/features/auth/auth.module';
import { Article } from "src/entities/articles/articles.model";
import { ArticlesModule } from 'src/entities/articles/articles.module';
import { FilesModule } from 'src/features/files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {RolesGuard} from "src/features/auth/roles.guard";
import { ProfileModule } from 'src/features/profile/profile.module';
import {Profile} from "src/features/profile/profile.model";
import { CommentsModule } from 'src/entities/comments/comments.module';
import { Comment } from "src/entities/comments/comments.model";
// import { ArticleComments } from "src/entities/comments/article-comments.model";
import { TypesModule } from './entities/types/types.module';
import { Type } from "./entities/types/types.model";
import { ArticleType } from "./entities/articles/article-type.model";
import { Tag } from "./entities/tags/tags.model";
import { ArticleTag } from "./entities/articles/article-tag.model";

@Module({
    controllers: [],
    providers: [
        RolesGuard,
    ],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),

        MailerModule.forRootAsync({
            useFactory: () => ({
                // transport: process.env.SMTP_TRANSPORT,
                transport: {
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT,
                    secure: false,
                    auth: {
                        user:  process.env.SMTP_USER,
                        pass:  process.env.SMTP_PASSWORD,
                    }
                },
                defaults: {
                    from: `"Delta Education" <${process.env.SMTP_USER}>`,
                },
                template: {
                    dir: path.join(__dirname, 'src/shared/templates/email'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Article, Profile, Comment, Type, ArticleType, Tag, ArticleTag], // ArticleComments
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        ArticlesModule,
        FilesModule,
        ProfileModule,
        CommentsModule,
        TypesModule,
    ],
})
export class AppModule {
}