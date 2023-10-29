import { getEquityDetailsapi } from "@/apifunctions/GET/getEquityDetails";
import { postEquityOrdersapi } from "@/apifunctions/POST/postEquityOrders";
import CustomInput from "@/components/inputs/custominput";
import LayoutWithBackheader from "@/components/layouts/withbackheader";
import OrderExecutionSimmer from "@/components/simmers/orderExecutionSimmer";
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
  const [userData, setUserData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<any>(false);
  const [livePriceData, setLivePriceData] = useState<any>({});

  const onPlaceOrder = () => {
    if (error == " ") {
      setOpen(false);
      setError(" ");
      let model = {
        stockname: stockDetails.displayName,
        price: livePriceData.ltp,
        quantity: quantity,
        type: orderType,
        userID: userData._id,
      };
      setIsLoading(true);
      postEquityOrdersapi(model, "/api/auth/equityOrders", "POST").then(
        (res) => {
          if (!res.errorState) {
            router.push("/postLogin/stocks/equityOrders");
            setIsLoading(false);
          }
        }
      );
    } else {
      setOpen(true);
      setError("Invalid Quantity");
      setIsLoading(false);
    }
  };

  const onGetStockDetails = (searchId: any) => {
    setIsLoading(true);
    getEquityDetailsapi(
      `/api/auth/equityDetailsNew?searchId=${searchId}`,
      "GET"
    ).then((res) => {
      if (!res.errorState) {
        setStockDetails(res.data);
        setLivePriceData(res.livePriceData);
        setIsLoading(false);
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
      onGetStockDetails(router.query.searchId);
      setCompanyName(router.query.searchId);
      setOrderType(router.query.orderType);
    }

    if (typeof window !== "undefined") {
      var storedUser: any = localStorage.getItem("userData");
      var userObject: any = JSON.parse(storedUser);
      setUserData(userObject);
    }
  }, [router.query]);

  return (
    <>
      <LayoutWithBackheader showHeader={true} pageTitle="Place Order">
        {isLoading ? (
          <OrderExecutionSimmer />
        ) : (
          <>
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
                      background: stockDetails.logoUrl ? "#fff" : "#76FFC6",
                      height: "2.5rem",
                      width: "2.5rem",
                      color: "#1a1a1a",
                      fontSize: "1rem",
                    }}
                  >
                    {stockDetails.logoUrl ? (
                      <img
                        src={stockDetails.logoUrl}
                        height="100%"
                        width="100%"
                      />
                    ) : (
                      <Typography variant="h1" color="#1a1a1a">
                        {stockDetails.displayName && (
                          <>
                            {stockDetails.displayName
                              .split(" ")[0]
                              .substring(0, 1)}
                            {stockDetails.displayName.split(" ").length > 1
                              ? stockDetails.displayName
                                  .split(" ")[1]
                                  .substring(0, 1)
                              : ""}
                          </>
                        )}
                      </Typography>
                    )}
                  </Avatar>

                  <Typography variant="h1">
                    {stockDetails.displayName}
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    border: `1px solid #76FFC6`,
                    borderRadius: "2rem",
                    p: "0.1rem 0.5rem",
                  }}
                >
                  <Typography variant="h3">
                    {stockDetails.industryName}
                  </Typography>
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
                      defaultValue={livePriceData.ltp}
                      value={livePriceData.ltp}
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
                      defaultValue={livePriceData.ltp}
                      InputProps={{
                        type: "number",
                      }}
                      onChange={(e: any) =>
                        handleQuantityChange(e.target.value)
                      }
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
          </>
        )}
      </LayoutWithBackheader>
    </>
  );
}
