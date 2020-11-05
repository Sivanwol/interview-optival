import { IsNotEmpty, IsUrl, MaxLength, MinLength } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

import { BaseResponseEntity } from './common/BaseResponseEntity';

@JSONSchema({
    description: 'A Emotes object',
    example: {
        name: 'emotes name',
        alt: 'text alt',
        icon: 'icon-up',
    },
})
export class EmoteResponse extends BaseResponseEntity {
    @JSONSchema({
        description: 'emote name',
    })
    @IsNotEmpty()
    @MinLength(2, {
        message: 'name of the movie is too short',
    })
    @MaxLength(50, {
        message: 'name of the movie  is too long',
    })
    public name: string;

    @JSONSchema({
        description: 'text alt',
    })
    @IsNotEmpty()
    @MinLength(2, {
        message: 'slug is too short',
    })
    public alt: string;

    @JSONSchema({
        description: 'emote icon',
    })
    @MaxLength(500, {
        message: 'username is too long',
    })
    public icon: string;
}
