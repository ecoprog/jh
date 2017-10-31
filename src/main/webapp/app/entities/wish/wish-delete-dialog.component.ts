import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Wish} from './wish.model';
import {WishPopupService} from './wish-popup.service';
import {WishService} from './wish.service';

@Component({
    selector: 'jhi-wish-delete-dialog',
    templateUrl: './wish-delete-dialog.component.html'
})
export class WishDeleteDialogComponent {

    wish: Wish;

    constructor(private wishService: WishService,
                public activeModal: NgbActiveModal,
                private eventManager: JhiEventManager) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.wishService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'wishListModification',
                content: 'Deleted an wish'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-wish-delete-popup',
    template: ''
})
export class WishDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private wishPopupService: WishPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.wishPopupService
                .open(WishDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
