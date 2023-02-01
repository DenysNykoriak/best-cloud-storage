import { FC } from "react";
import { StackProps, Stack, Typography, useTheme } from "@mui/material";

type TitleProps = {} & StackProps;

const Titles: FC<TitleProps> = ({ ...props }) => {
	const muiTheme = useTheme();

	return (
		<Stack direction={"column"} alignItems={"center"} {...props}>
			<Typography
				component={"h1"}
				variant="h3"
				color={"primary"}
				align={"center"}
				sx={{
					[muiTheme.breakpoints.down("sm")]: {
						fontSize: muiTheme.typography.h5,
					},
				}}>
				Best Cloud Storage
			</Typography>
			<Typography
				component={"h2"}
				variant="h4"
				color={"text.secondary"}
				align={"center"}
				sx={{
					[muiTheme.breakpoints.down("sm")]: {
						fontSize: muiTheme.typography.h6,
					},
				}}>
				Test task specifically for ByteCloud Technologies for the position of
				Front-End Developer
			</Typography>
		</Stack>
	);
};

export default Titles;
