export enum Channel {
  incomingMessage = 'incoming-message', // Handle client message
  disconnect = 'disconnect',
  refresh = 'refresh', // Refresh current channel display
  rooms = 'rooms', // Initial room loading
  roomUpdate = 'room-update',
}
