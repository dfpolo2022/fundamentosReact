import { DAYS } from './conts';

export const getDaysInMonth = (date) => {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const range = (end) => {
	const { result } = Array.from({ length: end }).reduce(
		({ result, current }) => ({
			result: [...result, current],
			current: current + 1,
		}),
		{ result: [], current: 1 }
	);
	return result;
};

export const sortDays = (date) => {
	const dayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	const sortedDays = [...DAYS.slice(dayIndex), ...DAYS.slice(0, dayIndex)];
	return sortedDays;
};

export const datesAreOnSameDay = (first, second) =>
	first.getFullYear() === second.getFullYear() &&
	first.getMonth() === second.getMonth() &&
	first.getDate() === second.getDate();

export const getMonthYear = (date) => {
	const MONTHS = [
		'ENERO',
		'FEBRERO',
		'MARZO',
		'ABRIL',
		'MAYO',
		'JUNIO',
		'JULIO',
		'AGOSTO',
		'SEPTIMBRE',
		'OCTUBRE',
		'NOVIEMBRE',
		'DICIEMBRE',
	];

	return MONTHS[date.getMonth()] + ' ' + date.getFullYear().toString();
};

export const nextMonth = (date, cb) => {
	const mon = date.getMonth();
	if (mon < 11) {
		date.setMonth(mon + 1);
		console.log(date.setMonth(mon + 1));
	} else {
		date.setMonth(0);
		date.setFullYear(date.getFullYear() + 1);
	}
	cb(new Date(date));
	console.log(new Date(date));
};

export const prevMonth = (date, cb) => {
	const mon = date.getMonth();
	if (mon > 0) {
		date.setMonth(mon - 1);
		console.log(date.setMonth(mon - 1));
	} else {
		date.setMonth(11);
		date.setFullYear(date.getFullYear() - 1);
	}
	cb(new Date(date));
	console.log(new Date(date));
};

export const getDarkColor = () => {
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += Math.floor(Math.random() * 10);
	}
	return color;
};

export const getSortedDays = (date) => {
	const daysInMonth = range(getDaysInMonth(date));
	const index = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	return [...Array(index === 0 ? 6 : index - 1), ...daysInMonth];
};

export const getUpcomingEvents = (events) => {
	const currentDate = new Date();

	return events.filter((event) => {
		const eventDate = new Date(event.date);

		return (
			eventDate.getDate() === (currentDate.getDate() + 1) % 31 &&
			(eventDate.getMonth() === currentDate.getMonth() ||
				eventDate.getMonth() === currentDate.getMonth() + 1) &&
			(eventDate.getFullYear() === currentDate.getFullYear() ||
				eventDate.getFullYear() === currentDate.getFullYear() + 1)
		);
	});
};

export const verifyDate = (date) => {
	const currentDate = new Date();
	if (date.getDate() <= currentDate.getDate()) {
		if (date.getFullYear() < currentDate.getFullYear()) {
			return false;
		} else if (
			date.getMonth() <= currentDate.getMonth() &&
			date.getFullYear() === currentDate.getFullYear()
		) {
			return false;
		}
	} else {
		if (date.getFullYear() < currentDate.getFullYear()) {
			return false;
		} else if (date.getMonth() < currentDate.getMonth()) {
			return false;
		}
	}
	return true;
};
