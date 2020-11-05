import * as Faker from 'faker';
import { EntityManager, MigrationInterface, QueryRunner } from 'typeorm';

import { Emote } from '../../api/models/emote';
import { Movie } from '../../api/models/movie';

export class SeedData1604520038748 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await this.createEmotes(queryRunner);
        await this.createMovies(queryRunner);
        // await queryRunner.commitTransaction();
    }

    public async createEmotes(queryRunner: QueryRunner) {
        let query = 'INSERT INTO `emotes` (`name`, `alt`, `icon`) VALUES\n';
        const returnValues: Emote[] = [];
        let emote = new Emote();
        emote.alt = Faker.random.words(5);
        emote.name = 'love';
        emote.icon = 'pi-heart';
        returnValues.push(emote);
        emote = new Emote();
        emote.alt = Faker.random.words(5);
        emote.name = 'like';
        emote.icon = 'pi-thumbs-up';
        returnValues.push(emote);
        emote = new Emote();
        emote.alt = Faker.random.words(5);
        emote.name = 'dislike';
        emote.icon = 'pi-thumbs-down';
        returnValues.push(emote);
        returnValues.map(async (item , index) => query += ((index ===0) ? '': ',') + ` (\'${item.name}\', \'${item.alt}\', \'${item.icon}\')\n`);
        await queryRunner.query(query);
        return returnValues;
    }
    public async createMovies(queryRunner: QueryRunner) {
        let query = 'INSERT INTO `movies` (`name`, `slug`, `description`, `imdb_link`) VALUES\n';
        const returnValues: Movie[] = [];
        for (let i = 0; i <= Faker.random.number(30); i++) {
            returnValues.push(this.createMovieObject());
        }
        returnValues.map(async (item , index) => query += ((index ===0) ? '': ',') + ` (\'${item.name}\', \'${item.slug}\', \'${item.description}\', \'${item.imdb_link}\')\n`);
        await queryRunner.query(query);

    }

    private createMovieObject(): Movie {
        const movie = new Movie();
        movie.name = Faker.lorem.words(2);
        movie.description = Faker.lorem.paragraphs(3);
        movie.slug = Faker.internet.domainName();
        movie.imdb_link = Faker.internet.url();
        movie.emotes = [];
        return movie;
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
