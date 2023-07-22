import json
import serial
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
class SerialConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.arduino_port = 'COM9'
        self.baud_rate =  9600 
        try:
            self.ser = serial.Serial(self.arduino_port, self.baud_rate, timeout=1)
        except serial.SerialException as e:
            await self.close()
            return
        await self.accept()
        asyncio.create_task(self.read_serial_data())
    async def disconnect(self, close_code):
        self.ser.close()
    async def read_serial_data(self):
        while True:
            try:
                data = self.ser.readline().decode()
                print(data)
                last_line = data
            except UnicodeDecodeError:
                continue
            # Send the received data over the WebSocket
            await self.send(json.dumps({'data': last_line }))
            await asyncio.sleep(0.1)