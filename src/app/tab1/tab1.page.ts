import { OnInit } from '@angular/core';
import { CurdService } from './../CrudService';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { sum } from 'lodash';
import * as _ from 'lodash';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  dataIncome: any;
  dataOutcome: any;
  listIn = [];
  listOut = [];
  sumIn: any;
  sumOut: any;
  avgIn: any;
  avgOut: any;
  balance: any;
  Usefor: any;
  percent: any;
  level: any;
  colors: any;


  constructor(
    private crudService: CurdService,
    private alertCtrlin: AlertController
  ) {}

  ngOnInit(): void {
    //////////////////////////////////////////////////////////////////////
    this.crudService.readData().subscribe((data) => {
      this.dataIncome = data.map((e) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'.toString()],
          amount: e.payload.doc.data()['amount'.toString()],
          datetime: e.payload.doc.data()['datetime'.toString()], //Income
        };
      });



      for (let index = 0; index < this.dataIncome.length; index++) {
        const Samount = this.dataIncome[index].amount;
        this.listIn.push(Number(Samount));
      }
    });

    ///////////////////////////////////////////////////////////////////////
    this.crudService.readData2().subscribe((data) => {
      this.dataOutcome = data.map((e) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'.toString()],
          amount: e.payload.doc.data()['amount'.toString()],
          datetime: e.payload.doc.data()['datetime'.toString()], //Outcome
        };
      });

      for (let index = 0; index < this.dataOutcome.length; index++) {
        const Samount = this.dataOutcome[index].amount;
        this.listOut.push(Number(Samount));
      }

      ///////////////////////////////////////////////////////////////////////


      this.sumIn = sum(this.listIn);
      this.listIn = [];
      this.sumOut = sum(this.listOut);
      this.listOut = [];
      this.balance = this.sumIn - this.sumOut; //Summary
      this.avgIn = (this.sumIn / this.dataIncome.length).toFixed(2);
      this.avgOut = (this.sumOut / this.dataOutcome.length).toFixed(2);
      this.Usefor = (this.balance / this.avgOut).toFixed(0);
      this.percent = ((this.sumOut * 100) / this.sumIn).toFixed(2);
      this.percent = (100 - this.percent).toFixed(2);

      if (this.percent > 60) {
        this.level = 'Very Good';
        this.colors = 'green';
      } else if (this.percent > 50) {
        this.level = 'Good';
        this.colors = 'yellow';
      } else if (this.percent > 35) {
        this.level = 'Normal';
        this.colors = 'black';
      } else if (this.percent > 20) {
        this.level = 'Bad';
        this.colors = 'brown';
      } else {
        this.level = 'Very bad';
        this.colors = 'red';
      }

      ///////////////////////////////////////////////////////////////////////
    });

  }
}
