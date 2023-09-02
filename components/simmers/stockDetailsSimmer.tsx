import { Box, Grid, Skeleton, Stack } from "@mui/material";

export default function StockDetailsSimmer(props: any) {
  return (
    <>
      {props.isLoading && (
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

          <Skeleton
            variant="rounded"
            width="30%"
            height={15}
            sx={{ mt: "1rem" }}
          />

          <Skeleton
            variant="rounded"
            height={150}
            sx={{ mt: "2rem", mb: "1.5rem" }}
          />

          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Skeleton variant="rounded" height={10} width="13%" />
            <Skeleton variant="rounded" height={10} width="13%" />
          </Stack>
          <Stack
            mt={1}
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Skeleton variant="rounded" height={8} width="10%" />
            <Skeleton variant="rounded" height={8} width="10%" />
          </Stack>

          <Skeleton
            variant="rounded"
            height={10}
            width="100%"
            sx={{ mt: "0.9rem" }}
          />

          <Grid container pt="2rem" spacing={10}>
            <Grid item xs={4}>
              <Skeleton variant="rounded" height={10} />
              <Skeleton variant="rounded" height={10} sx={{ mt: "0.5rem" }} />
            </Grid>

            <Grid item xs={4}>
              <Skeleton variant="rounded" height={10} />
              <Skeleton variant="rounded" height={10} sx={{ mt: "0.5rem" }} />
            </Grid>

            <Grid item xs={4}>
              <Skeleton variant="rounded" height={10} />
              <Skeleton variant="rounded" height={10} sx={{ mt: "0.5rem" }} />
            </Grid>
          </Grid>

          <Grid container pt="1rem" spacing={10}>
            <Grid item xs={4}>
              <Skeleton variant="rounded" height={10} />
              <Skeleton variant="rounded" height={10} sx={{ mt: "0.5rem" }} />
            </Grid>

            <Grid item xs={4}>
              <Skeleton variant="rounded" height={10} />
              <Skeleton variant="rounded" height={10} sx={{ mt: "0.5rem" }} />
            </Grid>

            <Grid item xs={4}>
              <Skeleton variant="rounded" height={10} />
              <Skeleton variant="rounded" height={10} sx={{ mt: "0.5rem" }} />
            </Grid>
          </Grid>

          <Skeleton
            variant="rounded"
            width="30%"
            height={15}
            sx={{ mt: "2rem" }}
          />

          <Skeleton variant="rounded" height={10} sx={{ mt: "1rem" }} />
          <Skeleton variant="rounded" height={10} sx={{ mt: "0.5rem" }} />
          <Skeleton variant="rounded" height={10} sx={{ mt: "0.5rem" }} />
          <Skeleton variant="rounded" height={10} sx={{ mt: "0.5rem" }} />

          <Skeleton
            variant="rounded"
            width="30%"
            height={15}
            sx={{ mt: "2rem" }}
          />

          <Skeleton variant="rounded" height={12} sx={{ mt: "2rem" }} />
          <Skeleton variant="rounded" height={12} sx={{ mt: "1rem" }} />
          <Skeleton variant="rounded" height={12} sx={{ mt: "1rem" }} />
          <Skeleton variant="rounded" height={12} sx={{ mt: "1rem" }} />
        </Box>
      )}
    </>
  );
}
