import { Box, Stack } from "@mui/material";

export default function Loader(props: any) {
  return (
    <>
      {props.isLoading && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: "fixed",
            width: {md:"23.5%",xs:"100%"},
            minHeight: "100vh",
            background: "#000",
            zIndex: 55,
          }}
        >
          <Box
            className="loader"
          ></Box>
        </Stack>
      )}
    </>
  );
}
