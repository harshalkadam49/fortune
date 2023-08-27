import { getEquityOrdersPlacedapi } from "@/apifunctions/getEquityOrdersPlaced";
import EmptyOrderList from "@/components/emptystates/orderLists";
import LayoutWithBackheader from "@/components/layouts/withbackheader";
import Loader from "@/components/loader";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function EquityOrders() {
  const [orderLists, setOrderLists] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const onGetEquityOrders = () => {
    setIsLoading(true);
    getEquityOrdersPlacedapi("/api/auth/equityOrdersPlaced", "GET").then(
      (res) => {
        if (!res.errorState) {
          setOrderLists(res);
          setIsLoading(false);
        }
      }
    );
  };

  useEffect(() => {
    onGetEquityOrders();
  }, []);

  return (
    <LayoutWithBackheader showHeader={true} pageTitle="Place Order">
      <Loader isLoading={isLoading} />
      <Box px="1rem" pt="5rem" pb="50%">
        <Typography variant="h1" pb="1rem">
          {" "}
          All Orders
        </Typography>

        {orderLists.length > 0 && (
          <Grid
            container
            pb="1rem"
            pt="2rem"
            sx={{
              borderRadius: "0.5rem",
              p: "1rem 0.688rem",
            }}
          >
            <Grid item xs={3}>
              <Typography variant="h2">Stock</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h2">Price</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h2">Qty</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography variant="h2">Type</Typography>
            </Grid>
          </Grid>
        )}

        {orderLists.map((item: any) => (
          <Grid
            mt="0.5rem"
            container
            alignItems="center"
            sx={{
              background: "#343434",
              borderRadius: "0.5rem",
              p: "1rem 0.688rem",
            }}
          >
            <Grid item xs={3}>
              <Typography variant="h3">{item.stockname}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h3">{item.price}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="h3"
                color={item.type == "Buy" ? "#76FFC6" : "#EE4D37"}
              >
                {item.quantity}
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography
                variant="h3"
                color={item.type == "Buy" ? "#76FFC6" : "#EE4D37"}
              >
                {item.type}
              </Typography>
            </Grid>
          </Grid>
        ))}

        {orderLists.length == 0 && <EmptyOrderList />}
      </Box>
    </LayoutWithBackheader>
  );
}
