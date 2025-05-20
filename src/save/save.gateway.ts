import {
  WebSocketGateway,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { SaveService } from './save.service'

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  namespace: '/save',
})
export class SaveGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private connectedUsers = 0

  constructor(private readonly saveService: SaveService) {}

  afterInit() {
    this.saveService.newChange$.subscribe((newChange) => this.server.emit('new-changes', newChange))
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    this.connectedUsers++
    client.emit('connected', {
      message: 'Connected to the websocket',
      connectedUsers: this.connectedUsers,
    })
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.connectedUsers--
    this.server.emit('users-updated', {
      connectedUsers: this.connectedUsers,
    })
  }
}
