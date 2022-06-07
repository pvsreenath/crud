import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-knockout',
  templateUrl: './knockout.component.html',
  styleUrls: ['./knockout.component.scss']
})
export class KnockoutComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<KnockoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    ) { }

  buttonType = 'Yes'

  ngOnInit(): void {
  }

  doIt(){
    this.dialogRef.close('Yes')
  }

}
