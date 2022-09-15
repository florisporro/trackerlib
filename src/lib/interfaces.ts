export interface Position {
	latitude: number;
	longitude: number;
}

export interface Speed {
	value: number;
	unit: string;
}

export interface Distance {
	value: number;
	unit: string;
}

export interface Standing {
	tracker: Tracker,
	distanceToNext: number,
	distanceToLeader: number,
	timeToNext: number,
	timeToIntercept: number
}

export interface Tracker {
	name: string;
	id: number;
	type: string;
	frames: Array<Frame>
	route?: Route;
}

export interface Frame {
	position: Position;
	lastFrameTime: string;
	altitude: number,
	speed: number;
	bearing: number;
	frameno: number;
	frameDuration: number;
	distance: number;
	totalDistanceTravelled: number;
}

export interface InterpolatedFrame {
	position: Position;
	timeSinceLastFrame: number;
	distance: number;
	totalDistanceTravelled: number;
}

export interface RoutePoint {
	name: string;
	id: number;
	position: Position;
	bearing: number;
	distance: number;
	totalDistance: number;
	altitude?: number;
	meta?: object;
}

export interface Route {
	name: string;
	points: Array<RoutePoint>
}