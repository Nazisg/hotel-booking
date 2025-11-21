export type Country = {
  id: number;
  name: string;
};

export type Hotel = {
  id: number;
  name: string;
  price: number;
};

export type Meal = {
  id: number;
  name: string;
  price: number;
};

export type BoardTypeCode = "FB" | "HB" | "NB";

export type BookingDay = {
  date: string; // ISO date string
  hotelId?: number;
  lunchId?: number | null;
  dinnerId?: number | null;
};

export type BookingState = {
  citizenship?: string;
  startDate?: string;
  daysCount: number;
  destination?: string;
  boardType: BoardTypeCode;
  daily: BookingDay[];
};
