export enum Category {
    AUTHENTICATION = 'AUTHENTICATION',
    MARKETING = 'MARKETING',
    UTILITY = 'UTILITY'
  }
  
  export enum ButtonType {
    PHONE_NUMBER = 'PHONE_NUMBER',
    URL = 'URL',
    QUICK_REPLY = 'QUICK_REPLY'
  }


  
export interface Button {
    type: ButtonType;
    text: string;
    phone_number?: string;
    url?: string;
  }
  
 export interface Payload {
    header?: string;
    body: string;
    footer?: string;
    buttons?: Button[];
  }
  
