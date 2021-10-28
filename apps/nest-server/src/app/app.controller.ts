import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Req,
} from '@nestjs/common';

import { AppService, Todo } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getData() {
        return this.appService.getData();
    }

    // get a single Todo using query parameters
    // GET http://localhost:3333/api/find?id=1
    @Get('/find?')
    find(@Req() request: Request) {
        const id = request['query'].id;

        return this.appService.getOne(parseInt(id));
    }

    @Post() // POST http://localhost:3333/api
    create(@Body() { text }: { text: string }) {
        return this.appService.add(text);
    }

    @Put(':id') // PUT http://localhost:3333/api/1
    update(@Param('id') id: string, @Body() data: Todo) {
        return this.appService.update(parseInt(id), {
            text: data.text,
            done: data.done,
        });
    }

    @Delete(':id') // DELETE http://localhost:3333/api/1
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.appService.remove(parseInt(id));
    }

    //////////////
    @Get('seedData') // GET http://localhost:3333/api/seedData
    seedData() {
        return this.appService.seedData();
    }
}
