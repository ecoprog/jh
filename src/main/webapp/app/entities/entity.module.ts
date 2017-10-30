import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipWishlistModule } from './wishlist/wishlist.module';
import { JhipWishModule } from './wish/wish.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipWishlistModule,
        JhipWishModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipEntityModule {}
