import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class MovieFavor1604565906860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'movie_favorate',
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
                    name: 'user_id',
                    type: 'int',
                    length: '10',
                }, {
                    name: 'rating',
                    type: 'int',
                    length: '1',
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
        await queryRunner.dropTable('movie_favorate');
    }

}
