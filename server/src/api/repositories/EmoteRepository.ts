import { EntityRepository, Repository } from 'typeorm';

import { Emote } from '../models/emote';

@EntityRepository(Emote)
export class EmoteRepository extends Repository<Emote>  {
}
