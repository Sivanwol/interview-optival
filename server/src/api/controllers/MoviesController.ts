import {
    Authorized, Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Put, QueryParam
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { Emote } from '../models/emote';
import { Movie } from '../models/movie';
import { Users } from '../models/Users';
import { MoviesService } from '../services/MoviesService';
import { MovieRequest } from './requests/MovieRequest';
import { ListResponse } from './responses/common/ListResponse';
import { MovieResponse } from './responses/MovieResponse';

@JsonController('/movies')
@OpenAPI({ description: 'movies api to control' })
export class MoviesController {

    constructor(
        private movieService: MoviesService
    ) { }

    @Get('/')
    @ResponseSchema(MovieResponse, {
        description: 'will get as array within object call items',
    })
    public async list(): Promise<ListResponse<Movie>> {
        const response: ListResponse<Movie> = { items: [], total: 0 };
        const movies = await this.movieService.getMovies();
        response.items = movies;
        response.total = movies.length;
        return response;
    }
    @Get('/:id')
    @ResponseSchema(MovieResponse, {
        description: 'will get the movie by id',
    })
    public one(@Param('id') id: number): Promise<Movie | undefined> {
        return this.movieService.getMovie(id);
    }

    @Get('/emotes')
    @Authorized()
    @OnUndefined(UserNotFoundError)
    @ResponseSchema(MovieResponse, {
        description: 'get emotes list',
    })
    public async listOfEmotes(): Promise<ListResponse<Emote>> {
        const response: ListResponse<Emote> = { items: [], total: 0 };
        const data = await this.movieService.getEmoteList();
        response.items = data;
        response.total = data.length;
        return response;
    }
    @Put('/:id/emote/:emote_id')
    @Authorized()
    @OnUndefined(UserNotFoundError)
    @ResponseSchema(MovieResponse, {
        description: 'update movie emote per user ',
    })
    public async triggerUserToMovieEmote(
        @Param('id') movie_id: number,
        @Param('emote_id') emote_id: number,
        @CurrentUser({ required: true }) user: Users): Promise<Movie | boolean> {
        if (this.movieService.hasMovie(movie_id) && this.movieService.hasEmote(emote_id)) {
            await this.movieService.triggerUserToMovieEmote(movie_id, user.id, emote_id);
            return this.movieService.getMovie(movie_id);
        }
        return false;
    }

    @Get('/fav')
    @ResponseSchema(MovieResponse, {
        description: 'list of movie to fav',
    })
    public async listMovieToFav(
        @QueryParam('offset') offset: number = 0,
        @QueryParam('per_page') per_page: number = 20,
        @CurrentUser() user?: Users): Promise<ListResponse<Movie>> {
        const response: ListResponse<Movie> = { items: [], total: 0 };
        const movies = await this.movieService.getFavMovies(offset, per_page, (user) ? user.id : null);
        response.items = movies;
        response.total = movies.length;
        return response;
    }

    @Put('/:id/fav')
    @Authorized()
    @OnUndefined(UserNotFoundError)
    @ResponseSchema(MovieResponse, {
        description: 'add movie to fav ',
    })
    public async addMovieToFav(
        @Param('id') movie_id: number,
        @Param('rating') rating: number,
        @CurrentUser({ required: true }) user: Users): Promise<boolean> {
        if (this.movieService.hasMovie(movie_id)) {
            await this.movieService.toggleUserFavMovie(movie_id, user.id, rating);
            return true;
        }
        return false;
    }
    @Put('/:id/fav/rate')
    @Authorized()
    @OnUndefined(UserNotFoundError)
    @ResponseSchema(MovieResponse, {
        description: 'add movie to fav ',
    })
    public async updateRateMovieToFav(
        @Param('id') movie_id: number,
        @Param('rating') rating: number,
        @CurrentUser({ required: true }) user: Users): Promise<boolean> {
        if (this.movieService.hasMovie(movie_id)) {
            await this.movieService.toggleUserFavMovie(movie_id, user.id, rating);
            return true;
        }
        return false;
    }

    @Delete('/:id/fav')
    @Authorized()
    @OnUndefined(UserNotFoundError)
    @ResponseSchema(MovieResponse, {
        description: 'remove movie to fav ',
    })
    public async removeMovieToFav(
        @Param('id') movie_id: number,
        @CurrentUser({ required: true }) user: Users): Promise<boolean> {
        if (this.movieService.hasMovie(movie_id)) {
            await this.movieService.toggleUserFavMovie(movie_id, user.id, null);
            return true;
        }
        return false;
    }

    @Put('/:id')
    @Authorized(['admin_app'])
    @ResponseSchema(MovieResponse, {
        description: 'update movie info ',
    })
    @OnUndefined(UserNotFoundError)
    public async update(@Param('id') id: number, @Body() body: MovieRequest): Promise<Movie | boolean> {
        if (this.movieService.hasMovie(id)) {
            return this.movieService.update(id, body);
        }
        return false;
    }

    @Delete('/:id')
    @Authorized(['admin_app'])
    @OnUndefined(UserNotFoundError)
    @ResponseSchema(MovieResponse, {
        description: 'delete if existed movie',
    })
    public delete(@Param('id') id: number): Promise<void> {
        return this.movieService.delete(id);
    }

}
