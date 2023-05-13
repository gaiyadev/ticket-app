import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import {environment} from "../../environments/environment";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import jsPDF from 'jspdf';
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
// @ts-ignore
import htmlToPdfmake from 'html-to-pdfmake';
@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.css']
})
export class RecieptComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id : any=  params.get('id')
      this.recieved( id)
    })
  }

  book: any = {}
  seat_number: any
  amount: any
  uniqueId: any
  userData: any

  recieved(id:number) {
    this.http.get<any>(`${environment.baseUrl}/tickets/${id}`)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.book =response.book
          this.seat_number =response.seat_number
          this.amount =response.amount
          this.uniqueId =response.uniqueId
          this.userData =response.user
        },
        error: (error) => {
          console.log('error er', error);
        },
        complete: () => {
          console.log('Done fetching data')
        }
      });
  }
  printReciept() {
    // const mywindow = window.open('', 'PRINT', 'height=400,width=600');
    // window.print()
  }
  title = 'htmltopdf';


  public downloadAsPDF() {
    const doc = new jsPDF();
    // @ts-ignore
    const pdfTable = this.pdfTable.nativeElement;
    const html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
    doc.save(`${this.userData.firstName}-${this.userData.email}`);
  }
}
