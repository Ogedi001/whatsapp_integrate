# whatsapp_integrate

## Installation

1. **Clone the repository:**  
   ```bash
   git clone <repository_url>
2. **Navigate to the project directory:**  
   ```bash
   cd <project_directory>

2. **Install dependencies:**  
   ```bash
   npm install 
   ```

## Configuration File

install dotenv
```bash
npm install dotenv
```

**Create a new file named .env in the root directory of the project**

**Set up environment variables: Rename  in .env file and fill in the required variables.**
```plaintext
PORT=<port_number> //default 3000
ACCESS_TOKEN=<Business_whatsapp_account_acess_token>
PHONE_NUMBER_ID=<ID>
RECIPIENT_PHONE_NUMBER=<Recipient_phone_no>
BUSSINESS_ACCOUNT_ID=<Bussiness_acct_id"
```

**Import and use environmental variebles**
```js
import "dotenv/config";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const RECIPIENT_PHONE_NUMBER = process.env.RECIPIENT_PHONE_NUMBER;
const BUSSINESS_ACCOUNT_ID = process.env.BUSSINESS_ACCOUNT_ID
```

## Adding a Number on Meta (Facebook) Side

**Go to [Facebook Meta developer account](https://developers.facebook.com/)**
```text
Create a meta developer account on sign in
```
**Create Whatsapp Business Account [Learn more](https://developers.facebook.com/docs/development/create-an-app/). If you don't see an option to create a business app, select Other > Next > Business)***

**Set Up WhatsApp Business Account**

If you haven't already, set up a WhatsApp Business Account and connect it to your account.

**Get Phone Number ID**

Navigate to your WhatsApp Business Account settings.
Under the 'Phone Numbers' section, you will find the phone number you want to use. Note the Phone Number ID for this number.

**You can navigate to your developer app dashboard>>Whatsapp>>API SETUP**

All information needed for env is there, you can add and manage phone numbers.

![alt text](<src/assets/Whatsap busines.jpg>)


## Documentation

## Endpoints

#### Send Message
```plaintext
POST http://localhost:3000/api/Message
```
**BODY**
```json
{
    "message":"hello Shlup , how are you doing today"
}
```
**Response**
```json
{
    "message": "success",
    "data": {
        "messaging_product": "whatsapp",
        "contacts": [
            {
                "input": "2348130088400",
                "wa_id": "2348130088400"
            }
        ],
        "messages": [
            {
                "id": "wamid.HBgNMjM0ODEzMDA4ODQwMBUCABEYEjVFQkE1Q0FBN0I3NjQ1OTMxNQA="
            }
        ]
    }
}
```

#### Create Message Template
**N/B**
##### Category must be either
```plaintext
AUTHENTICATION
MARKETING
UTILITY 
```
##### Template component contains, header, body, footer, and buttons.  only 'body' must be provided, others are optional
##### buttons is an array; you can have more than one of the  required button type
```plaintext
PHONE_NUMBER
URL 
QUICK_REPLY
```
##### If button is type URL; url field must be included, if type is PHONE_NUMBER; phone_number must be included.
#### QUICK_REPLY required only type and text field


**Request**
```plaintext
POST http://localhost:3000/api/Message/create_template_message
```
**BODY**
```json
{
    "name":"promo",
    "category":"MARKETING",
    "payload":{
        "header":"Season Greetings",
        "body":"This is one in a million offer",
        "footer":"your number 1",
        "buttons":[
        {
            "type":"PHONE_NUMBER",
            "text":"Call Me",
            "phone_number": 2348122299999
        },
        {
            "type":"URL",
            "text":"visit our URL",
            "url":"https://www.google.com"
        },
         {
            "type": "QUICK_REPLY",
            "text": "Unsubscribe from Promos"
        },
        {
           "type":"QUICK_REPLY",
           "text": "Unsubscribe from All"
       }
        ]
    }
}
```
**Response**
```json
{
    "message": "Template created successfully",
    "data": {
        "id": "2704370109717763",
        "status": "PENDING",
        "category": "MARKETING"
    }
}
```


