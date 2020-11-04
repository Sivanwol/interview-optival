import {
    Authorized, Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Post, Put, Req
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { Users } from '../models/Users';
import { UserService } from '../services/UserService';
import { UserRegisterRequest } from './requests/UserRegisterRequest';
import { UserResponse } from './responses/UserResponse';

@Authorized()
@JsonController('/users')
@OpenAPI({ security: [{ basicAuth: [] }], description: 'user api to control' })
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get('/:id')
    @Authorized()
    @OnUndefined(UserNotFoundError)
    @ResponseSchema(UserResponse, {
        description: 'will get the full info of a user by given id',
    })
    public one(@Param('id') id: number): Promise<Users | undefined> {
        return this.userService.findOne(id);
    }
    @Put('/:id')
    @Authorized(['admin_app', 'admin_user_control'])
    @ResponseSchema(UserResponse, {
        description: 'update existing user',
    })
    public update(@Param('id') id: number, @Body() body: UserRegisterRequest): Promise<Users> {
        return this.userService.update(id, body);
    }

    @Delete('/:id')
    @Authorized(['admin_app', 'admin_user_control'])
    // tslint:disable-next-line:no-null-keyword
    @ResponseSchema(null, {
        description: 'delete if existed user',
    })
    public delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }

}
