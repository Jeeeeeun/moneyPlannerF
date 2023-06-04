import React, { useEffect, useState } from "react";

interface TimeProps {
	id?: string;
	initialTimeLeft?: number;
	style?: React.CSSProperties;
	onExpire?: () => void;
}

function Timer({ initialTimeLeft, style, onExpire }: TimeProps) {
	const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		let intervalid: NodeJS.Timeout;

		if (typeof timeLeft !== "undefined") {
			if (isActive) {
				intervalid = setInterval(() => {
					// eslint-disable-next-line @typescript-eslint/no-shadow
					setTimeLeft((timeLeft) => timeLeft - 1);
				}, 1000);
			}

			if (timeLeft === 0) {
				clearInterval(intervalid);
			}
		}

		return () => clearInterval(intervalid);
	}, [isActive, timeLeft]);

	const formatTimer = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;

		return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? `0${seconds}` : seconds
			}`;
	};
	return <span style={style}>{formatTimer(timeLeft)}</span>;
}

export default Timer;
