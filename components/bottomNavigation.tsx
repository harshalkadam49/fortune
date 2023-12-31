import { BottomNavigation, Box } from "@mui/material";

export default function BottomStay({children}: any) {
  return (
    <>
      <BottomNavigation
        sx={{
          position: "fixed",
          bottom: 0,
          left: "0",
          right: "0",
          background: "#000",
          height: "7rem",
          width: "100%",
          border:"2px solid #000"
        }}
      >
        <Box sx={{ width: "100%", px: "1rem", pt: "5%",border:"2px solid #000" }}>{children}</Box>
      </BottomNavigation>
    </>
  );
}
