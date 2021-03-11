import { OnInit } from '@angular/core';
import { CurdService } from './../CrudService';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { sum, forEach } from 'lodash';
import { AngularFireDatabase } from '@angular/fire/database';
import * as _ from 'lodash';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  allData: any;
  sumAmount: number;
  list = [];

  constructor(
    private crudService: CurdService,
    private alertCtrlin: AlertController
  ) {}

  ngOnInit(): void {
    this.crudService.readData().subscribe((data) => {
      this.allData = data.map((e) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'.toString()],
          amount: e.payload.doc.data()['amount'.toString()],
          datetime: e.payload.doc.data()['datetime'.toString()],
        };
      });

      var all = this.allData;
      this.allData = _.orderBy(all, 'datetime', 'desc');

      for (let index = 0; index < this.allData.length; index++) {
        const Samount = this.allData[index].amount;

        this.list.push(Number(Samount));
      }

      this.sumAmount = sum(this.list);

      this.list = [];
    });
  }

  // Add

  async ADD() {
    let alert = this.alertCtrlin.create({
      header: 'Enter your revenue',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'NAME',
        },
        {
          name: 'amount',
          type: 'number',
          placeholder: 'AMOUNT',
        },
        {
          name: 'datetime',
          type: 'date',
          placeholder: 'DATE',
        },
      ],
      buttons: [
        {
          text: 'CANCLE',
          role: 'cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'ADD',
          handler: (data) => {
            let income =
              //db : inputform
              { name: data.name, amount: data.amount, datetime: data.datetime };

            this.crudService.createData(income);

            // window.location.reload();
          }, //handler
        }, //update
      ],
    });
    (await alert).present();
  }

  // Delete

  async DEL(tmpitem: any) {
    let alert = this.alertCtrlin.create({
      header: 'DELETE',
      message: 'Do you want to delete ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Deleted');

            //this.deleteCountryItem(tmpitem);
            this.crudService.delDataIn(tmpitem.id); //del rowfrom DB
            // window.location.reload();
          },
        },
      ],
    });

    (await alert).present();

  }

  // Edit
  async EDIT(tmpitem: any) {
    let tmpcountry = {};

    let alert = this.alertCtrlin.create({
      header: 'EDIT',
      inputs: [
        {
          name: 'name',
          placeholder: 'NAME',
          type: 'text',
          value: tmpitem.name,
        },
        {
          name: 'amount',
          placeholder: 'AMOUNT',
          type: 'number',
          value: tmpitem.amount,
        },
        {
          name: 'datetime',
          placeholder: 'DATE',
          type: 'date',
          value: tmpitem.datetime,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Update',
          handler: (data) => {
            if (data.name == '' || data.amount == '' || data.datetime == '')
              //show toast
              return false;
            else {
              //update here
              tmpcountry['name'] = data.name;
              tmpcountry['amount'] = data.amount;
              tmpcountry['datetime'] = data.datetime;
              this.crudService.updateDataIn(tmpitem.id, tmpcountry);
            } //else
            // window.location.reload();
          }, //handler
        }, //update
      ],
    });
    (await alert).present();
  }
}
