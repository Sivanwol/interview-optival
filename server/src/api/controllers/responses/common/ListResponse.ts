import { IsNotEmpty, IsNumber } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

@JSONSchema({
    description: 'List of objects',
    example: {
        items: [],
        total: 0,
    },
})
export class ListResponse<T> {
    public items: T[];

    @JSONSchema({
        description: 'user first name',
    })
    @IsNotEmpty()
    @IsNumber({}, {
        message: 'total must be number',
    })
    public total: number;
}
