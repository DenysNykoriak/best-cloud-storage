import { ResponsiveBar } from "@nivo/bar";
import { BarDatum } from "@nivo/bar/dist/types/types";
import { useTheme } from "@mui/material";
import { FC } from "react";

type CloudStoragesBarProps = {
	data: BarDatum[];
	smallDevice: boolean;
	lowestPriceIndex: number;
};

const CloudStoragesBar: FC<CloudStoragesBarProps> = ({
	data,
	lowestPriceIndex,
	smallDevice,
	...props
}) => {
	const muiTheme = useTheme();

	const greyHex = muiTheme.palette.grey[600];
	const lowestPriceHex = muiTheme.palette.primary.main;

	return (
		<ResponsiveBar
			data={data.reverse()}
			keys={["price"]}
			indexBy="host"
			margin={
				smallDevice
					? { top: 10, right: 80, bottom: 50, left: 30 }
					: { top: 10, right: 100, bottom: 30, left: 100 }
			}
			padding={0.3}
			layout={smallDevice ? "vertical" : "horizontal"}
			colors={(bar) => {
				return bar.data.lowest === "YES" ? lowestPriceHex : greyHex;
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
