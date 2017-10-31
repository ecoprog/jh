import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {WishComponent} from './wish.component';
import {WishDetailComponent} from './wish-detail.component';
import {WishPopupComponent} from './wish-dialog.component';
import {WishDeletePopupComponent} from './wish-delete-dialog.component';

@Injectable()
export class WishResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const wishRoute: Routes = [
    {
        path: 'wish',
        component: WishComponent,
        resolve: {
            'pagingParams': WishResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipApp.wish.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'wish/:id',
        component: WishDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipApp.wish.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const wishPopupRoute: Routes = [
    {
        path: 'wish-new',
        component: WishPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipApp.wish.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'wish/:id/edit',
        component: WishPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipApp.wish.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'wish/:id/delete',
        component: WishDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipApp.wish.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
