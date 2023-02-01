import { Stack, Typography, Slider, Box, useTheme } from "@mui/material";
import { useState } from "react";
import AppSlider from "./components/AppSlider";
import CloudStoragesBar from "./components/CloudStoragesBar";
import Titles from "./scenes/Titles";

const App = () => {
	const [storageAmount, setStorageAmount] = useState(1);
	const [transferAmount, setTransferAmount] = useState(1);

	return (
		<Stack
			direction={"column"}
			justifyContent={"space-between"}
			alignItems={"center"}
			sx={{ height: "100vh", py: 4, px: 2 }}>
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
			<Box sx={{ width: "70%", height: "40vh" }}>
				<CloudStoragesBar
					lowestPriceIndex={3}
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
