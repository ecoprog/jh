/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { WishDetailComponent } from '../../../../../../main/webapp/app/entities/wish/wish-detail.component';
import { WishService } from '../../../../../../main/webapp/app/entities/wish/wish.service';
import { Wish } from '../../../../../../main/webapp/app/entities/wish/wish.model';

describe('Component Tests', () => {

    describe('Wish Management Detail Component', () => {
        let comp: WishDetailComponent;
        let fixture: ComponentFixture<WishDetailComponent>;
        let service: WishService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipTestModule],
                declarations: [WishDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    WishService,
                    JhiEventManager
                ]
            }).overrideTemplate(WishDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WishDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WishService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Wish(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.wish).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
