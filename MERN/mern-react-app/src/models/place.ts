export interface Place {
    id: string;
    image: string;
    title: string;
    description: string;
    address: string;
    creator: string;
    location: Coordinate
}

export interface Coordinate {
    lat: number;
    long: number;
}