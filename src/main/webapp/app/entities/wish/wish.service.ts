import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {SERVER_API_URL} from '../../app.constants';

import {Wish} from './wish.model';
import {ResponseWrapper, createRequestOption} from '../../shared';

@Injectable()
export class WishService {

    private resourceUrl = SERVER_API_URL + 'api/wishes';

    constructor(private http: Http) {
    }

    create(wish: Wish): Observable<Wish> {
        const copy = this.convert(wish);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(wish: Wish): Observable<Wish> {
        const copy = this.convert(wish);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Wish> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Wish.
     */
    private convertItemFromServer(json: any): Wish {
        const entity: Wish = Object.assign(new Wish(), json);
        return entity;
    }

    /**
     * Convert a Wish to a JSON which can be sent to the server.
     */
    private convert(wish: Wish): Wish {
        const copy: Wish = Object.assign({}, wish);
        return copy;
    }
}
