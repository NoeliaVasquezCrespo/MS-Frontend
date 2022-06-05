import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none"></li>
                    </ul>
                </li>
                <a href="https://www.primefaces.org/primeblocks-ng/#/">
                    <img src="assets/layout/images/{{appMain.config.dark ? 'banner-primeblocks-dark' : 'banner-primeblocks'}}.png" alt="Prime Blocks" class="w-full mt-3"/>
                </a>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items:[
                    {label: 'Dashboard',icon: 'pi pi-fw pi-home', routerLink: ['/']}
                ]
            },
            {
                label: 'UI Components',
                items: [
                    {label: 'Agregar Direcciones', icon: 'pi pi-fw pi-user', routerLink: ['/uikit/addressForms']},
                    {label: 'Lista de Direcciones', icon: 'pi pi-fw pi-user', routerLink: ['/uikit/addressList']},
                    {label: 'Agregar Clientes', icon: 'pi pi-fw pi-user', routerLink: ['/uikit/clientForm']},
                    {label: 'Lista Clientes', icon: 'pi pi-fw pi-user', routerLink: ['/uikit/clientList']},
                    {label: 'Agregar Libros', icon: 'pi pi-fw pi-book', routerLink: ['/uikit/bookForm']},
                    {label: 'Libros Disponibles', icon: 'pi pi-fw pi-server', routerLink: ['/uikit/bookList']},
                    {label: 'Libros No Disponibles', icon: 'pi pi-fw pi-server', routerLink: ['uikit/bookInactiveList']},
                    {label: 'Agregar Información', icon: 'pi pi-fw pi-id-card', routerLink: ['uikit/infoForm']},
                    {label: 'Prestamos', icon: 'pi pi-fw pi-list', routerLink: ['uikit/loans']}
                ]
            }
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
