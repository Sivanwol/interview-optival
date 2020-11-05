import { EntityRepository, Repository } from 'typeorm';

import { Movie } from '../models/movie';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie>  {
    public async hasEmoteOnMovie(movie_id: number , emote_id: number, user_id: number): Promise<boolean> {
        const hasEmote = await this.createQueryBuilder('movie_emotes')
            .where('movie_id = :movie_id AND user_id = :user_id AND emote_id = :emote_id', { movie_id, user_id, emote_id })
            .getOne();
        return !!hasEmote;
    }

}
