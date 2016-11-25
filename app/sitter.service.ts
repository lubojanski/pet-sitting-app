import { Injectable } from '@angular/core';

import  { Sitter }      from './sitter';

import { SITTERS } from './mock-sitters';

@Injectable()
export class SitterService {
    getSitters(): Promise<Sitter[]> {
        return Promise.resolve(SITTERS);
    }
    getSitter(id: number): Promise<Sitter> {
        return this.getSitters()
             .then(sitters => sitters.find(sitter => sitter.id === id));
    }
    findSitters(city: string): Promise<Sitter[]> {
        return this.getSitters()
            .then(sitters => sitters.filter( sitter => sitter.city === city ));
    }
}