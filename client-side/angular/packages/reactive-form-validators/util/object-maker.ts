import { ReactiveFormConfig } from "./reactive-form-config";

export class ObjectMaker{
    static toJson(key: string, config:any, values: any) {
        let message = config ? config.message : null;
        let messageKey = undefined;
        if(!message && config && config.messageKey)
            messageKey = config.messageKey;
        let messageText = (message) ? message : (ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.validationMessage && ReactiveFormConfig.json.validationMessage[messageKey || key])? ReactiveFormConfig.json.validationMessage[messageKey || key] : '';
        values.forEach((t ,index)=> {
            messageText = messageText.replace(`{{${index}}}`, t);
        });
        let jObject = {};
        jObject[key] = {
            message: messageText, refValues: values
        };
        if (config && config.isAddMessageKey)
            jObject["messageKey"] = messageKey;
        return jObject;
    }
    static null() {
        return null;
    }

    static getPasswordMessage() {
        let messageKey = "password";
        return (ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.validationMessage && ReactiveFormConfig.json.validationMessage[messageKey]) ? ReactiveFormConfig.json.validationMessage[messageKey] : ''
    }
}
