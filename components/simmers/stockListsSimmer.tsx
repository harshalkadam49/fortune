import { Box, Grid, Skeleton, Stack } from "@mui/material";

export default function StockListsSimmer(props: any) {
  return (
    <>
      <Box
        sx={{
          pt: "5rem",
          px: "1rem",
        }}
      >
        <Stack spacing="1rem" >
          <Skeleton variant="rounded" height={60} />
          <Skeleton variant="rounded" height={45} />
          <Skeleton variant="rounded" height={45} />
          <Skeleton variant="rounded" height={45} />
          <Skeleton variant="rounded" height={45} />
          <Skeleton variant="rounded" height={45} />
          <Skeleton variant="rounded" height={45} />
          <Skeleton variant="rounded" height={45} />
          <Skeleton variant="rounded" height={45} />
        </Stack>
      </Box>
    </>
  );
}
