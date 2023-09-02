import { Box, Grid, Skeleton, Stack } from "@mui/material";

export default function EquityWatchlistsSimmer(props: any) {
  return (
    <>
      <Box
        sx={{
          pt: "5rem",
          px: "1rem",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton
            variant="circular"
            height={40}
            width={45}
            sx={{ borderRadius: "50%" }}
          />
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="rounded" height={10} width="13%" />

          </Box>

          <Skeleton variant="circular" height={20} width={25} />
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" pt="1rem">
          <Skeleton
            variant="circular"
            height={40}
            width={45}
            sx={{ borderRadius: "50%" }}
          />
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="rounded" height={10} width="13%" />
            <Skeleton
              variant="rounded"
              height={12}
              width="25%"
              sx={{ mt: "0.2rem" }}
            />
          </Box>

          <Skeleton variant="circular" height={20} width={25} />
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" pt="1rem">
          <Skeleton
            variant="circular"
            height={40}
            width={45}
            sx={{ borderRadius: "50%" }}
          />
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="rounded" height={10} width="13%" />
            <Skeleton
              variant="rounded"
              height={12}
              width="25%"
              sx={{ mt: "0.2rem" }}
            />
          </Box>

          <Skeleton variant="circular" height={20} width={25} />
        </Stack>
      </Box>
    </>
  );
}
