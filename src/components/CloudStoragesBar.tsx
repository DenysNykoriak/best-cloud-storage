import { ResponsiveBar } from "@nivo/bar";
import { BarDatum } from "@nivo/bar/dist/types/types";
import { useTheme } from "@mui/material";
import { FC } from "react";

type CloudStoragesBarProps = {
	data: BarDatum[];
	lowestPriceIndex: number;
};

const CloudStoragesBar: FC<CloudStoragesBarProps> = ({
	data,
	lowestPriceIndex,
	...props
}) => {
	const muiTheme = useTheme();

	const greyHex = muiTheme.palette.grey[600];
	const lowestPriceHex = muiTheme.palette.primary.main;

	const reversedData = Array.from(data).reverse();
	let lowestPriceInReversedData = reversedData.indexOf(data[lowestPriceIndex]);

	return (
		<ResponsiveBar
			data={reversedData}
			keys={["price"]}
			indexBy="host"
			margin={{ top: 50, right: 130, bottom: 50, left: 70 }}
			padding={0.3}
			layout="horizontal"
			colors={(bar) => {
				return bar.index === lowestPriceInReversedData
					? lowestPriceHex
					: greyHex;
			}}
			colorBy="indexValue"
			enableLabel={true}
			label={(price) => `${price.value}$`}
			labelTextColor={"#fff"}
			legends={[
				{
					dataFrom: "keys",
					anchor: "bottom-right",
					direction: "column",
					justify: false,
					translateX: 120,
					translateY: 0,
					itemsSpacing: 2,
					itemWidth: 100,
					itemHeight: 20,
					itemDirection: "left-to-right",
					itemOpacity: 0.85,
					symbolSize: 20,
					effects: [
						{
							on: "hover",
							style: {
								itemOpacity: 1,
							},
						},
					],
				},
			]}
		/>
	);
};

export default CloudStoragesBar;
