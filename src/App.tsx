import {
	Stack,
	Typography,
	Box,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
} from "@mui/material";
import { useState } from "react";
import AppSlider from "./components/AppSlider";
import CloudProviderSettingsContainer from "./components/CloudProviderSettingsContainer";
import CloudStoragesBar from "./components/CloudStoragesBar";
import CloudProviderSettings from "./scenes/CloudProviderSettings";
import Titles from "./scenes/Titles";

export type BunnyCloudSettingsStateType = {
	storageType: "HDD" | "SSD";
};

export type ScalewayCloudSettingsStateType = {
	hostType: "MULTI" | "SINGLE";
};

const App = () => {
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

	return (
		<Stack
			direction={"column"}
			justifyContent={"space-between"}
			alignItems={"center"}
			gap={2}
			sx={{ minHeight: "100vh", p: 2 }}>
			<Titles sx={{ width: "70%" }} />
			<Stack
				direction={"row"}
				justifyContent={"space-around"}
				sx={{
					width: "70%",
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
			<Box sx={{ width: "70%", height: "40vh" }}>
				<CloudStoragesBar
					lowestPriceIndex={1}
					data={[
						{
							host: "BackBlaze",
							price: 74,
						},
						{
							host: "Bunny",
							price: 109,
						},
						{
							host: "Scaleway",
							price: 15,
						},
						{
							host: "Vultr",
							price: 34,
						},
					]}
				/>
			</Box>
		</Stack>
	);
};

export default App;
