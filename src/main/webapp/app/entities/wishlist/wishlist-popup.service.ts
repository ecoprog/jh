import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Wishlist } from './wishlist.model';
import { WishlistService } from './wishlist.service';

@Injectable()
export class WishlistPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private wishlistService: WishlistService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.wishlistService.find(id).subscribe((wishlist) => {
                    if (wishlist.creationDate) {
                        wishlist.creationDate = {
                            year: wishlist.creationDate.getFullYear(),
                            month: wishlist.creationDate.getMonth() + 1,
                            day: wishlist.creationDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.wishlistModalRef(component, wishlist);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.wishlistModalRef(component, new Wishlist());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    wishlistModalRef(component: Component, wishlist: Wishlist): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.wishlist = wishlist;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
