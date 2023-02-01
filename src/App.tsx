import { Stack, Typography, Slider, Box } from "@mui/material";
import { useState } from "react";
import AppSlider from "./components/AppSlider";
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
		</Stack>
	);
};

export default App;
