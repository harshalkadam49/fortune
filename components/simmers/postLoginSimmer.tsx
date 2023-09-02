import { Box, Skeleton, Stack } from "@mui/material";

export default function PostLoginSimmer(props: any) {
  return (
    <>
        <Box
          sx={{
            pt: "5rem",
            px: "1rem",
          }}
        >
          <Skeleton variant="rounded" height={160} />

          <Stack direction="row" justifyContent="center" pt={2} spacing={1.5}>
            <Skeleton variant="circular" height={12} width={12} />
            <Skeleton variant="circular" height={12} width={12} />
            <Skeleton variant="circular" height={12} width={12} />
            <Skeleton variant="circular" height={12} width={12} />
          </Stack>

          <Skeleton
            variant="rounded"
            width="80%"
            height={55}
            sx={{ mx: "auto", mt: "1.313rem" }}
          />

          <Skeleton
            variant="rounded"
            height={35}
            width={156}
            sx={{ mt: "2rem", mb: "1.5rem" }}
          />

          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Skeleton variant="rounded" height={160} width="33%" />
            <Skeleton variant="rounded" height={160} width="33%" />
            <Skeleton variant="rounded" height={160} width="33%" />
          </Stack>

          <Skeleton
            variant="rounded"
            height={30}
            width={123}
            sx={{ my: "1.563rem" }}
          />

          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Skeleton variant="rounded" height={60} width="50%" />
            <Skeleton variant="rounded" height={60} width="50%" />
          </Stack>

          <Skeleton
            variant="rounded"
            height={30}
            width={123}
            sx={{ my: "1.563rem" }}
          />

          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Skeleton
              variant="rounded"
              height={30}
              width="30%"
              sx={{ borderRadius: "5rem" }}
            />
            <Skeleton
              variant="rounded"
              height={30}
              width="50%"
              sx={{ borderRadius: "5rem" }}
            />

            <Skeleton
              variant="rounded"
              height={30}
              width="20%"
              sx={{ borderRadius: "5rem" }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            pt="1rem"
          >
            <Skeleton
              variant="rounded"
              height={30}
              width="35%"
              sx={{ borderRadius: "5rem" }}
            />

            <Skeleton
              variant="rounded"
              height={30}
              width="25%"
              sx={{ borderRadius: "5rem" }}
            />
            <Skeleton
              variant="rounded"
              height={30}
              width="40%"
              sx={{ borderRadius: "5rem" }}
            />
          </Stack>
          
        </Box>
    </>
  );
}
