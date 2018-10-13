import { Component } from '@angular/core';
import { OnInit } from "@angular/core";
import { ReactiveFormConfig } from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rx-app';
  ngOnInit() {
    ReactiveFormConfig.set({
      "internationalization": {
        "dateFormat": "dmy",
        "seperator": "/"
      },
     "validationMessage": {
        "allOf":"Please select all options",
        "alpha": "Only alphabets are allowed.",
        "alphaNumeric": "Only Alpha Numerics are allowed.",
        "choice":"Please choose options according to minLength and maxLength",
        "contains": "Input does not contain defined string",
        "compare": "Input does not match",
        "creditCard": "Input is not in the credit card format",
        "different":"Please enter different values",
        "digit": "Only digits are allowed",
        "email": "Invalid email format",
        "even":"Please enter an even number",
        "factor":"Please enter valid factors",
        "greaterThan": "Input should be greater than pre defined field",
        "greaterThanEqualTo": "Input should be greater than or equal to pre defined field",
        "hexColor": "Invalid Hex Color format",
        "json": "Invalid json format",
        "leapYear":"Please enter a valid leap year",
        "lessThan": "Input should be less than pre defined field",
        "lessThanEqualTo": "Input should be less than or equal to pre defined field",
        "lowerCase": "Input must be in lower case",
        "mac":"Invalid mac format",
        "maxLength": "Input exceeds the maximum length",
        "maxNumber": "Maximum number is not matched.",
        "maxDate": "Input date exceed the maximum date",
        "minDate": "Input date is less than the minimum date.",
        "minLength": "Input is less than the minimum length",
        "minNumber": "Minimum number is not matched.",
        "noneOf":"You can not select any option",
        "numeric":"Please enter valid number",
        "odd":"Please enter an odd number",
        "oneOf":"You can select only one option",
        "password": "Input does not match the password requirements",
        "pattern": "Input does not match the pattern requirements",
        "range": "Input exceeds the range",
        "required": "This field is required",
        "time": "Input must be a proper time",
        "upperCase": "Input must be in Uppercase",
        "url": "Input must be an url"
      }

    });
  }
}