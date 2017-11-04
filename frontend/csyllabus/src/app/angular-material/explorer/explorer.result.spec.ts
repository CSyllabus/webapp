import { TestBed, inject } from '@angular/core/testing';

import { ResultExplorer } from './explorer.result';

describe('ResultExplorer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ResultExplorer]
        });
    });

    it('should be created', inject([ResultExplorer], (service: ResultExplorer) => {
        expect(service).toBeTruthy();
    }));
});
