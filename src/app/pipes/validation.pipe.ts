import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "src/app/exceptions/validation.exception";


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        // throw new Error("Method not implemented.");
        const obj = plainToClass(metadata.metatype, value)
        const errors = await validate(obj)

        if (errors.length) {
            let messages = errors.reduce((prev, err) => {
                prev[err.property] = Object.values(err.constraints);
                return prev
            }, {})
            throw new ValidationException(messages)
        }

        return value
    }
}