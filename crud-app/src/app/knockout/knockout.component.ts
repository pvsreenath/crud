import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-knockout',
  templateUrl: './knockout.component.html',
  styleUrls: ['./knockout.component.scss']
})
export class KnockoutComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<KnockoutComponent>) { }

  buttonType = 'Yes'

  ngOnInit(): void {
  }

  deleteIt(){
    this.dialogRef.close('Yes')
  }

}
