// src/data/mockParcels.js

export const MOCK_PARCELS = [
  {
    id: '1',
    trackingNumber: 'EE849201334US',
    sender: 'Amazon US',
    status: 'READY_FOR_PICKUP',
    pudoId: '1',
    arrivalDate: '2025-01-02',
    pickupCode: '8842',
    description: 'Electronics - Laptop',
    history: [
      { date: '2025-01-02 09:30', status: 'Arrived at PUDO', location: 'Kaawo Godey Market' },
      { date: '2025-01-01 14:00', status: 'Out for Delivery', location: 'Mogadishu Central Sort' },
      { date: '2024-12-31 08:15', status: 'Customs Cleared', location: 'Aden Adde Int. Airport' },
      { date: '2024-12-28 18:00', status: 'Departed Origin', location: 'JFK Airport, USA' },
    ]
  },
  {
    id: '2',
    trackingNumber: 'CP112233445CN',
    sender: 'AliExpress Vendor',
    status: 'IN_TRANSIT',
    currentLocation: 'Dubai Sorting Hub',
    estimatedArrival: '2025-01-05',
    description: 'Clothing Bundle',
    history: [
      { date: '2025-01-03 10:00', status: 'Arrived at Hub', location: 'Dubai Sorting Hub' },
      { date: '2025-01-01 22:00', status: 'Departed Origin', location: 'Guangzhou, China' },
      { date: '2024-12-30 15:30', status: 'Picked up by Carrier', location: 'Shenzhen' },
    ]
  },
  {
    id: '3',
    trackingNumber: 'RA998877665SO',
    sender: 'Ministry of Interior',
    status: 'COLLECTED',
    collectedDate: '2024-12-20',
    description: 'Official Documents',
    history: [
      { date: '2024-12-20 16:45', status: 'Collected by Recipient', location: 'Kaawo Godey Market' },
      { date: '2024-12-19 10:00', status: 'Ready for Pickup', location: 'Kaawo Godey Market' },
    ]
  },
];

export const STATUS_CONFIG = {
  READY_FOR_PICKUP: {
    label: 'Ready for Pickup',
    color: '#2ECC71', // Green
    icon: 'box',
  },
  IN_TRANSIT: {
    label: 'In Transit',
    color: '#F1C40F', // Yellow/Orange
    icon: 'truck',
  },
  COLLECTED: {
    label: 'Collected',
    color: '#95A5A6', // Grey
    icon: 'check',
  },
};
