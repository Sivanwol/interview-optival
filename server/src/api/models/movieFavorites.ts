import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseModelCreationUpdateTimes } from '../utils/models/BaseModelCreationUpdateTimes';
import { Movie } from './movie';

@Entity({
    name: 'movie_favorate',
})
export class MovieFavorites extends  BaseModelCreationUpdateTimes {

    @PrimaryGeneratedColumn({name: 'id'})
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'movie_id' })
    public movie_id: number;

    @IsNotEmpty()
    @Column({ name: 'user_id' })
    public user_id: number;

    @IsNotEmpty()
    @Column({ name: 'rating' })
    public rating: number;

    @ManyToOne( () => Movie, movie => movie.id )
    public movie: Movie;
}
