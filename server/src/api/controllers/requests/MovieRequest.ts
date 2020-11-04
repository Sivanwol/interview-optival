import { IsNotEmpty, IsUrl, MaxLength, MinLength } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

@JSONSchema({
    description: 'A movie object',
    example: {
        name: 'movie name',
        slug: 'movie slug',
        description: 'movie description',
        imdbLink: 'https://www.imdb.com/title/tt10048342/?ref_=hm_fanfav_tt_1_pd_fp1',
    },
})
export class MovieRequest {
    @JSONSchema({
        description: 'movie name',
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
        description: 'movie slug',
    })
    @IsNotEmpty()
    @MinLength(10, {
        message: 'slug is too short',
    })
    public slug: string;

    @JSONSchema({
        description: 'movie description',
    })
    @MaxLength(500, {
        message: 'username is too long',
    })
    public description: string;

    @JSONSchema({
        description: 'imdb link',
    })
    @IsUrl()
    @IsNotEmpty()
    @MinLength(7, {
        message: 'imdb link is too short',
    })
    @MaxLength(255, {
        message: 'imdb link is too long',
    })
    public IMDBLink: string;
}
