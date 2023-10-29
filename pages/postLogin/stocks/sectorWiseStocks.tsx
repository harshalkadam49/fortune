import LayoutWithBackheader from "@/components/layouts/withbackheader";
import { add3Dots } from "@/utilities/commonfunctions";
import { Avatar, Box, Grid, Typography } from "@mui/material";

export default function SectorWiseStockList() {
  return (
    <LayoutWithBackheader showHeader={true} pageTitle="Stock List">
      <Box px="1rem" pt="5rem" pb="50%">
        <Grid container>
          <Grid
            item
            xs={4}
            sx={{
              background: "#000",
              p: "0.5rem",
              cursor: "pointer",
            }}
            // onClick={() => onRedirectToMFDetails(item.search_id, 2)}
          >
            <Box
              sx={{
                background: "#34343459",
                borderRadius: "0.5rem",
                p: "0.5rem",
              }}
            ></Box>
          </Grid>
        </Grid>
      </Box>
    </LayoutWithBackheader>
  );
}
