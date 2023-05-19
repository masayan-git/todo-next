import { Typography, TypographyProps } from "@mui/material";

const TopTypography = (props: TypographyProps) => {
  return (
    <Typography
      {...props}
      variant="h1"
      align="center"
      color="primary"
      sx={{
        mt: {
          xs: 5,
          sm: 10,
        },
        mb: {
          xs: 2,
          sm: 3,
        },
        ...props.sx,
      }}
    >
      {props.children}
    </Typography>
  );
};

export default TopTypography;
