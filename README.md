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
```

**Import and use environmental variebles**
```js
import "dotenv/config";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const RECIPIENT_PHONE_NUMBER = process.env.RECIPIENT_PHONE_NUMBER;
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

![alt text](<src/middleware/Whatsap busines.jpg>)