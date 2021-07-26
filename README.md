# RESTFul-API-Sandwich-Service

## Reason for project
This is a demonstration of a RESTFul API that accepts and lists sandwich orders. It is written using Node.js. The schedule of orders must contain the sequence number, time, task and recipient. It is assumend that it takes 2 1/2 minutes to make a sandwich and 1 minute to serve the sandwich and take payment. If there aren't any sandwich orders then the sandwich maker can take a break. 

This project uses Postman to test the API through its development and testing. 

### General Testing

I went through each of the following tests to make sure that the API worked as expected. I was using Postman which was pointing to _"localhost:3000/schedule/"_ to test each of these scenarios.

| Test | Expected Result | Actual Result |
| ---------- | ------ | ----------- |
| Make a GET Request so that the full schedule is returned | A message is returned confirming the full schedule has been returned along with all of the orders in JSON format |  **PASSED** |
| Make a GET Request with a specific Id to make sure only that order is returned | A message is returned confirming the individual order has been returned along with the specific order details in JSON format | **PASSED** |
| Make a POST request with a raw JSON body of {"name": "Darren"}  | If a break is in the last entry then this is deleted as the break has now finished. Three new entries are then added to the array. The first is the details for the making of the sandwich, the second is the details of serving the sandwich and the third is a allowing a break. A message is returned confirming three new entries along with the entries in JSON format | **PASSED** |
| Make a GET Request to make sure the details of the orders just entered is returned | A message is returned confirming the full schedule has been returned along with all of the orders in JSON format including the three new entries just entered |  **PASSED** |
| Make a GET Request with the specific Id of the order just entered to make sure only that order is returned | A message is returned confirming the individual order has been returned along with the specific order details in JSON format | **PASSED** |
| Make a POST request with a raw JSON body of {"name": "Fred"}  | If a break is in the last entry then this is deleted as the break has now finished. Three new entries are then added to the array. The first is the details for the making of the sandwich, the second is the details of serving the sandwich and the third is a allowing a break. A message is returned confirming three new entries along with the entries in JSON format | **PASSED** |
| Make a GET Request to make sure the details of the orders just entered is returned | A message is returned confirming the full schedule has been returned along with all of the orders in JSON format including the three new entries just entered |  **PASSED** |
| Make a GET Request with the specific Id of the order just entered to make sure only that order is returned | A message is returned confirming the individual order has been returned along with the specific order details in JSON format | **PASSED** |
| Make a PATCH request with a specific id and a raw JSON body of {"order": "Updated order for darren"}  | The order with the specified id should change its description to the updated one. A message should be returned confirming that the order has been updated along with the details of the updated order in JSON format | **PASSED** |
| Make a GET Request to make sure the details of the order just updated is returned | A message is returned confirming the full schedule has been returned along with all of the orders in JSON format including the order that has been updated |  **PASSED** |
| Make a GET Request with the specific Id of the order just updated to make sure only that order is returned | A message is returned confirming the individual order has been returned along with the specific order details in JSON format | **PASSED** |
| Make a DELETE Request with the specific Id of an order you want deleted | A message is returned confirming the individual order has been deleted along with the specific order details in JSON format | **PASSED** |
| Make a GET Request to make sure the details of the order just deleted is no longer in the schedule | A message is returned confirming the full schedule has been returned along with all of the orders in JSON format excluding the order that has been deleted |  **PASSED** |
| Make a GET Request with the specific Id of the order just deleted | A message is returned confirming the individual order has not been found | **PASSED** |

### Cloning
If you wish to clone this project then you will need Node.js installed and run the following so that the relevant packages are installed:
* npm init
* npm install --save express
* npm install --save-dev nodemon
* npm install --save morgan

### Additional Requirements
I used a local array to test the functionality of this API. The next step is to incorporate a database, perhaps MongoDB. I chose not to use a database as I was more interested in the functionality of the API. When the database is incorporated then the id will be autogenerated so any functionality to do with the id in the API will need to be amended. 
