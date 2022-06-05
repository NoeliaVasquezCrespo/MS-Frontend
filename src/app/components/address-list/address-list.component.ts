import { Component, OnInit } from '@angular/core';
import {Address} from "../../api/Address";
import {ClientService} from "../../service/client.service";
import {Client} from "../../api/Client";

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
    listaDirecciones: Address[];
    cols: any[];
    selectedAddresses: Address[];
    addressDialog: boolean;
    submitted: boolean;
    address:Address={address: "", postalCode: 0}
    deleteAddressDialog: boolean = false;



    constructor(private clientService:ClientService) { }

    async ngOnInit(): Promise<void> {
        this.listaDirecciones = await this.getAddresses();
        console.log(this.listaDirecciones)

        this.cols = [
            {field: 'addressId', header: 'AddressId'},
            {field: 'address', header: 'Address'},
            {field: 'postalCode', header: 'PostalCode'}
        ];

    }

    private async getAddresses() {
        let respuesta;
        await this.clientService.getAddresses().toPromise().then((response) => {
            respuesta=response;
        }).catch(e => console.error(e));
        return respuesta;
    }

    editAddress(addressObj: Address) {
        this.address = {...addressObj};
        this.addressDialog = true;
    }
    async updateAddremethod(id:number){
        let respuesta;
        await this.clientService.updateAddress(id,this.address).toPromise().then((response) => {
            respuesta=response;
        }).catch(e => console.error(e));
        return respuesta;
    }

    deleteAddress(addressObj: Address) {
        this.deleteAddressDialog = true;
        this.address = {...addressObj};
    }

    hideDialog() {
        this.addressDialog = false;
        this.submitted = false;
    }

    async saveAddress() {
        console.log(this.address)
        let respuesta=await this.updateAddremethod(this.address.addressId);
        console.log(respuesta);

        this.addressDialog = false;
        this.address= {address: "", postalCode: 0};
        // this.submitted = true;
        this.listaDirecciones=[];
        this.listaDirecciones = await this.getAddresses();
        console.log(this.listaDirecciones)
    }

    async confirmDelete() {
        this.deleteAddresMethod(this.address.addressId);


        this.listaDirecciones=[];
        this.listaDirecciones = await this.getAddresses();
        console.log(this.listaDirecciones)

        this.deleteAddressDialog = false;
        this.address = {address: "", postalCode: 0};
    }

    async deleteAddresMethod(clientId) {
        let respuesta;
        await this.clientService.deleteAddress(clientId).toPromise().then((response) => {
            respuesta=response;
        }).catch(e => console.error(e));
        return respuesta;
    }
}
