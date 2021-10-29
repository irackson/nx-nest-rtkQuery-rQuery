import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService, initialTodos } from './app.service';

describe('AppController', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();
    });

    describe('getData', () => {
        let appController = null;
        beforeEach(() => {
            appController = app.get<AppController>(AppController);
        });

        it('should return "Welcome to nest-server!"', () => {
            // const appController = app.get<AppController>(AppController);
            expect(appController.getData()).toEqual([]);
        });

        it('should seed the initial todos', () => {
            // const appController = app.get<AppController>(AppController);
            appController.seedData();
            expect(appController.getData()).not.toEqual([]);
        });
    });
});
