import { OnInit } from '@angular/core';
import { CurdService } from './../CrudService';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { AlertController, IonIcon, IonicRouteStrategy } from '@ionic/angular';
import { forEach, sum } from 'lodash';
import * as _ from 'lodash';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  allData: any;
  sumAmount: number;
  list = [];

  constructor(
    private crudService: CurdService,
    private alertCtrlin: AlertController
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.crudService.readData2().subscribe((data) => {
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

  async ADD() {
    let alert = this.alertCtrlin.create({
      header: 'Select Data',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'NAEM',
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
          text: 'Cancel',
          role: 'cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'ADD',
          handler: (data) => {
            let outcome =
              //db : inputform
              { name: data.name, amount: data.amount, datetime: data.datetime };
            console.log('amount', outcome.amount);

            console.log('GG', outcome);
            this.crudService.createData2(outcome);
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
            this.crudService.delDataOut(tmpitem.id); //del rowfrom DB
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
          value: tmpitem.name,
        },
        {
          name: 'amount',
          placeholder: 'AMOUNT',
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
              this.crudService.updateDataOut(tmpitem.id, tmpcountry);


            }
            // window.location.reload(); //else
          }, //handler
        }, //update
      ],
    });
    (await alert).present();
  }
}
