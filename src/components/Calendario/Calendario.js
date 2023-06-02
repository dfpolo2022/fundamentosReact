import { useEffect, useRef, useState } from 'react';
import {
	SevenColGrid,
	Wrapper,
	HeadDays,
	DateControls,
	StyledEvent,
	SeeMore,
	PortalWrapper,
} from './Calendario.styled';
import { DAYS, MOCKAPPS } from './conts';
import {
	datesAreOnSameDay,
	getDarkColor,
	getDaysInMonth,
	getMonthYear,
	getSortedDays,
	nextMonth,
	prevMonth,
	range,
	sortDays,
	getUpcomingEvents,
	verifyDate,
} from './utils';

export const Calendario = ({setNotifs}) => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [events, setEvents] = useState(
		JSON.parse(localStorage.getItem('eventos'))?.filter(
			(ev) => ev.user === JSON.parse(localStorage.getItem('user')).email
		) || []
	);
	const dragDateRef = useRef();
	const dragindexRef = useRef();
	const [showPortal, setShowPortal] = useState(false);
	const [portalData, setPortalData] = useState({});

	const notifyUpcomingEvents = () => {
		console.log('notifying');
		if (localStorage.getItem('notifs') === "" | localStorage.getItem('notifs') === null){
			localStorage.setItem('notifs', [])
		}
		let notifs = JSON.parse(localStorage.getItem('notifs'));
		const upcomingEvents = getUpcomingEvents(events);
		console.log(upcomingEvents.length);
		console.log("before", events);
		upcomingEvents.forEach((upcomingEvent) => {
			console.log(upcomingEvent);
			notifs.push(upcomingEvent);
			events.filter(event => event.title === upcomingEvent.title).forEach((event) => event.notified = true);
		})
		console.log("after", events);
		//setEvents(events);
		console.log("setted events", events);
		//updateEventsInLocalStorage(events);
		console.log("local storaged", events)
		localStorage.setItem('notifs', JSON.stringify(notifs));
		setNotifs(notifs);
	};

	setTimeout(notifyUpcomingEvents, 1000);

	const updateEventsInLocalStorage = (events) => {
		localStorage.setItem('eventos', JSON.stringify(events));
	}

	const addEvent = (date, event) => {
		if (verifyDate(date)) {
			if (!event.target.classList.contains('StyledEvent')) {
				const text = window.prompt('name');
				if (text) {
					date.setHours(0);
					date.setSeconds(0);
					date.setMilliseconds(0);
					setEvents((prev) => [
						...prev,
						{ date, title: text, color: getDarkColor(), notified: false },
					]);

					const { email } = JSON.parse(localStorage.getItem('user'));

					localStorage.setItem(
						'eventos',
						JSON.stringify([
							...events,
							{
								user: email,
								date,
								title: text,
								color: getDarkColor(),
								notified: false
							},
						])
					);
				}
			}
		}
	};

	const handleOnClickEvent = (event) => {
		setShowPortal(true);
		setPortalData(event);
	};

	const handlePotalClose = () => setShowPortal(false);

	const handleDelete = () => {
		setEvents((prevEvents) =>
			prevEvents.filter((ev) => ev.title !== portalData.title)
		);
		handlePotalClose();
	};

	useEffect(() => {
		// setTimeout(() => {
		// 	if (upcomingEvents.length > 0) {
		// 		alert(
		// 			`Mañana tienes una cita de ${upcomingEvents
		// 				.map((e) => e.title)
		// 				.join(', ')}`
		// 		);
		// 	}
		// }, 1000);
	}, []);

	return (
		<Wrapper>
			<DateControls>
				<ion-icon
					onClick={() => prevMonth(currentDate, setCurrentDate)}
					name="arrow-back-circle-outline"
				>
					←
				</ion-icon>
				{getMonthYear(currentDate)}
				<ion-icon
					onClick={() => nextMonth(currentDate, setCurrentDate)}
					name="arrow-forward-circle-outline"
				>
					→
				</ion-icon>
			</DateControls>
			<SevenColGrid>
				{DAYS.map((day) => (
					<HeadDays className="nonDRAG">{day}</HeadDays>
				))}
			</SevenColGrid>

			<SevenColGrid
				fullheight={true}
				is28Days={getDaysInMonth(currentDate) === 28}
			>
				{getSortedDays(currentDate).map((day) => (
					<div
						id={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}`}
						onClick={(e) =>
							addEvent(
								new Date(
									currentDate.getFullYear(),
									currentDate.getMonth(),
									day
								),
								e
							)
						}
					>
						<span
							className={`nonDRAG ${
								datesAreOnSameDay(
									new Date(),
									new Date(
										currentDate.getFullYear(),
										currentDate.getMonth(),
										day
									)
								)
									? 'active'
									: ''
							}`}
						>
							{day}
						</span>
						<EventWrapper>
							{events.map(
								(ev, index) =>
									datesAreOnSameDay(
										new Date(ev.date),
										new Date(
											currentDate.getFullYear(),
											currentDate.getMonth(),
											day
										)
									) && (
										<StyledEvent
											onClick={() => handleOnClickEvent(ev)}
											draggable
											className="StyledEvent"
											id={`${ev.color} ${ev.title}`}
											key={ev.title}
											bgColor={ev.color}
										>
											{ev.title}
										</StyledEvent>
									)
							)}
						</EventWrapper>
					</div>
				))}
			</SevenColGrid>
			{showPortal && (
				<Portal
					{...portalData}
					handleDelete={handleDelete}
					handlePotalClose={handlePotalClose}
					setShowPortal={setShowPortal}
					setEvents={setEvents}
				/>
			)}
		</Wrapper>
	);
};

const EventWrapper = ({ children }) => {
	if (children.filter((child) => child).length)
		return (
			<>
				{children}
				{children.filter((child) => child).length > 2 && (
					<SeeMore
						onClick={(e) => {
							e.stopPropagation();
							console.log('clicked p');
						}}
					>
						Ver más...
					</SeeMore>
				)}
			</>
		);
};

const Portal = ({
	title,
	date,
	handleDelete,
	handlePotalClose,
	setShowPortal,
	setEvents,
	...props
}) => {
	const eventDate = new Date(date);
	const [comment, setComment] = useState(props?.comment ?? '');
	const currentDate = new Date();

	const handleSubmit = (e) => {
		e.preventDefault();
		const newEvent = {
			...props,
			title,
			date,
			comment,
		};

		const events = JSON.parse(localStorage.getItem('eventos'));

		const newEvents = events.map((ev) => {
			if (ev.title === title) {
				return newEvent;
			}
			return ev;
		});

		localStorage.setItem('eventos', JSON.stringify(newEvents));
		setEvents(newEvents);
		setShowPortal(false);
	};

	return (
		<PortalWrapper>
			<h2>{title}</h2>
			<p>{eventDate.toDateString()}</p>
			{eventDate < currentDate && (
				<form onSubmit={handleSubmit}>
					<ion-icon name="trash-outline">
						<textarea
							readOnly={props?.comment?.length > 0}
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							type="textarea"
							rows="5"
							placeholder="Escribir comentarios..."
							required
						></textarea>
						<button type="submit">Enviar</button>
					</ion-icon>
				</form>
			)}
			<ion-icon onClick={handlePotalClose} name="close-outline">
				X
			</ion-icon>
		</PortalWrapper>
	);
};
