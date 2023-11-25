import LayoutWithBackheader from "@/components/layouts/withbackheader";
import Loader from "@/components/loader";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SelectChangeEvent,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUsersWatchListsapi } from "@/apifunctions/GET/getUsersWatchLists";
import { postRemoveFromSaveListsEquityapi } from "@/apifunctions/POST/postRemoveFromSaveListsEquity";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteImg from "../../../public/postLogin/delete.png";
import Image from "next/image";
import EmptyOrderList from "@/components/emptystates/orderLists";
import EmptyWatchList from "@/components/emptystates/emptyWatchList";
import { useRouter } from "next/router";
import EquityWatchlistsSimmer from "@/components/simmers/equityWatchlistsSimmer";
import { getTwoDecimalValues } from "@/utilities/commonfunctions";
import { getMFSavedLists } from "@/apifunctions/GET/getMFSavedLists";

const style = {
  width: "100%",
  bgcolor: "none",
};

const deleteModal = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "20%", xs: "90%" },
  bgcolor: "#34343459",
  boxShadow: 24,
  p: "2rem",
  borderRadius: "0.5rem",
  textAlign: "center",
};

export default function EquityCart() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [saveListData, setSaveListData] = useState([]);
  const [MFSavedLists, setMFSavedLists] = useState([]);
  const [usersData, setUsersData] = useState<any>({});
  const [activeID, setActiveID] = useState<any>(0);
  const [investmentType, setInvestmentType] = useState("Stocks");

  const onGetStockDetails = (id: any) => {
    setIsLoading(true);
    getUsersWatchListsapi(`/api/auth/userWatchLists?id=${id}`, "GET").then(
      (res: any) => {
        if (!res.errorState) {
          setSaveListData(res.saveList);
          setIsLoading(false);
        }
      }
    );
  };

  const onAddToWatchList = (EquityID: any) => {
    let model: any = {
      userID: usersData._id,
      equityID: EquityID,
    };

    setOpen(false);
    setIsLoading(true);
    postRemoveFromSaveListsEquityapi(
      model,
      "/api/auth/removeFromSaveListEquity",
      "POST"
    ).then((res: any) => {
      if (!res.errorState) {
        router.reload();
        setIsLoading(false);
      }
    });
  };

  const onGetMFSaveListData = (userID: any) => {
    getMFSavedLists(`/api/auth/mfSavedLists?userID=${userID}`, "GET").then(
      (res: any) => {
        setMFSavedLists(res);
      }
    );
  };

  const handleOpen = (id: any) => { 
    setActiveID(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onRedirectToDetails = (CompanyName: any) => {
    router.push({
      pathname: "/postLogin/stocks/stockDetails",
      query: { CompanyName: CompanyName },
    });
  };

  const handleChangeInvestmentType = (event: SelectChangeEvent) => {
    setInvestmentType(event.target.value as string);
  };

  const onRedirectToMFDetails = (fundName: any) => {
    router.push({
      pathname: "/postLogin/mutualFunds/fundDetails",
      query: {
        fundName: fundName,
      },
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      var storedUser: any = localStorage.getItem("userData");
      var userObject: any = JSON.parse(storedUser);
      setUsersData(userObject);
      onGetStockDetails(userObject._id);
      onGetMFSaveListData(userObject._id);
    }
  }, []);

  return (
    <LayoutWithBackheader showHeader={true} pageTitle="Watchlist">
      {isLoading ? (
        <EquityWatchlistsSimmer />
      ) : (
        <Box px="1rem" pt="5rem" pb="50%">
          <FormControl sx={{ width: "50%" }} variant="standard">
            <Select
              value={investmentType}
              onChange={handleChangeInvestmentType}
              disableUnderline
              sx={{
                background: "#34343459",
                p: "0.2rem 1rem",
                borderRadius: "0.5rem",
                color: "#fff",
                "& .MuiSvgIcon-root": {
                  color: "white",
                  fontSize: "2rem",
                },
              }}
            >
              <MenuItem value="Stocks">
                <Typography variant="h1">Stocks</Typography>
              </MenuItem>
              <MenuItem value="Mutual Funds">
                <Typography variant="h1">Mutual Funds</Typography>
              </MenuItem>
            </Select>
          </FormControl>

          {investmentType == "Stocks" ? (
            <Box pt="1rem">
              {saveListData.length ? (
                saveListData.map((item: any, index: any) => (
                  <>
                    <ListItem key={index} sx={{ pl: "0" }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                        onClick={() => onRedirectToDetails(item.search_id)}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              background: item.logoUrl ? "#fff" : "#76FFC6",
                              height: "2.5rem",
                              width: "2.5rem",
                              color: "#1a1a1a",
                              fontSize: "1rem",
                            }}
                          >
                            {item.logoUrl ? (
                              <img
                                src={item.logoUrl}
                                height="100%"
                                width="100%"
                              />
                            ) : (
                              <Typography variant="h1" color="#1a1a1a">
                                {item.CompanyName && (
                                  <>
                                    {item.CompanyName.split(" ")[0].substring(
                                      0,
                                      1
                                    )}
                                    {item.CompanyName.split(" ").length > 1
                                      ? item.CompanyName.split(
                                          " "
                                        )[1].substring(0, 1)
                                      : ""}
                                  </>
                                )}
                              </Typography>
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="h2">
                              {item.CompanyName}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="h3"
                              pt="0.5rem"
                              color={item.Change > 0 ? "#76FFC6" : "#EE4D37"}
                            >
                              ₹ {item.LastPrice} (
                              {getTwoDecimalValues(item.Change)}%)
                            </Typography>
                          }
                        />
                      </Stack>
                      {/* <DeleteIcon
                        // onClick={() => onAddToWatchList(item._id)}
                        onClick={() => handleOpen(item._id)}
                        sx={{
                          color: "#EE4D37",
                          fontSize: "1.2rem",
                        }}
                      /> */}
                    </ListItem>

                    {activeID == item._id && (
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                      >
                        <Box sx={{ ...deleteModal }}>
                          <Image
                            src={DeleteImg}
                            height={50}
                            width={50}
                            alt="delete"
                          />

                          <Typography variant="h2" py="1rem">
                            Are you sure to remove "{item.CompanyName}" from
                            this list ?
                          </Typography>

                          <Stack
                            direction="row"
                            justifyContent="center"
                            spacing={5}
                            pt="1rem"
                          >
                            <Button
                              variant="outlined"
                              onClick={handleClose}
                              sx={{
                                border: "1px solid #ccc",
                                background: "#ccc",
                                borderRadius: "0.5rem",
                                textTransform: "capitalize",
                                p: "0.3rem 1.5rem",
                              }}
                            >
                              <Typography fontSize="1rem" color="#1a1a1a">
                                Close
                              </Typography>
                            </Button>

                            <Button
                              variant="contained"
                              onClick={() => onAddToWatchList(item._id)}
                              sx={{
                                border: "1px solid #EB5757",
                                background: "#EB5757",
                                borderRadius: "0.5rem",
                                textTransform: "capitalize",
                                p: "0.3rem 1.5rem",
                              }}
                            >
                              <Typography fontSize="1rem" color="#FFF">
                                Delete
                              </Typography>
                            </Button>
                          </Stack>
                        </Box>
                      </Modal>
                    )}
                  </>
                ))
              ) : (
                <EmptyWatchList />
              )}
            </Box>
          ) : (
            <Box pt="1rem">
              {MFSavedLists.length ? (
                MFSavedLists.map((item: any, index: any) => (
                  <>
                    <ListItem key={index} sx={{ pl: "0" }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                        onClick={() => onRedirectToMFDetails(item.search_id)}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              background: item.logo_url ? "#fff" : "#76FFC6",
                              height: "2.5rem",
                              width: "2.5rem",
                              color: "#1a1a1a",
                              fontSize: "1rem",
                            }}
                          >
                            {item.logo_url ? (
                              <img
                                src={item.logo_url}
                                height="100%"
                                width="100%"
                              />
                            ) : (
                              <Typography variant="h1" color="#1a1a1a">
                                {item.scheme_name && (
                                  <>
                                    {item.scheme_name
                                      .split(" ")[0]
                                      .substring(0, 1)}
                                    {item.scheme_name.split(" ").length > 1
                                      ? item.scheme_name
                                          .split(" ")[1]
                                          .substring(0, 1)
                                      : ""}
                                  </>
                                )}
                              </Typography>
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="h2">
                              {item.scheme_name}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="h3" pt="0.5rem">
                              {getTwoDecimalValues(item.returns_3Y)} % (3Y)
                            </Typography>
                          }
                        />
                      </Stack>
                      <DeleteIcon
                        // onClick={() => onAddToWatchList(item._id)}
                        onClick={() => handleOpen(item._id)}
                        sx={{
                          color: "#EE4D37",
                          fontSize: "1.2rem",
                        }}
                      />
                    </ListItem>

                    {activeID == item._id && (
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                      >
                        <Box sx={{ ...deleteModal }}>
                          <Image
                            src={DeleteImg}
                            height={50}
                            width={50}
                            alt="delete"
                          />

                          <Typography variant="h2" py="1rem">
                            Are you sure to remove "{item.scheme_name}" from
                            this list ?
                          </Typography>

                          <Stack
                            direction="row"
                            justifyContent="center"
                            spacing={5}
                            pt="1rem"
                          >
                            <Button
                              variant="outlined"
                              onClick={handleClose}
                              sx={{
                                border: "1px solid #ccc",
                                background: "#ccc",
                                borderRadius: "0.5rem",
                                textTransform: "capitalize",
                                p: "0.3rem 1.5rem",
                              }}
                            >
                              <Typography fontSize="1rem" color="#1a1a1a">
                                Close
                              </Typography>
                            </Button>

                            <Button
                              variant="contained"
                              onClick={() => onAddToWatchList(item._id)}
                              sx={{
                                border: "1px solid #EB5757",
                                background: "#EB5757",
                                borderRadius: "0.5rem",
                                textTransform: "capitalize",
                                p: "0.3rem 1.5rem",
                              }}
                            >
                              <Typography fontSize="1rem" color="#FFF">
                                Delete
                              </Typography>
                            </Button>
                          </Stack>
                        </Box>
                      </Modal>
                    )}
                  </>
                ))
              ) : (
                <EmptyWatchList />
              )}
            </Box>
          )}
        </Box>
      )}
    </LayoutWithBackheader>
  );
}
