import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime, pipe } from 'rxjs';

@Component({
  selector: 'shared-input-text-custom',
  templateUrl: './input-text-custom.component.html',
  styleUrls: ['./input-text-custom.component.css']
})
export class InputTextCustomComponent implements OnInit, OnDestroy {

  private debounder: Subject<string> = new Subject<string>;

  private debounderSuscription!: Subscription;

  @Output()
  public outPutText: EventEmitter<string> = new EventEmitter();

  @Input()
  public placeHolder!: string;

  @Input()
  public term: string = '';

  constructor() { }

  ngOnInit() {

    this.debounderSuscription = this.debounder
    .pipe(
      debounceTime(1000)
    )
    .subscribe(value => {
      this.outPutText.emit(value);
    });

  }

  ngOnDestroy(): void {
    this.debounderSuscription.unsubscribe();
  }

  onKeyPress(searchTerm: string) {
    this.debounder.next(searchTerm);
  }

}
