import * as http from 'http';

const agent = new http.Agent({ keepAlive: true, maxSockets: 50 });

const dummyData = {
  name: "John Doe",
  age: 30,
  email: "johndoe@example.com",
  anything: "test test test"
};

//const jsonTest = JSON.stringify(dummyData);
const jsonTest = `{
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "address": {
          "street": "123 Main St",
          "city": "Anytown",
          "state": "CA",
          "postalCode": "12345"
        },
        "phone": "123-456-7890",
        "isActive": true
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "address": {
          "street": "456 Elm St",
          "city": "Anycity",
          "state": "NY",
          "postalCode": "67890"
        },
        "phone": "987-654-3210",
        "isActive": false
      },
      {
        "id": 3,
        "name": "Sam Johnson",
        "email": "sam.johnson@example.com",
        "address": {
          "street": "789 Maple Ave",
          "city": "Anystate",
          "state": "TX",
          "postalCode": "11223"
        },
        "phone": "567-890-1234",
        "isActive": true
      }
    ],
    "metadata": {
      "version": "1.0",
      "timestamp": "2023-09-15T10:00:00Z",
      "totalCount": 3
    }
  }`;

let responses = 0;
let total = 0;
let start = Date.now();

setInterval(() => {
  console.log(`Responses per second: ${responses / ((Date.now() - start) / 1000)}`);
  start = Date.now();
  responses = 0;
}, 1000);

for (let i = 0; i < 5000; i++) {
  setInterval(async () => {
    try {

        const response = await fetch("http://localhost:6969/insert", {
            method: "POST",
            body: jsonTest,
            headers: { "Content-Type": "application/json" },
        });

        const body = await response.text();

        if (body == '1441a7909c087dbbe7ce59881b9df8b9') {
            responses++;
            total++;
        } else {
            console.log('error checksum');
        }
          
 

    } catch (error) {
      console.error(error);
    }
  }, 0);
}

setTimeout(() => {
    console.log(total/10, 'requests per second');
    process.exit()
  }, 10000);

