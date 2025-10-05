import { User } from "./UserManger"; // keep your import name as-is

let GLOBAL_ROOM_ID = 1;

interface Room {
    user1: User,
    user2: User,
}

export class RoomManager {
    private rooms: Map<string, Room>;

    constructor() {
        this.rooms = new Map<string, Room>();
    }

    // Return roomId so caller can store mappings
    createRoom(user1: User, user2: User) {
        const roomId = this.generate().toString();
        this.rooms.set(roomId, { user1, user2 });

        // Your original behavior: ask both to start offer (you may choose only one in future)
        user1.socket.emit("send-offer", { roomId });
        user2.socket.emit("send-offer", { roomId });

        return roomId;
    }

    onOffer(roomId: string, sdp: string, senderSocketid: string) {
        const room = this.rooms.get(roomId);
        if (!room) return;

        const receivingUser = room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
        receivingUser?.socket.emit("offer", { sdp, roomId });
    }
    
    onAnswer(roomId: string, sdp: string, senderSocketid: string) {
        const room = this.rooms.get(roomId);
        if (!room) return;

        const receivingUser = room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
        receivingUser?.socket.emit("answer", { sdp, roomId });
    }

    onIceCandidates(roomId: string, senderSocketid: string, candidate: any, type: "sender" | "receiver") {
        const room = this.rooms.get(roomId);
        if (!room) return;

        const receivingUser = room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
        receivingUser.socket.emit("add-ice-candidate", ({candidate, type}));
    }

    // NEW: teardown helpers for robust leave/next flows
    teardownUser(roomId: string, userId: string) {
        console.log(`[ROOMMANAGER] teardownUser called for roomId: ${roomId}, userId: ${userId}`);
        const room = this.rooms.get(roomId);
        if (!room) {
          console.log(`[ROOMMANAGER] Room not found for roomId: ${roomId}`);
          return;
        }

        const other = room.user1.socket.id === userId ? room.user2 : room.user1;
        console.log(`[ROOMMANAGER] Other user in room: ${other.socket.id}`);
        // Notify other side that this room is done (front-end can stop peer connection)
        // Removed duplicate notification - handled in UserManager.handleLeave
        this.rooms.delete(roomId);
    }

    teardownRoom(roomId: string) {
        console.log(`[ROOMMANAGER] teardownRoom called for roomId: ${roomId}`);
        const room = this.rooms.get(roomId);
        if (!room) {
          console.log(`[ROOMMANAGER] Room not found for roomId: ${roomId}`);
          return;
        }

        // Optionally notify both sides (guard if sockets are still connected)
        // Removed duplicate notifications - handled in UserManager.handleLeave
        this.rooms.delete(roomId);
    }

    generate() {
        return GLOBAL_ROOM_ID++;
    }
}