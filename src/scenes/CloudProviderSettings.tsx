import { ChangeEvent, FC } from "react";
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
import CloudProviderSettingsContainer from "../components/CloudProviderSettingsContainer";
import { StackProps } from "@mui/system";
import {
	BunnyCloudSettingsStateType,
	ScalewayCloudSettingsStateType,
} from "../App";

type CloudProviderSettingsProps = {
	bunnyCloud: {
		settings: BunnyCloudSettingsStateType;
		setSettings: (settings: BunnyCloudSettingsStateType) => void;
	};
	scalewayCloud: {
		settings: ScalewayCloudSettingsStateType;
		setSettings: (settings: ScalewayCloudSettingsStateType) => void;
	};
} & StackProps;

const CloudProviderSettings: FC<CloudProviderSettingsProps> = ({
	bunnyCloud,
	scalewayCloud,
	...props
}) => {
	const bunnyStorageTypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		switch (e.target.value) {
			case "SSD":
				bunnyCloud.setSettings({ ...bunnyCloud.settings, storageType: "SSD" });
				break;
			case "HDD":
				bunnyCloud.setSettings({ ...bunnyCloud.settings, storageType: "HDD" });
				break;
		}
	};

	const scalewayHostTypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		switch (e.target.value) {
			case "SINGLE":
				scalewayCloud.setSettings({
					...scalewayCloud.settings,
					hostType: "SINGLE",
				});
				break;
			case "MULTI":
				scalewayCloud.setSettings({
					...scalewayCloud.settings,
					hostType: "MULTI",
				});
				break;
		}
	};

	return (
		<Stack sx={{ width: "70%" }} {...props}>
			<CloudProviderSettingsContainer providerName={"BackBase"}>
				<Typography variant="body1">
					This Cloud Provider doesn't have settings!
				</Typography>
			</CloudProviderSettingsContainer>
			<CloudProviderSettingsContainer providerName={"Bunny"}>
				<FormControl>
					<FormLabel>Storage Type</FormLabel>
					<RadioGroup
						value={bunnyCloud.settings.storageType}
						onChange={bunnyStorageTypeHandler}>
						<FormControlLabel value="SSD" control={<Radio />} label="SSD" />
						<FormControlLabel value="HDD" control={<Radio />} label="HDD" />
					</RadioGroup>
				</FormControl>
			</CloudProviderSettingsContainer>
			<CloudProviderSettingsContainer providerName={"Scaleway"}>
				<FormControl>
					<FormLabel>Host Type</FormLabel>
					<RadioGroup
						value={scalewayCloud.settings.hostType}
						onChange={scalewayHostTypeHandler}>
						<FormControlLabel
							value="SINGLE"
							control={<Radio />}
							label="Single"
						/>
						<FormControlLabel value="MULTI" control={<Radio />} label="Multi" />
					</RadioGroup>
				</FormControl>
			</CloudProviderSettingsContainer>
			<CloudProviderSettingsContainer providerName={"Vultr"}>
				<Typography variant="body1">
					This Cloud Provider doesn't have settings!
				</Typography>
			</CloudProviderSettingsContainer>
		</Stack>
	);
};

export default CloudProviderSettings;
