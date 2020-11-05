import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseModelCreationUpdateTimes } from '../utils/models/BaseModelCreationUpdateTimes';
import { Emote } from './emote';
import { MovieFavorites } from './movieFavorites';

@Entity({
    name: 'movies',
})
export class Movie extends BaseModelCreationUpdateTimes {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @IsNotEmpty()
    @Column({ name: 'slug' })
    public slug: string;

    @Column({ name: 'description' })
    public description: string;

    @IsNotEmpty()
    @Column({ name: 'imdb_link' })
    public imdb_link: string;

    @JoinTable({
        name: 'movie_emotes',
        joinColumn: {
            name: 'emotes',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'movies',
            referencedColumnName: 'id',
        },
    })
    @ManyToMany(type => Emote, { eager: true })
    public emotes: Emote[];

    @JoinTable({ name: 'movie_favorate' })
    @OneToMany(type => MovieFavorites, mu => mu.movie_id)
    public favorites: MovieFavorites[];

}
