import { getEquityDetailsapi } from "@/apifunctions/getEquityDetails";
import { postEquityOrdersapi } from "@/apifunctions/postEquityOrders";
import CustomInput from "@/components/inputs/custominput";
import LayoutWithBackheader from "@/components/layouts/withbackheader";
import Toast from "@/components/toasts/loginToast";
import {
  Avatar,
  BottomNavigation,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function OrderExecution() {
  const router = useRouter();
  const [CompanyName, setCompanyName] = useState<any>("");
  const [stockDetails, setStockDetails] = useState<any>([]);
  const [quantity, setQuantity] = useState<any>(0);
  const [error, setError] = useState<any>("");
  const [orderType, setOrderType] = useState<any>("");
  const [open, setOpen] = useState(false);

  const onPlaceOrder = () => {
    if (error == " ") {
      setOpen(false);
      setError(" ");
      let model = {
        stockname: stockDetails.CompanyName,
        price: stockDetails.LastPrice,
        quantity: quantity,
        type: orderType,
      };
      postEquityOrdersapi(model, "/api/auth/equityOrders", "POST").then(
        (res) => {
          if (!res.errorState) {
            router.push("/postLogin/stocks/equityOrders");
          }
        }
      );
    } else {
      setOpen(true);
      setError("Invalid Quantity");
    }
  };

  const onGetStockDetails = (CompanyName: any) => {
    getEquityDetailsapi(
      `/api/auth/equityDetails?CompanyName=${CompanyName}`,
      "GET"
    ).then((res) => {
      if (!res.errorState) {
        setStockDetails(res.data);
      }
    });
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleQuantityChange = (value: any) => {
    setQuantity(value);
    if (value > 0) {
      setOpen(false);
      setError(" ");
    } else if (value == 0) {
      setError("Invalid Quantity");
      setOpen(true);
    } else {
      setError("Invalid Quantity");
      setOpen(true);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      onGetStockDetails(router.query.CompanyName);
      setCompanyName(router.query.CompanyName);
      setOrderType(router.query.orderType);
    }
  }, [router.query]);

  return (
    <>
      <LayoutWithBackheader showHeader={true} pageTitle="Place Order">
        <Toast
          open={open}
          handleClose={handleClose}
          message={error}
          severity="error"
        />
        <Box px="1rem" pt="5rem" pb="50%">
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  background: "#76FFC6",
                  height: "2.5rem",
                  width: "2.5rem",
                  color: "#1a1a1a",
                  fontSize: "1rem",
                }}
              >
                <Typography variant="h1" color="#1a1a1a">
                  {stockDetails.CompanyName && (
                    <>
                      {stockDetails.CompanyName.split(" ")[0].substring(0, 1)}
                      {stockDetails.CompanyName.split(" ").length > 1
                        ? stockDetails.CompanyName.split(" ")[1].substring(0, 1)
                        : ""}
                    </>
                  )}
                </Typography>
              </Avatar>

              <Typography variant="h1">{stockDetails.CompanyName}</Typography>
            </Stack>

            <Box
              sx={{
                border: `1px solid #76FFC6`,
                borderRadius: "2rem",
                p: "0.1rem 0.5rem",
              }}
            >
              <Typography variant="h3">{stockDetails.SectorName}</Typography>
            </Box>
          </Stack>

          <Grid container spacing={3} pt="2rem">
            <Grid item xs={8}>
              <Box>
                <Typography variant="h2" mb={2}>
                  Price (CMP)
                </Typography>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  defaultValue={stockDetails.LastPrice}
                  value={stockDetails.LastPrice}
                />
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box>
                <Typography variant="h2" mb={2}>
                  Qty
                </Typography>

                <TextField
                  value={quantity}
                  type="Numbers"
                  defaultValue={stockDetails.LastPrice}
                  InputProps={{
                    type: "number",
                  }}
                  onChange={(e: any) => handleQuantityChange(e.target.value)}
                  helperText={
                    <Typography variant="h3" color="#EE4D37">
                      {error}
                    </Typography>
                  }
                />
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: "#000",
              height: "6rem",
            }}
          >
            <Stack
              sx={{
                width: { lg: "25%", xs: "95%" },
                mx: "auto",
              }}
              justifyContent="center"
              spacing={2}
              direction="row"
              alignItems="center"
            >
              {orderType == "Buy" && (
                <Button
                  onClick={onPlaceOrder}
                  variant="contained"
                  fullWidth={true}
                  sx={{
                    background: "#76FFC6",
                    color: "#fff",
                  }}
                >
                  Buy
                </Button>
              )}

              {orderType == "Sell" && (
                <Button
                  onClick={onPlaceOrder}
                  variant="contained"
                  fullWidth={true}
                  sx={{
                    background: "#EE4D37",
                    color: "#fff",
                  }}
                >
                  Sell
                </Button>
              )}
            </Stack>
          </Box>
        </Box>
      </LayoutWithBackheader>
    </>
  );
}
