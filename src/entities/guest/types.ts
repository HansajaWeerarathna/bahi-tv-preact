export type GuestTitle = 'mr' | 'ms' | 'dr' | '';
export type Occasion = 'anniversary' | 'birthday' | '';

export type Guest = {
  title: GuestTitle;
  firstName: string;
  lastName: string;
  roomNumber: string;
  occasion: Occasion;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
  lateCheckOutTime: string;
  hasLateCheckOut: boolean;
};
