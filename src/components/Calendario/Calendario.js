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
} from './utils';

export const Calendario = () => {
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

	const upcomingEvents = getUpcomingEvents(events);

	const addEvent = (date, event) => {
		if (!event.target.classList.contains('StyledEvent')) {
			const text = window.prompt('name');
			if (text) {
				date.setHours(0);
				date.setSeconds(0);
				date.setMilliseconds(0);
				setEvents((prev) => [
					...prev,
					{ date, title: text, color: getDarkColor() },
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
						},
					])
				);
			}
		}
	};

	// const drag = (index, e) => {
	//   dragindexRef.current = { index, target: e.target };
	// };

	// const onDragEnter = (date, e) => {
	//   e.preventDefault();
	//   dragDateRef.current = { date, target: e.target.id };
	// };

	// const drop = (ev) => {
	//   ev.preventDefault();

	//   setEvents((prev) =>
	//     prev.map((ev, index) => {
	//       if (index === dragindexRef.current.index) {
	//         ev.date = dragDateRef.current.date;
	//       }
	//       return ev;
	//     })
	//   );
	// };

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
						// onDragEnter={(e) =>
						//   onDragEnter(
						//     new Date(
						//       currentDate.getFullYear(),
						//       currentDate.getMonth(),
						//       day
						//     ),
						//     e
						//   )
						// }
						// onDragOver={(e) => e.preventDefault()}
						// onDragEnd={drop}
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
											// onDragStart={(e) => drag(index, e)}
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

const Portal = ({ title, date, handleDelete, handlePotalClose }) => {
	return (
		<PortalWrapper>
			<h2>{title}</h2>
			<p>{new Date(date).toDateString()}</p>
			<ion-icon onClick={handleDelete} name="trash-outline">
				BORRAR
			</ion-icon>
			<ion-icon onClick={handlePotalClose} name="close-outline">
				X
			</ion-icon>
		</PortalWrapper>
	);
};
