import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";


@Injectable()
@WebSocketGateway()
export class UsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server
    private connectedUsers = new Map<string, string>()
    private activesRooms: string[] = [];
    private onlineUsers = new Map<string, string>()

    constructor(private jwtService: JwtService) { };

    handleConnection(client: Socket) {
        try {
            const token = client.handshake.auth.token
            const payload = this.jwtService.verify(token)
            const userId = payload['sub'];
            const userFullName = payload['firstName'] + ' ' + payload['lastName'];
            const projectRoom: string = `room_${payload['projectId']}`

            if (!this.activesRooms.includes(projectRoom)) {
                this.activesRooms.push(payload['projectId'])
            };

            client.join(projectRoom)
            client.join(userId)
            this.server.emit('roomJoined', { userId, userFullName, projectRoom })

            this.connectedUsers.set(userId, client.id);
            this.onlineUsers.set(userId, "online")
            this.server.emit('getOnlineUsers', Object.fromEntries(this.onlineUsers));

            this.server.emit('userStatusChange', { userId, status: 'online' })
        } catch (error) {
            client.disconnect()
            console.log(error)
        }
    }

    handleDisconnect(client: Socket) {
        const userId = this.getUserIdBySocketId(client.id);
        if (userId) {
            this.connectedUsers.delete(userId);
            this.server.emit('userStatusChange', { userId, status: 'offline' })
            this.onlineUsers.delete(userId)
            this.server.emit('getOnlineUsers', Object.fromEntries(this.onlineUsers));
            client.leave(userId)
            client.leave(client.id)
        }
    }

    handleUserLogin(userId: string) {
        this.server.emit('userStatusChange', { userId, status: 'online' })
    }

    handleUserLogout(userId: string) {
        this.connectedUsers.delete(userId);
        this.server.emit('userStatusChange', { userId, status: 'offline' })
        this.server.emit('getOnlineUsers', Object.fromEntries(this.onlineUsers));
    }

    @SubscribeMessage('getOnlineUsers')
    async getOnlineUsers() {
        return Object.fromEntries(this.onlineUsers)
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: { room: string, message: string, senderId: number, senderFullName: string, sendAt: Date }): void {
        console.log("payload: ", payload);
        if (client.rooms.has(payload.room)) {
            this.server.to(payload.room).emit('newMessage', {
                roomId: payload.room,
                content: payload.message,
                senderId: payload.senderId,
                senderFullName: payload.senderFullName,
                sendAt : payload.sendAt
            });
        } else {
            client.emit('error', 'You are not allowed to send messages to this room');
        }
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, roomId: string ) {

        client.join(roomId)
        const token = client.handshake.auth.token
        const payloadAuth = this.jwtService.verify(token)
        const userId = payloadAuth['sub'];
        const userFullName = payloadAuth['firstName'] + ' ' + payloadAuth['lastName'];
        this.server.emit('roomJoined', { userId, userFullName, projectRoom: roomId })
    }

    private getUserIdBySocketId(socketId: string): string | undefined {
        for (const [userId, connectedSocketId] of this.connectedUsers.entries()) {
            if (connectedSocketId === socketId) {
                return userId;
            }
        }
        return undefined;
    }
}