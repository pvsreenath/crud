import { Component, Inject, OnInit } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any) { }

  action = '';
  ngOnInit(): void {
    console.log(this.data)
    if(this.data.message){
      this.action = this.data.message
    }
  }

}
