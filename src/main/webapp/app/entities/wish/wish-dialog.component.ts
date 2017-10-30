import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Wish } from './wish.model';
import { WishPopupService } from './wish-popup.service';
import { WishService } from './wish.service';
import { Wishlist, WishlistService } from '../wishlist';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-wish-dialog',
    templateUrl: './wish-dialog.component.html'
})
export class WishDialogComponent implements OnInit {

    wish: Wish;
    isSaving: boolean;

    wishlists: Wishlist[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private wishService: WishService,
        private wishlistService: WishlistService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.wishlistService.query()
            .subscribe((res: ResponseWrapper) => { this.wishlists = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.wish.id !== undefined) {
            this.subscribeToSaveResponse(
                this.wishService.update(this.wish));
        } else {
            this.subscribeToSaveResponse(
                this.wishService.create(this.wish));
        }
    }

    private subscribeToSaveResponse(result: Observable<Wish>) {
        result.subscribe((res: Wish) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Wish) {
        this.eventManager.broadcast({ name: 'wishListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackWishlistById(index: number, item: Wishlist) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-wish-popup',
    template: ''
})
export class WishPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private wishPopupService: WishPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.wishPopupService
                    .open(WishDialogComponent as Component, params['id']);
            } else {
                this.wishPopupService
                    .open(WishDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
