// notification model:
// {
//     user_id: ...,
//     receiver_id: ...,
//     type: ...,
//     message: ...,
//     ID: ...,
//     created_at: ...,
//     updated_at: ...,
//     deleted_at: ...,
// }



import { type } from "os"
import { Server } from "socket.io"

const io = new Server({
    cors: {
        origin: "*", // Todo channge this to your domain
    }
})

let clients = []

// functions to save socket to clients array with user id and user token and remove socket from clients array with user id and user token 

const addNewUser = (user, socketId) => {
    !clients.some((u) => u.ID === user.ID) &&
        clients.push({ user, socketId })
}

const removeUser = (socketId) => {
    clients = clients.filter((user) => user.socketId !== socketId)
}


io.on("connection", (socket) => {
    socket.on("newUser", (data) => {
        console.log("Client connected", data)
        addNewUser(data, socket.id)

        console.log(clients)
    })

    socket.on("sendNotification", ({ receiver, notification }) => {
        if (receiver === "all") {
            io.emit("getNotification", notification)  // broadcast notification to all users
        } else {
            const receiverSocket = clients.find(
                (client) => client.user.ID === receiver
            )
            if (receiverSocket) {
                io.to(receiverSocket.socketId).emit(
                    "getNotification",
                    notification
                )
            }
        }
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected")
        removeUser(socket.id)
    })
})

io.listen(3002)