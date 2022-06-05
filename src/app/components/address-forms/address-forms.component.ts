import { Component, OnInit } from '@angular/core';
import {Address} from "../../api/Address";
import {ClientService} from "../../service/client.service";
import {Client} from "../../api/Client";

@Component({
  selector: 'app-address-forms',
  templateUrl: './address-forms.component.html',
  styleUrls: ['./address-forms.component.scss']
})
export class AddressFormsComponent implements OnInit {

    direccion:Address={address: "", postalCode: 0};
    constructor(private clientService:ClientService) { }

    ngOnInit(): void {

    }

    async agregarDireccion() {
        let newDireccion = await this.postNewAddress();
        console.log(newDireccion);
        this.direccion={address: "", postalCode: 0}
    }

    async postNewAddress(){
        let respuesta;
        await this.clientService.postAddress(this.direccion).toPromise().then((response) => {
            respuesta=response;
        }).catch(e => console.error(e));
        return respuesta;
    }
}
