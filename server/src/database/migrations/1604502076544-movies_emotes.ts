import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class MoviesEmotes1604502076544 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'movie_emotes',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    length: '10',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'movie_id',
                    type: 'int',
                    length: '10',
                }, {
                    name: 'emote_id',
                    type: 'int',
                    length: '10',
                }, {
                    name: 'user_id',
                    type: 'int',
                    length: '10',
                }, {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('movie_emotes');
    }
}
