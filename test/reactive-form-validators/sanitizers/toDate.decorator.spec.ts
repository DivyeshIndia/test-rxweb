
import {  RxFormBuilder,ReactiveFormConfig, toDate, prop } from '../../../packages/reactive-form-validators';



export class User {

    @prop()
    @toDate()
    dob: any;

}




(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
              "validationMessage": {
                "date": "enter correct date.",
              },
              "baseConfig": {
                "dateFormat": "dmy",
                "seperator": "/"
            }
            });
           
          });
        describe('toDateDecorator', () => {

            it('should pass.',
                () => {
                    let user = new User();
                    user.dob = "10/10/2019";
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.dob.value).toEqual(new Date(2019,10-1,10));
                });

                
            it('should pass with setValue method',
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.dob.setValue("10/10/2019");
                expect(formGroup.controls.dob.value).toEqual(new Date(2019,10-1,10));
            });

            
            it('invalid date should not set.',
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.dob.setValue("10");
                expect(formGroup.controls.dob.value).toEqual(null);
            });

            //end
        });
    });
})();
