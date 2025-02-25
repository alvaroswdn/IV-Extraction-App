export type MachineData = {
  id: string
  name: string
  online: boolean
  lastOnline: number
  volume: number
  bags: number
  maxVolume: number
  maxBags: number
}

export const machines: MachineData[] = [
  {
    id: '1',
    name: 'Machine 1',
    online: true,
    lastOnline: Date.now(),
    volume: 10,
    bags: 10,
    maxVolume: 20,
    maxBags: 200,
  },
  {
    id: '2',
    name: 'Machine 2',
    online: false,
    lastOnline: Date.now(),
    volume: 10,
    bags: 10,
    maxVolume: 20,
    maxBags: 23,
  },
  {
    id: '3',
    name: 'Machine 3',
    online: true,
    lastOnline: Date.now(),
    volume: 10,
    bags: 10,
    maxVolume: 20,
    maxBags: 20,
  },
  {
    id: '4',
    name: 'IV-04',
    online: true,
    lastOnline: Date.now(),
    volume: 10,
    bags: 10,
    maxVolume: 20,
    maxBags: 20,
  },
  {
    id: 'bob',
    name: 'Bob',
    online: true,
    lastOnline: Date.now(),
    volume: 200,
    maxVolume: 250,
    bags: 40,
    maxBags: 65,
  },
  {
    id: 'jeff',
    name: 'Jeff',
    online: true,
    lastOnline: Date.now(),
    volume: 130,
    maxVolume: 250,
    bags: 40,
    maxBags: 85,
  },
  {
    id: 'mickey',
    name: 'Mouse',
    online: false,
    lastOnline: Date.now(),
    volume: 60,
    maxVolume: 250,
    bags: 57,
    maxBags: 85,
  },
]