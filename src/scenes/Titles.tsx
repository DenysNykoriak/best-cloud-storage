import { FC } from "react";
import { StackProps, Stack, Typography } from "@mui/material";

type TitleProps = {} & StackProps;

const Titles: FC<TitleProps> = ({ ...props }) => {
	return (
		<Stack direction={"column"} alignItems={"center"} {...props}>
			<Typography
				component={"h1"}
				variant="h3"
				color={"primary"}
				align={"center"}>
				Best Cloud Storage
			</Typography>
			<Typography
				component={"h2"}
				variant="h4"
				color={"text.secondary"}
				align={"center"}>
				Test task specifically for ByteCloud Technologies for the position of
				Front-End Developer
			</Typography>
		</Stack>
	);
};

export default Titles;
