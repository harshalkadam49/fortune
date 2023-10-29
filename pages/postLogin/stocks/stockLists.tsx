import LayoutWithBackheader from "@/components/layouts/withbackheader";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { getEquityMasterapi } from "@/apifunctions/GET/getEquityMaster";
import { useRouter } from "next/router";
import Loader from "@/components/loader";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import StockListsSimmer from "@/components/simmers/stockListsSimmer";
import { getTwoDecimalValues } from "@/utilities/commonfunctions";

export default function StocksLists() {
  const router = useRouter();
  const [equityLists, setEquityLists] = useState<any>([]);
  const [filteredEquityLists, setFilteredEquityLists] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(10);
  const [searchIds, setSearchIds] = useState<any>([]);

  const getData = (res: any) => {
    setFilteredEquityLists(res);
  };

  const onGetEquityLists = () => {
    setIsLoading(true);
    getEquityMasterapi(`/api/auth/equityMaster`, "GET").then((res) => {
      if (!res.errorState) {
        setEquityLists(res);
        getData(res);
        setIsLoading(false);
      }
    });
  };

  const onRedirectToDetails = (searchId: any) => {
    router.push({
      pathname: "/postLogin/stocks/stockDetails",
      query: { searchId: searchId },
    });
  };

  const onRedirectToOrders = (searchId: any, orderType: any) => {
    router.push({
      pathname: "/postLogin/stocks/orderExecution",
      query: { searchId: searchId, orderType: orderType },
    });
  };

  const onSearch = (searchValue: any) => {
    var filteredEquityLists = equityLists.filter((c: any) =>
      c.searchId.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredEquityLists(filteredEquityLists);
  };

  useEffect(() => {
    onGetEquityLists();
  }, [router.query]);

  return (
    <LayoutWithBackheader showHeader={true} pageTitle="Stock List">
      {isLoading ? (
        <StockListsSimmer />
      ) : (
        <Box px="1rem" pt="5rem" pb="50%">
          {/* <Box>
            <TextField
              autoComplete="off"
              variant="outlined"
              fullWidth
              placeholder="Search..."
              type="search"
              sx={{
                "&.MuiInputBase-root-MuiOutlinedInput-root": {
                  background: "#000",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: "1.5rem", color: "#fff" }} />
                  </InputAdornment>
                ),
              }}
              onChange={(e: any) => onSearch(e.target.value)}
            />
          </Box> */}

          {filteredEquityLists.map((item: any, index: any) => (
            <>
              {item && (
                <Grid
                  key={index}
                  mt="1rem"
                  container
                  alignItems="center"
                  sx={{
                    background: "#34343459",
                    borderRadius: "0.5rem",
                    p: "1.2rem 0.688rem",
                  }}
                  onClick={() => onRedirectToDetails(item.searchId)}
                >
                  <Grid item xs={2}>
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
                        <img src={item.logoUrl} height="100%" width="100%" />
                      ) : (
                        <Typography variant="h1" color="#1a1a1a">
                          {item.displayName && (
                            <>
                              {item.displayName.split(" ")[0].substring(0, 1)}
                              {item.displayName.split(" ").length > 1
                                ? item.displayName.split(" ")[1].substring(0, 1)
                                : ""}
                            </>
                          )}
                        </Typography>
                      )}
                    </Avatar>
                  </Grid>

                  <Grid
                    item
                    xs={5}
                    // onClick={() => onRedirectToDetails(item.searchId)}
                  >
                    <Typography variant="h2">
                      {item && item.displayName}
                    </Typography>
                    {/* <Stack direction="row" alignItems="center" pt={1} spacing={1}>
                  <Typography variant="h3">₹ {item.PrevClose}</Typography>
                  <Typography
                    variant="h3"
                    color={item.Change > 0 ? "#76FFC6" : "#EE4D37"}
                  >
                    {getTwoDecimalValues(item.Change)}%
                  </Typography>
                </Stack> */}
                  </Grid>

                  <Grid item xs={5}>
                    <Stack spacing={2} direction="row" alignItems="center">
                      <Chip
                        onClick={() => onRedirectToOrders(item.searchId, "Buy")}
                        label={
                          <Typography variant="h3" color="#1a1a1a">
                            Buy
                          </Typography>
                        }
                        sx={{
                          background: "#76FFC6",
                          width: "55%",
                          height: "1.8rem",
                        }}
                      />

                      <Chip
                        onClick={() =>
                          onRedirectToOrders(item.searchId, "Sell")
                        }
                        label={
                          <Typography variant="h3" color="#fff">
                            Sell
                          </Typography>
                        }
                        sx={{
                          background: "#EE4D37",
                          width: "55%",
                          height: "1.8rem",
                        }}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              )}
            </>
          ))}
        </Box>
      )}
    </LayoutWithBackheader>
  );
}
