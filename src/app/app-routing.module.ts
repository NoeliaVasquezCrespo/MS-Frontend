import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormLayoutComponent } from './components/formlayout/formlayout.component';
import { PanelsComponent } from './components/panels/panels.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { MediaComponent } from './components/media/media.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileComponent } from './components/file/file.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { AppMainComponent } from './app.main.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { ListComponent } from './components/list/list.component';
import { TreeComponent } from './components/tree/tree.component';
import { CrudComponent } from './components/crud/crud.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { FloatLabelComponent } from './components/floatlabel/floatlabel.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';

import { BookFormsComponent } from './components/book-forms/book-forms.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { InfoFormsComponent } from './components/info-forms/info-forms.component';
import { LoansComponent } from './components/loans/loans.component';

import {ClientFormsComponent} from "./components/client-forms/client-forms.component";
import {ClientListComponent} from "./components/client-list/client-list.component";
import { BookInactiveListComponent } from './components/book-inactive-list/book-inactive-list.component';
import {AddressListComponent} from "./components/address-list/address-list.component";
import {AddressFormsComponent} from "./components/address-forms/address-forms.component";
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: DashboardComponent},
                    {path: 'uikit/addressForms', component: AddressFormsComponent},
                    {path: 'uikit/addressList', component: AddressListComponent},
                    {path: 'uikit/clientForm', component: ClientFormsComponent},
                    {path: 'uikit/clientList', component: ClientListComponent},
                    {path: 'uikit/bookForm', component: BookFormsComponent},
                    {path: 'uikit/infoForm', component: InfoFormsComponent},
                    {path: 'uikit/bookList', component: BookListComponent},
                    {path: 'uikit/bookInactiveList', component: BookInactiveListComponent},
                    {path: 'uikit/loans', component: LoansComponent},
                
                    {path: 'uikit/menu', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule)},
                   
                ],
            },
            {path:'pages/landing', component: LandingComponent},
            {path:'pages/login', component: LoginComponent},
            {path:'pages/error', component: ErrorComponent},
            {path:'pages/notfound', component: NotfoundComponent},
            {path:'pages/access', component: AccessComponent},
            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
