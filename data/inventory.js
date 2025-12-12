export const inventory = {
  flights: [
    { id: "f1", operator: "SkyHigh Air", number: "SH-101", from: "New York", to: "London", depart: "10:00 AM", arrive: "10:00 PM", price: 450, rating: 4.5, type: "Economy" },
    { id: "f2", operator: "British Airways", number: "BA-22", from: "New York", to: "London", depart: "06:30 PM", arrive: "06:30 AM", price: 520, rating: 4.8, type: "Business" },
    { id: "f3", operator: "Delta", number: "DL-450", from: "Los Angeles", to: "Tokyo", depart: "11:00 AM", arrive: "03:00 PM", price: 800, rating: 4.6, type: "Economy" },
    { id: "f4", operator: "IndiGo", number: "6E-55", from: "Delhi", to: "Mumbai", depart: "08:00 AM", arrive: "10:15 AM", price: 80, rating: 4.2, type: "Economy" }
  ],
  trains: [
    { id: "tr1", operator: "Amtrak", number: "A-90", from: "New York", to: "Boston", depart: "08:15 AM", arrive: "11:45 AM", price: 65, rating: 4.4, type: "Business" },
    { id: "tr2", operator: "EuroRail", number: "ER-12", from: "Paris", to: "Berlin", depart: "06:00 AM", arrive: "01:00 PM", price: 120, rating: 4.7, type: "First Class" },
    { id: "tr3", operator: "Vande Bharat", number: "VB-18", from: "Delhi", to: "Varanasi", depart: "03:00 PM", arrive: "07:15 PM", price: 45, rating: 4.3, type: "Executive" }
  ],
  cars: [
    { id: "c1", operator: "Uber Intercity", type: "Sedan", from: "Anywhere", to: "Anywhere", pricePerKm: 2, baseFare: 10, rating: 4.7, capacity: 4 },
    { id: "c2", operator: "Ola Outstation", type: "SUV", from: "Anywhere", to: "Anywhere", pricePerKm: 3.5, baseFare: 15, rating: 4.6, capacity: 6 },
    { id: "c3", operator: "City Cab", type: "Hatchback", from: "Anywhere", to: "Anywhere", pricePerKm: 1.5, baseFare: 8, rating: 4.1, capacity: 4 }
  ],
  hotels: [
    { id: "h1", operator: "Grand Palace Hotel", city: "London", checkIn: "12:00 PM", checkOut: "11:00 AM", price: 220, rating: 4.8, type: "5 Star" },
    { id: "h2", operator: "Harbor View Resort", city: "San Francisco", checkIn: "02:00 PM", checkOut: "12:00 PM", price: 180, rating: 4.5, type: "Resort" },
    { id: "h3", operator: "Budget Inn", city: "Delhi", checkIn: "01:00 PM", checkOut: "11:00 AM", price: 60, rating: 4.0, type: "Budget" }
  ]
};



