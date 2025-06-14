export interface Place {
    id: string;
    image: string;
    title: string;
    description: string;
    address: string;
    creator: string;
    location: google.maps.LatLngLiteral
}

export interface Coordinate {
    lat: number;
    lng: number;
}