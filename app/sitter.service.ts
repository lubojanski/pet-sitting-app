import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

import  { Sitter }      from './sitter';

@Injectable()
export class SitterService {
    private sittersUrl = 'app/sitters';  // URL to web api

    constructor(private http: Http) { }

    getSitters(): Promise<Sitter[]> {
        return this.http.get(this.sittersUrl)
                    .toPromise()
                    .then(response => response.json().data as Sitter[])
                    .catch(this.handleError);
    }
    getSitter(id: number): Promise<Sitter> {
        return this.getSitters()
             .then(sitters => sitters.find(sitter => sitter.id === id));
    }
    search(term: string): Observable<Sitter[]> {
    return this.http
               .get(`app/sitters/?city=${term}`)
               .map((r: Response) => r.json().data as Sitter[]);
  }

    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
}
}