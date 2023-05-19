import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import { ActionIconButtonProps } from "@/types/types";

const ActionIconButton: FC<ActionIconButtonProps> = ({
  onClick,
  icon: Icon,
  label,
  color,
}) => {
  const theme = useTheme();
  return (
    <Button
      onClick={onClick}
      variant="contained"
      disableElevation
      color={color || "primary"}
      sx={{
        color: theme.palette.text.secondary,
        width: "170px",
        borderRadius: "28px",
        padding: "8px 18px",
        fontSize: "14px",
        letterSpacing: "0.09em",
      }}
    >
      <Icon sx={{ color: theme.palette.text.secondary, marginRight: "15px" }} />
      {label}
    </Button>
  );
};

export default ActionIconButton;
