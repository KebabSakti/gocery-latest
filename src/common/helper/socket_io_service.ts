import http from "http";
import { Server } from "socket.io";

class SocketIoService {
  static init(server: http.Server) {
    const io = new Server(server);

    return io;
  }
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

export { SocketIoService };
