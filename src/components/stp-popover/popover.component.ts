import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-stp-base-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() popoverTitle!: string;
  @Input() placement!: string;
  @Input() disablePopover!: boolean;
  @Input() autoClose!: string;
  constructor() {}

  ngOnInit(): void {}
}
