import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "./pipes/validation.pipe";
import * as cookieParser from 'cookie-parser';
import {RolesGuard} from "./auth/roles.guard";

async function start() {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)

    app.use(cookieParser());
    // app.enableCors();
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true, // << totally ruins it
        preflightContinue: false,
        optionsSuccessStatus: 204
    });

    const config = new DocumentBuilder()
        .setTitle('Урок по продвинутому BACKEND')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('ULBI TV')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    app.useGlobalPipes(new ValidationPipe())
    // @ts-ignore
    app.useGlobalGuards(RolesGuard)

    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start()
