import { TestBed, inject } from '@angular/core/testing';

import { ExplorerResult } from './explorer.result';

describe('ExplorerResult', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ExplorerResult]
        });
    });

    it('should be created', inject([ExplorerResult], (service: ExplorerResult) => {
        expect(service).toBeTruthy();
    }));
});
