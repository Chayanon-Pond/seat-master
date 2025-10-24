export type Concert = {
    id: string;
    name: string;
    description: string;
    seat: number;
    available_seats: number;
    reserved_seats: number;
    cancelled_seats: number;
    created_at: Date;
    updated_at: Date;
};