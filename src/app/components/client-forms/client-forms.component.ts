import { Component, OnInit } from '@angular/core';
import {Address} from "../../api/Address";
import {ClientService} from "../../service/client.service";
import {SelectItem} from "primeng/api";
import {Client} from "../../api/Client";

@Component({
  selector: 'app-client-forms',
  templateUrl: './client-forms.component.html',
  styleUrls: ['./client-forms.component.scss']
})
export class ClientFormsComponent implements OnInit {

    listAddresses:Address[]=[];
    addresses:SelectItem[]=[];

    selectedDrop: SelectItem;
    nombreCliente: string="";
    apellidosCliente: string="";
    correoElectronico: string ="";
    numeroTelefonico: number;

    constructor(private clientService:ClientService) { }

    async ngOnInit(): Promise<void> {
        this.listAddresses = await this.getAddresses();
        for(let i=0;i<this.listAddresses.length;i++){
            this.addresses.push(
                {label: this.listAddresses[i].address, value: this.listAddresses[i]}
            );
        }
        console.log(this.listAddresses)
    }
    async getAddresses(){
        let respuesta;
        await this.clientService.getAddresses().toPromise().then((response) => {
            respuesta=response;
        }).catch(e => console.error(e));
        return respuesta;
  }
  async postNewClient(client:Client){
      let respuesta;
      await this.clientService.postClient(client).toPromise().then((response) => {
          respuesta=response;
      }).catch(e => console.error(e));
      return respuesta;
  }

    agregarCliente() {
        console.log(this.nombreCliente);
        console.log(this.apellidosCliente);
        console.log(this.selectedDrop);
        console.log(this.correoElectronico);
        console.log(this.numeroTelefonico);
        console.log(this.selectedDrop['addressId']);
        let client:Client={addressId: this.selectedDrop['addressId'],
            email: this.correoElectronico,
            lastname: this.apellidosCliente,
            name: this.nombreCliente,
            phone: this.numeroTelefonico
        }
        this.postNewClient(client);
    }
}
