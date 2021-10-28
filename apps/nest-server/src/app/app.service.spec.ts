import { Test } from '@nestjs/testing';

import { AppService, initialTodos } from './app.service';

describe('AppService', () => {
    let service: AppService;

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [AppService],
        }).compile();

        service = app.get<AppService>(AppService);
    });

    describe('getData', () => {
        it('should return "Welcome to nest-server!"', () => {
            expect(service.getData()).toEqual([]);
        });
    });

    describe('seedData', () => {
        it('should return "Welcome to nest-server!"', () => {
            service.seedData();
            expect(service.getData()).toHaveLength(initialTodos.length);
        });
    });
});
