import { ChangeEvent, FC } from "react";
import {
	StackProps,
	Stack,
	Slider,
	Typography,
	InputBase,
} from "@mui/material";

type AppSliderProps = {
	slider: {
		label: string;
		value: number;
		onChange: (newValue: number) => void;
	};
	min: number;
	max: number;
} & StackProps;

const AppSlider: FC<AppSliderProps> = ({ slider, min, max, ...props }) => {
	const sliderChangeHandler = (e: Event, newValue: number | number[]) => {
		if (typeof newValue === "number") {
			slider.onChange(newValue < min ? min : newValue > max ? max : newValue);
		}
	};

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let newValue = Number(e.target.value);

		if (isNaN(newValue)) return;

		if (typeof newValue === "number") {
			slider.onChange(newValue < min ? min : newValue > max ? max : newValue);
		}
	};

	return (
		<Stack alignItems={"center"} {...props}>
			<Stack
				direction={"row"}
				justifyContent={"center"}
				alignItems={"baseline"}
				sx={{ width: "100%" }}>
				<Typography variant="body1">{slider.label}:</Typography>
				<InputBase
					value={slider.value}
					onChange={inputChangeHandler}
					inputProps={{
						sx: {
							textAlign: "right",
						},
					}}
					sx={{
						mr: 1,
					}}
				/>
				<Typography variant="body1">GB</Typography>
			</Stack>
			<Slider
				marks={[
					{ value: 1, label: "1 GB" },
					{ value: 1000, label: "1000 GB" },
				]}
				step={1}
				min={1}
				max={1000}
				value={slider.value}
				onChange={sliderChangeHandler}
			/>
		</Stack>
	);
};

export default AppSlider;
