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
```
