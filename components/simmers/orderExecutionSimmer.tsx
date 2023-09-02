import { Box, Grid, Skeleton, Stack } from "@mui/material";

export default function OrderExecutionSimmer(props: any) {
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
              width={40}
              sx={{ borderRadius: "50%" }}
            />
            <Skeleton variant="rounded" height={20} width="13%" />
            <Skeleton variant="rounded" height={20} width="25%" />
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mt: "2rem" }}
          >
            <Box sx={{ width: "50%" }}>
              <Skeleton variant="rounded" height={15} width="50%" />
              <Skeleton
                variant="rounded"
                height={48}
                width="100%"
                sx={{ mt: "0.5rem" }}
              />
            </Box>
            <Box sx={{ width: "50%" }}>
              <Skeleton variant="rounded" height={15} width="50%" />
              <Skeleton
                variant="rounded"
                height={48}
                width="100%"
                sx={{ mt: "0.5rem" }}
              />
            </Box>
          </Stack>
        </Box>
    </>
  );
}
