import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseModelCreationUpdateTimes } from '../utils/models/BaseModelCreationUpdateTimes';
import { Emote } from './emote';

@Entity({
    name: 'movies',
})
export class Movie extends  BaseModelCreationUpdateTimes {

    @PrimaryGeneratedColumn({name: 'id'})
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

    @JoinTable({name: 'roles_has_permissions'})
    @OneToMany(type => Emote, emote => emote.id)
    public emotes: Emote[];

}
