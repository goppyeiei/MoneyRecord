import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable, OnInit } from "@angular/core";
import * as lo from 'lodash';

@Injectable({
  providedIn: 'root',
})

export class CurdService {
  constructor(private fs:AngularFirestore) {  }

  readData(){
    return this.fs.collection('income').snapshotChanges();
  }
  createData(income: any){
    return this.fs.collection('income/').add(income);
  }

  updateDataIn(docId: any, income: any){
    return this.fs.doc('income/'+docId).update(income);
  }

  delDataIn(docId: any){
    return this.fs.doc('income/'+ docId).delete();
  }

  readData2(){
    return this.fs.collection('outcome').snapshotChanges();
  }
  createData2(outcome: any){
    return this.fs.collection('outcome/').add(outcome);
  }

  updateDataOut(docId: any, outcome: any){
    return this.fs.doc('outcome/'+docId).update(outcome);
  }

  delDataOut(docId: any){
    return this.fs.doc('outcome/'+ docId).delete();
  }

}
