import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBasicSettingsData1585816818106 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('INSERT INTO `settings` (`key`, `description`, `contextJSON`, `context`) VALUES\n' +
            '(\'per_page_default\', \'defualt per page will effect when not match to per_page_options\', NULL, \'20\'),\n' +
            '(\'per_page_options\', \'how many items can user select per page\', \'[20, 50, 100, 200]\', NULL)');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DELETE from `settings` where key in (' +
            '\'per_page_default\',' +
            '\'per_page_options\',' +
            ');');
    }

}
