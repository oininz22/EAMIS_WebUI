import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequiredattachmentModalComponent } from '../requiredattachment-modal/requiredattachment-modal.component';

@Component({
  selector: 'app-received-property',
  templateUrl: './received-property.component.html',
  styleUrls: ['./received-property.component.css']
})
export class ReceivedPropertyComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(){
    this.dialog.open(RequiredattachmentModalComponent)
    .afterClosed().subscribe(response => {
      if(response === 'save'){
        
      }
    });
  
  }

}
