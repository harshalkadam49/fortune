import { Box, Grid, Skeleton, Stack } from "@mui/material";

export default function EquityOrdersSimmer(props: any) {
  return (
    <>
      <Box
        sx={{
          pt: "5rem",
          px: "1rem",
        }}
      >
        <Stack spacing="1rem">
          <Skeleton variant="rounded" height={40} />
          <Skeleton variant="rounded" height={20} />
          <Skeleton variant="rounded" height={20} />
          <Skeleton variant="rounded" height={20} />
          <Skeleton variant="rounded" height={20} />
          <Skeleton variant="rounded" height={20} />
        </Stack>
      </Box>
    </>
  );
}
