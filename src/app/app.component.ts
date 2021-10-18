import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface PercentagesTip {
  label: string,
  value: number,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  tipFormGroup: FormGroup;

  tipAmount: number = 0;
  total: number = 0;

  percentageSelectedIndex: number = -1;
  percentagesTips: PercentagesTip[] = [
    {
      label: "5%",
      value: .05,
    },
    {
      label: "10%",
      value: .10,
    },
    {
      label: "15%",
      value: .15,
    },
    {
      label: "25%",
      value: .25,
    },
    {
      label: "50%",
      value: .5,
    }
  ]

  ngOnInit() {
    this.tipFormGroup = new FormGroup({
      bill: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      numPeople: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern("^[0-9]*$")]),
    })
  }

  /**
   *Calculate the total to pay per person includes the tip 
 * @param {number}  percentage -Tip percentage. 
 * @param {number=} index - index of selected percentage tip 
 */
   calculateTip(percentage: number, index: number) {

    if( this.percentageSelectedIndex !== index ) {
      this.percentageSelectedIndex = index;

      if( this.tipFormGroup.valid ) {
        const billValue: number = +parseFloat(this.tipFormGroup.get('bill').value).toFixed(2);
        const numPeople: number = +(this.tipFormGroup.get('numPeople').value);

        if( billValue <= 0 ) {
          // error msg
          return;
        }

        if( numPeople <= 0 ) {
          this.tipFormGroup.get('numPeople').setErrors({zeroError: true});
          // error msg
          return;
        }
  
        const totalTip: number = +(billValue * percentage);
        const tip: number = billValue / numPeople;
  
        this.tipAmount =  totalTip / numPeople;
        this.total = tip + this.tipAmount;
  
      }
    }
  }

  /**
   *set a background color to the selected percentage 
 * @param {number=} index - item index 
 * @return {string} background color of the selected percentage 
 */
  setSelectedTipClass(index: number): string {

    return this.percentageSelectedIndex === index ? 
            'bg-strong-cyan hover:bg-strong-cyan text-very-dark-cyan'
            : 
            'bg-very-dark-cyan hover:bg-light-grayish-cyan hover:text-very-dark-cyan text-white-cyan';
  }

  /**
  Set the values to 0 to start a new calculation
 */
  reset() {
    this.tipFormGroup.reset();
    this.tipAmount = 0;
    this.total = 0;

    this.percentageSelectedIndex = -1;
  }
}
