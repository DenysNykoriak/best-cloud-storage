import {
	Stack,
	Typography,
	Box,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import AppSlider from "./components/AppSlider";
import CloudProviderSettingsContainer from "./components/CloudProviderSettingsContainer";
import CloudStoragesBar from "./components/CloudStoragesBar";
import { useCloudProvidersPrice } from "./hooks/useCloudProvidersPrice";
import CloudProviderSettings from "./scenes/CloudProviderSettings";
import Titles from "./scenes/Titles";

export type BunnyCloudSettingsStateType = {
	storageType: "HDD" | "SSD";
};

export type ScalewayCloudSettingsStateType = {
	hostType: "MULTI" | "SINGLE";
};

const App = () => {
	const muiTheme = useTheme();
	const smallDevice = useMediaQuery(muiTheme.breakpoints.down("md"));

	const [storageAmount, setStorageAmount] = useState(1);
	const [transferAmount, setTransferAmount] = useState(1);

	const [bunnyCloudSettings, setBunnyCloudSettings] =
		useState<BunnyCloudSettingsStateType>({
			storageType: "SSD",
		});

	const [scalewayCloudSettings, setScalewayCloudSettings] =
		useState<ScalewayCloudSettingsStateType>({
			hostType: "SINGLE",
		});

	const { prices, lowestPrice } = useCloudProvidersPrice({
		storageAmount,
		transferAmount,
		providers: {
			backblaze: {
				minPayment: 7,
				storagePrice: 0.005,
				transferPrice: 0.01,
			},
			bunny: {
				maxPayment: 10,
				storagePrice: 0, //Will be calculated in hook
				transferPrice: 0.01,
				storageType: bunnyCloudSettings.storageType,
			},
			scaleway: {
				storagePrice: 0, //Will be calculated in hook
				transferPrice: 0.02, //Will be calculated in hook
				hostType: scalewayCloudSettings.hostType,
			},
			vultr: {
				minPayment: 5,
				storagePrice: 0.01,
				transferPrice: 0.01,
			},
		},
	});

	const barData = [
		{
			host: "BackBlaze",
			price: prices.backblaze.toFixed(2),
			lowest: prices.backblaze === lowestPrice ? "YES" : "NO",
		},
		{
			host: "Bunny",
			price: prices.bunny.toFixed(2),
			lowest: prices.bunny === lowestPrice ? "YES" : "NO",
		},
		{
			host: "Scaleway",
			price: prices.scaleway.toFixed(2),
			lowest: prices.scaleway === lowestPrice ? "YES" : "NO",
		},
		{
			host: "Vultr",
			price: prices.vultr.toFixed(2),
			lowest: prices.vultr === lowestPrice ? "YES" : "NO",
		},
	];

	const lowestPriceCloud =
		barData.find((cloud) => cloud.lowest === "YES") ?? barData[0];

	return (
		<Stack
			direction={"column"}
			justifyContent={"space-between"}
			alignItems={"center"}
			gap={2}
			sx={{ minHeight: "100vh", p: 2 }}>
			<Titles sx={{ width: "90%" }} />
			<Stack
				direction={"row"}
				justifyContent={"space-around"}
				sx={{
					width: "90%",
				}}>
				<AppSlider
					slider={{
						label: "Storage",
						value: storageAmount,
						onChange: setStorageAmount,
					}}
					min={1}
					max={1000}
					sx={{
						width: "30%",
					}}
				/>
				<AppSlider
					slider={{
						label: "Transfer",
						value: transferAmount,
						onChange: setTransferAmount,
					}}
					min={1}
					max={1000}
					sx={{
						width: "30%",
					}}
				/>
			</Stack>
			<CloudProviderSettings
				bunnyCloud={{
					settings: bunnyCloudSettings,
					setSettings: setBunnyCloudSettings,
				}}
				scalewayCloud={{
					settings: scalewayCloudSettings,
					setSettings: setScalewayCloudSettings,
				}}
			/>
			<Typography variant="h6">
				Lowest Price: {lowestPriceCloud.host} - {lowestPriceCloud.price}$
			</Typography>
			<Box sx={{ width: "100%", height: "40vh" }}>
				<CloudStoragesBar
					smallDevice={smallDevice}
					lowestPriceIndex={barData.indexOf(
						barData.find((cloud) => Number(cloud.price) === lowestPrice) ??
							barData[0],
					)}
					data={barData}
				/>
			</Box>
		</Stack>
	);
};

export default App;
