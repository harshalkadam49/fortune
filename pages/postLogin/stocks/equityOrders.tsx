import { getEquityOrdersPlacedapi } from "@/apifunctions/GET/getEquityOrdersPlaced";
import EmptyOrderList from "@/components/emptystates/orderLists";
import LayoutWithBackheader from "@/components/layouts/withbackheader";
import Loader from "@/components/loader";
import {
  Box,
  Chip,
  Grid,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EquityOrdersSimmer from "@/components/simmers/equityOrdersSimmer";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "20%", xs: "90%" },
  bgcolor: "#000",
  boxShadow: 24,
  p: "1rem",
  borderRadius: "0.5rem",
};
export default function EquityOrders() {
  // dummy
  const [orderLists, setOrderLists] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [userData, setUserData] = useState<any>({});
  const [open, setOpen] = useState<any>(false);
  const [selectedID, setSelectedID] = useState<any>(0);

  const onGetEquityOrders = (id: any) => {
    setIsLoading(true);
    getEquityOrdersPlacedapi(
      `/api/auth/equityOrdersPlaced?id=${id}`,
      "GET"
    ).then((res) => {
      if (!res.errorState) {
        setOrderLists(res);
        setIsLoading(false);
      }
    });
  };

  const handleOpen = (item: any) => {
    setSelectedID(item._id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      var storedUser: any = localStorage.getItem("userData");
      var userObject: any = JSON.parse(storedUser);
      setUserData(userObject);
      onGetEquityOrders(userObject._id);
    }
  }, []);

  return (
    <LayoutWithBackheader showHeader={true} pageTitle="Place Order">
      {isLoading ? (
        <EquityOrdersSimmer />
      ) : (
        <Box px="1rem" pt="5rem" pb="50%">
          {orderLists.length == 0 && <EmptyOrderList />}
          <>
            {orderLists.map((item: any, index: any) => (
              <Box
                sx={{
                  background: "#34343459",
                  borderRadius: "0.5rem",
                  p: "1rem",
                  mb: "0.9rem",
                }}
                onClick={() => handleOpen(item)}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h1" color="#fff">
                      {item.stockname}
                    </Typography>

                    <Typography variant="h2" color="#fff" pt={2}>
                      {item.quantity} @{item.price}
                    </Typography>
                  </Box>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        background: item.type == "Sell" ? "#EE4D37" : "#76FFC6",
                        color: item.type == "Sell" ? "#fff" : "#323232",
                        fontSize: "0.8rem",
                        p: "0.1rem 0.8rem",
                        borderRadius: "0.2rem",
                      }}
                    >
                      {item.type}
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            ))}

            {orderLists.map(
              (item: any, index: any) =>
                item._id == selectedID && (
                  <Modal
                    key={index}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography
                          variant="h1"
                          fontSize="1.3rem"
                          textAlign="center"
                        >
                          Order Details
                        </Typography>

                        <CloseIcon
                          onClick={handleClose}
                          sx={{ fontSize: "1.5rem" }}
                        />
                      </Stack>

                      <Grid container spacing={4} pt="2rem">
                        <Grid item xs={4}>
                          <Typography variant="h1" color="#fff">
                            Stock Name
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="h1" color="#fff">
                            : {item.stockname}
                          </Typography>
                        </Grid>

                        <Grid item xs={4}>
                          <Typography variant="h1" color="#fff">
                            Price
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="h1" color="#fff">
                            : ₹ {item.price}
                          </Typography>
                        </Grid>

                        <Grid item xs={4}>
                          <Typography variant="h1" color="#fff">
                            Quantity
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="h1" color="#fff">
                            : {item.quantity}
                          </Typography>
                        </Grid>

                        <Grid item xs={4}>
                          <Typography variant="h1" color="#fff">
                            Order Type
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="h1" color="#fff">
                            : {item.type}
                          </Typography>
                        </Grid>

                        <Grid item xs={4}>
                          <Typography variant="h1" color="#fff">
                            Date
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="h1" color="#fff">
                            :{" "}
                            {moment(item.timestamp).format(
                              "MMM Do YYYY, h:mm A"
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Modal>
                )
            )}
          </>
        </Box>
      )}
    </LayoutWithBackheader>
  );
}
