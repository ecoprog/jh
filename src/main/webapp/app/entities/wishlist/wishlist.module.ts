import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {JhipSharedModule} from '../../shared';
import {JhipAdminModule} from '../../admin/admin.module';
import {
    WishlistService,
    WishlistPopupService,
    WishlistComponent,
    WishlistDetailComponent,
    WishlistDialogComponent,
    WishlistPopupComponent,
    WishlistDeletePopupComponent,
    WishlistDeleteDialogComponent,
    wishlistRoute,
    wishlistPopupRoute,
} from './';

const ENTITY_STATES = [
    ...wishlistRoute,
    ...wishlistPopupRoute,
];

@NgModule({
    imports: [
        JhipSharedModule,
        JhipAdminModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        WishlistComponent,
        WishlistDetailComponent,
        WishlistDialogComponent,
        WishlistDeleteDialogComponent,
        WishlistPopupComponent,
        WishlistDeletePopupComponent,
    ],
    entryComponents: [
        WishlistComponent,
        WishlistDialogComponent,
        WishlistPopupComponent,
        WishlistDeleteDialogComponent,
        WishlistDeletePopupComponent,
    ],
    providers: [
        WishlistService,
        WishlistPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipWishlistModule {
}
