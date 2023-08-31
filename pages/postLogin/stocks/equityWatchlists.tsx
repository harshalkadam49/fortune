import LayoutWithBackheader from "@/components/layouts/withbackheader";
import Loader from "@/components/loader";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUsersWatchListsapi } from "@/apifunctions/getUsersWatchLists";
import { postRemoveFromSaveListsEquityapi } from "@/apifunctions/postRemoveFromSaveListsEquity";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteImg from "../../../public/postLogin/delete.png";
import Image from "next/image";
import EmptyOrderList from "@/components/emptystates/orderLists";
import EmptyWatchList from "@/components/emptystates/emptyWatchList";
import { useRouter } from "next/router";

const style = {
  width: "100%",
  bgcolor: "none",
};

const deleteModal = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "#343434",
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
  const [usersData, setUsersData] = useState<any>({});
  const [activeID, setActiveID] = useState<any>(0);

  const onGetStockDetails = () => {
    if (typeof window !== "undefined") {
      var storedUser: any = localStorage.getItem("userData");
      var userObject: any = JSON.parse(storedUser);
      setUsersData(userObject);
    }
    setIsLoading(true);
    getUsersWatchListsapi(
      `/api/auth/userWatchLists?id=${userObject._id}`,
      "GET"
    ).then((res: any) => {
      if (!res.errorState) {
        setSaveListData(res.saveList);
        setIsLoading(false);
      }
    });
  };

  const onAddToWatchList = (EquityID: any) => {
    let model: any = {
      userID: usersData._id,
      equityID: EquityID,
    };

    setOpen(false);
    postRemoveFromSaveListsEquityapi(
      model,
      "/api/auth/removeFromSaveListEquity",
      "POST"
    );
    window.location.reload();
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
      query: { CompanyName: CompanyName, isSaved: true },
    });
  };

  useEffect(() => {
    onGetStockDetails();
  }, []);

  return (
    <LayoutWithBackheader showHeader={true} pageTitle="Watchlist">
      <Loader isLoading={isLoading} />
      <Box px="1rem" pt="5rem" pb="50%">
        <Stack direction="row" alignItems="center" spacing={1}>
          <FilterListIcon
            sx={{
              color: "#fff",
              fontSize: "1.5rem",
            }}
          />
          <Typography variant="h2">Sort</Typography>
        </Stack>

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
                    onClick={() => onRedirectToDetails(item.CompanyName)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          background: "#F3FFBD",
                          height: "2.5rem",
                          width: "2.5rem",
                          color: "#1a1a1a",
                          fontSize: "1rem",
                        }}
                      >
                        <Typography variant="h1" color="#1a1a1a">
                          {item.CompanyName && (
                            <>
                              {item.CompanyName.split(" ")[0].substring(0, 1)}
                              {item.CompanyName.split(" ").length > 1
                                ? item.CompanyName.split(" ")[1].substring(0, 1)
                                : ""}
                            </>
                          )}
                        </Typography>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h2">{item.CompanyName}</Typography>
                      }
                      secondary={
                        <Typography
                          variant="h3"
                          pt="0.5rem"
                          color={item.Change > 0 ? "#76FFC6" : "#EE4D37"}
                        >
                          ₹ {item.LastPrice} ({item.Change}%)
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
                        Are you sure to remove "{item.CompanyName}" from this
                        list ?
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
      </Box>
    </LayoutWithBackheader>
  );
}
