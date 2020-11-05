import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '@src/decorators/Logger';

import { MovieRequest } from '../controllers/requests/MovieRequest';
import { Emote } from '../models/emote';
import { Movie } from '../models/movie';
import { MovieFavorites } from '../models/movieFavorites';
import { EmoteRepository } from '../repositories/EmoteRepository';
import { MovieRepository } from '../repositories/MovieRepository';

@Service()
export class MoviesService {

    constructor(
        @OrmRepository() private emoteRepository: EmoteRepository,
        @OrmRepository() private movieRepository: MovieRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async getMovies(): Promise<Movie[]> {
        this.log.info('fetching movies');
        return this.movieRepository.find({});
    }

    public async getMovie(movie_id: number): Promise<Movie | undefined> {
        this.log.info('fetching movie', movie_id);
        return this.movieRepository.findOne(movie_id);
    }

    public async getEmote(emote_id: number): Promise<Emote | undefined> {
        return this.emoteRepository.findOne(emote_id);
    }

    public async hasMovie(movie_id: number): Promise<boolean> {
        this.log.info('verify if movie existed', movie_id);
        const movie = await this.getMovie(movie_id);
        return !!movie;
    }

    public async hasEmote(emote_id: number): Promise<boolean> {
        this.log.info('verify if emote existed', emote_id);
        const emote = await this.getEmote(emote_id);
        return !!emote;
    }
    public async update(movie_id: number, data: MovieRequest): Promise<Movie> {
        this.log.info('update movie', movie_id, data);
        const movie = await this.getMovie(movie_id);
        movie.description = data.description;
        movie.imdb_link = data.IMDBLink;
        movie.name = data.name;
        movie.slug = data.slug;
        await this.movieRepository.save(movie);
        return movie;
    }

    public async delete(movie_id: number): Promise<void> {
        this.log.info('delete movie', movie_id);
        await this.movieRepository.delete(movie_id);
    }

    public async getEmoteList(): Promise<Emote[]> {
        this.log.info('fetching emotes');
        return this.emoteRepository.find({});
    }

    public async triggerUserToMovieEmote(movie_id: number, emote_id: number, user_id: number): Promise<Movie> {
        const hasBoundEmouteOnUserAndMovie = await this.movieRepository.hasEmoteOnMovie(movie_id, emote_id, user_id);
        const movie = await this.getMovie(movie_id);
        const emote = await this.getEmote(emote_id);
        if (hasBoundEmouteOnUserAndMovie) {
            movie.emotes = movie.emotes.filter((e: Emote) => e.id !== emote_id);
        } else {
            movie.emotes.push(emote);
        }
        this.movieRepository.save(movie);
        return this.getMovie(movie_id);
    }

    public async hasUserFavMovie(movie_id: number, user_id: number): Promise<boolean> {
        const query = await this.movieRepository.createQueryBuilder('movie')
        .leftJoin('movie.favorites', 'favorites')
        .where('favorites.user_id = :user_id AND favorites.movie_id = :movie_id' , {user_id, movie_id})
        .getOne();
        return !!query;
    }

    public async toggleUserFavMovie(movie_id: number, user_id: number , rating?: number): Promise<void> {
        const movie = await this.getMovie(movie_id);
        const hasfav = await this.hasUserFavMovie(movie_id, user_id) ;
        if (hasfav && rating === null) {
            movie.favorites.filter(mf => mf.user_id !== user_id && mf.movie_id !== movie_id);
        } else {
            if (hasfav) {
                const fav = movie.favorites.find(mf => mf.user_id === user_id && mf.movie_id === movie_id);
                fav.rating = rating;
            } else {
                const mf = new MovieFavorites();
                mf.movie_id = movie_id;
                mf.user_id = user_id;
                mf.rating = rating;
                movie.favorites.push(mf);
            }
        }
        await this.movieRepository.save(movie);
    }

    public async getFavMovies(offset: number = 0, per_page: number = 20, user_id?: number): Promise<Movie[]> {
        const query = this.movieRepository.createQueryBuilder('movie')
        .leftJoin('movie.favorites', 'favorites')
        .orderBy('favorites.rating', 'ASC')
        .orderBy('favorites.users', 'DESC')
        .take(per_page)
        .skip(offset);
        if (user_id) {
            query.where('favorites.user_id = :user_id' , {user_id});
        }
        return await query.getMany();
    }
}
