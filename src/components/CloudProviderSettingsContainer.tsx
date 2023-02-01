import React, { FC } from "react";
import {
	Typography,
	Accordion,
	AccordionProps,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

type CloudProviderSettingsContainerProps = {
	providerName: string;
	children?: React.ReactNode;
} & AccordionProps;

const CloudProviderSettingsContainer: FC<
	CloudProviderSettingsContainerProps
> = ({ children, providerName, ...props }) => {
	return (
		<Accordion sx={{ width: "100%" }} {...props}>
			<AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
				<Typography variant="h5">{providerName}</Typography>
			</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
		</Accordion>
	);
};

export default CloudProviderSettingsContainer;
