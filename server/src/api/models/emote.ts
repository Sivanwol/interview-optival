import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseModelCreationUpdateTimes } from '../utils/models/BaseModelCreationUpdateTimes';

@Entity({
    name: 'emotes',
})
export class Emote extends  BaseModelCreationUpdateTimes {
    @PrimaryGeneratedColumn({name: 'id'})
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'alt' })
    public alt: string;

    @IsNotEmpty()
    @Column({ name: 'icon' })
    public icon: string;

}
