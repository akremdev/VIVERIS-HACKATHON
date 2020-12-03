import { Component, forwardRef, Inject, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState, CounterActions } from "./store";
import {Globals} from "./globals.service";
import * as angularImg from "../assets/angular-logo.png";

@Component({
	selector: 'app2',
	template: `
		<div style="margin-top: 100px;">
            <img [src]="angularImg" style="width: 100px;"/> <br />
			Cela a été rendu par App2 qui est écrit en Angular 6
		</div>
        <br />

        <div>
            <b> Count: {{ count }}</b><br/><br/>
            <button (click)="increment()">incrément local</button>&nbsp;Envoyez un événement d'incrémentation <b> local </b>. Cette volonté
            n'augmentez que le compteur de l'application actuelle. <br/>
            
            <button (click)="decrement()">décrément local</button>&nbsp;Envoyez un événement de décrémentation <b> local </b>. Cette volonté
            ne décrémentez que le compteur de l'application actuelle. <br/>

            
            <button (click)="globalIncrement()">incrément global</button>&nbsp;Envoyez un événement d'incrémentation <b> global </b>.
            Cela augmentera le compteur de l'application actuelle et de toutes les autres applications qui écoutent cet événement. <br/>
            
            <button (click)="globalDecrement()">décrément global</button>&nbsp;Envoyer un événement de décrémentation <b> global </b>.
            Cela augmentera le compteur de l'application actuelle et de toutes les autres applications qui écoutent cet événement.<br/>
        </div>
		
        <br />
		<a [routerLink]="['/subroute1']" routerLinkActive="active">Angular route 1</a>&nbsp;
		<a [routerLink]="['/subroute2']" routerLinkActive="active">Angular route 2</a>

		<router-outlet></router-outlet>
	`,
})
export class App2 {
    count: number;
    angularImg: any;
    subscription;

    constructor(
        @Inject(forwardRef(() => NgRedux)) private ngRedux: NgRedux<IAppState>,
        @Inject(forwardRef(() => CounterActions)) private actions: CounterActions,
        @Inject(forwardRef(() => Globals)) private globals:Globals) {
        this.subscription = ngRedux.select<number>('count')
            .subscribe(newCount => this.count = newCount);
        this.angularImg = angularImg;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    increment() {
        this.ngRedux.dispatch(this.actions.increment());
    }

    decrement() {
        this.ngRedux.dispatch(this.actions.decrement());
    }

    globalIncrement() {
        this.globals.globalEventDistributor.dispatch(this.actions.increment());
    }

    globalDecrement() {
        this.globals.globalEventDistributor.dispatch(this.actions.decrement());
    }
}
