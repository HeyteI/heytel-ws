# Heytel-ws
Really simple websocket server used for notifications system in Heytel

## Setup
Clone repository `git clone https://github.com/Heytei/heytel-ws.git`
Install dependencies `npm install`
Run server `npm start`

## Usage (for developers)
Server is running on port 3002. To connect to server use `ws://localhost:3002` or `wss://localhost:3002` if you want to use secure connection. To send notification use `sendNotification` function. It takes three arguments: `sender`, `receier` and `notification`. `notification` is a object that describes what kind of notification is it. `notification` is an object that contains data that will be sent to client. To receive notification use `getNotification` event. It returns object that is described in next paragraph

## Notification object
```json
{
    "user_id": "8332b884-4321-4397-b781-2f092ed24e44",
    "receiver_id": "fb5244e5-0b86-42aa-a9dd-591ced826b12",
    "type": "alert",  // alert, warning, info
    "message": "There is problem in room 301",
    "ID": "f8e39008-ec67-4bb0-902f-48502d30499c",
    "created_at": "2022-08-12 08:11:32.791477+08",
    "updated_at": "2022-08-12 08:11:32.791477+08",
    "deleted_at": "",
}
```