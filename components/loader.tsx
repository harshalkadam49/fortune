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
            width: "100%",
            minHeight: "100vh",
            background: "#000",
            zIndex: 1,
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
