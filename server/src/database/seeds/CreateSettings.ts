import { Connection } from 'typeorm';
import { Factory, Seed } from 'typeorm-seeding';

import { Settings } from '../../api/models/Settings';

export class CreateSettings implements Seed {
    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        const returnValues: Settings[] = [];
        let settings = new Settings();
        settings.key = 'per_page_default';
        settings.description = 'defualt per page will effect when not match to per_page_options';
        settings.context = '20';
        settings.contextJSON = null;
        returnValues.push(settings);
        settings = new Settings();
        settings.key = 'per_page_options';
        settings.description = 'how many items can user select per page';
        settings.context = null;
        settings.contextJSON = JSON.stringify([20, 50, 100, 200]);
        returnValues.push(settings);

        return returnValues.map(async (item) => await em.save(item));
    }

}
