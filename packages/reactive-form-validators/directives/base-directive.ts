import {Input, ElementRef ,Renderer,ContentChildren,QueryList } from "@angular/core"
import { FormGroup , AbstractControl,NgModel } from "@angular/forms"
import { AnnotationTypes } from "../core/validator.static";
import { NgModelDirective } from './template-validations/required.directive'
import {INPUT,SELECT,CHECKBOX,TEXTAREA,KEYPRESS, ONCHANGE,ONKEYUP,ONCLICK,
RADIO,FILE, ONBLUR,ONFOCUS,ELEMENT_VALUE
  } from "../const";
import { DecimalProvider } from "../domain/element-processor/decimal.provider"
export abstract class BaseDirective {
    element:HTMLElement;
    htmlElements:string[] = ["input","select","textarea"]
    validationRule:any = {};
    @Input() formGroup: FormGroup;
    @ContentChildren(NgModelDirective) ngModelElements: QueryList<NgModelDirective>;
    @ContentChildren(NgModel) ngModels: QueryList<NgModel>;

    constructor(private elementRef: ElementRef,private decimalProvider:DecimalProvider,private renderer: Renderer){
      this.element = this.elementRef.nativeElement;
    }

    bindEvents():void {
      if(this.validationRule && this.validationRule.conditionalValidationProps){
                for(var columnName in this.validationRule.conditionalValidationProps){
                      let controlElement = this.getControl(columnName);
                      if(controlElement && controlElement.length > 0)
                        controlElement[0][this.getEventName(controlElement[0])] = this.validationChange(this.validationRule.conditionalValidationProps[columnName],this.formGroup);
                }      
      }
      this.handleNumeric();
    }

    getEventName(element:any){
      var eventName:string = '';
      switch(element.tagName){
        case INPUT:
        case TEXTAREA:
         eventName = (element.type == CHECKBOX || element.type == RADIO || element.type == FILE) ?  ONCHANGE : ONKEYUP;
        break;
        case SELECT:
         eventName = ONCHANGE;
        break;
      }
      return eventName;
    }

    getControl(name:string) {
      var element = this.getNgModelElement(name);
      if (!element) {
      for(var i=0;i<this.htmlElements.length;i++) {
          element = this.element.querySelectorAll(`${this.htmlElements[i]}[formControlName='${name}']`);
          if(element)
            break;
      }
    }
      return element;
    }

    getNgModelElement(name:string) : any{
      if(this.ngModelElements && this.ngModelElements.length > 0){
        let findElement = this.ngModelElements.filter(t=>t.name == name)[0];
        return findElement ? [findElement.element] : undefined;
      }
        return undefined;
    }

    validationChange(props:string[],formGroup:FormGroup) {
      return () =>{
        props.forEach((name:string) => {
            if(formGroup.controls[name])
              formGroup.controls[name].updateValueAndValidity();
        })
      }
    }

    onFocus(control:AbstractControl){
      return (event) => {
        let value = this.decimalProvider.replacer(control);
        this.setValueOnElement(event.srcElement,value);
      }
    }

    onBlur(control:AbstractControl){
      return (event) => {
        let value = this.decimalProvider.transFormDecimal(control);
        control.setValue(this.decimalProvider.replacer({value:value}));
        this.setValueOnElement(event.srcElement,value);
      }
    }

    handleNumeric(){
      if(this.formGroup){
      for(var controlName in this.formGroup.controls){
          let control:any = this.formGroup.controls[controlName];
          if(control.config && control.type == AnnotationTypes.numeric && control.config.isFormat){
                let controlElement = this.getControl(controlName);
                if(controlElement && controlElement.length > 0){
                    controlElement[0]["onblur"] = this.onBlur(control);
                    controlElement[0]["onfocus"] = this.onFocus(control);
                }
          }
      }

    }
    }

    private setValueOnElement(element:any,value: any) {
        this.renderer.setElementProperty(element, ELEMENT_VALUE, value);
    }
}