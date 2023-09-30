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
import { getEquityMasterapi } from "@/apifunctions/getEquityMaster";
import { useRouter } from "next/router";
import Loader from "@/components/loader";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import StockListsSimmer from "@/components/simmers/stockListsSimmer";
import { add3Dots, getTwoDecimalValues } from "@/utilities/commonfunctions";
import { getMutualMasterapi } from "@/apifunctions/getMutualMaster";

export default function StocksLists() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(10);
  const [mutualFundListData, setMutualFundListData] = useState([]);
  const [filteredMutualFundListData, setFilteredMutualFundListData] = useState(
    []
  );

  const getData = (res: any) => {
    setFilteredMutualFundListData(res);
  };

  const onRedirectToDetails = (fundName: any) => {
    router.push({
      pathname: "/postLogin/mutualFunds/fundDetails",
      query: {
        fundName: fundName,
      },
    });
  };

  const onSearch = (searchValue: any) => {
    var filteredMutualFundListData = mutualFundListData.filter((c: any) =>
      c.search_id.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredMutualFundListData(filteredMutualFundListData);
  };

  const onGetMutualMaster = () => {
    getMutualMasterapi("/api/auth/mutualFundMaster?type=list", "GET").then(
      (res) => {
        if (!res.errorState) {
          setMutualFundListData(res);
          getData(res);
        }
      }
    );
  };

  useEffect(() => {
    onGetMutualMaster();
  }, [router.query]);

  return (
    <LayoutWithBackheader showHeader={true} pageTitle="Mutual Funds">
      {isLoading ? (
        <StockListsSimmer />
      ) : (
        <Box px="1rem" pt="5rem" pb="50%">
          <Box>
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
          </Box>

          {filteredMutualFundListData.map((item: any, index: any) => (
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
            >
              <Grid
                item
                xs={2}
                onClick={() => onRedirectToDetails(item.search_id)}
              >
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
                      {item.meta_title && (
                        <>
                          {item.meta_title.split(" ")[0].substring(0, 1)}
                          {item.meta_title.split(" ").length > 1
                            ? item.meta_title.split(" ")[1].substring(0, 1)
                            : ""}
                        </>
                      )}
                    </Typography>
                  )}
                </Avatar>
              </Grid>

              <Grid
                item
                xs={7}
                onClick={() => onRedirectToDetails(item.search_id)}
              >
                <Typography variant="h2">
                  {add3Dots(item.meta_title, 25)}
                </Typography>
                <Stack direction="row" alignItems="center" pt={1} spacing={1}>
                  <Typography fontSize="0.7rem">
                    {getTwoDecimalValues(item.return3y)}% <span style={{ color: "#ccc" }}>(3Y)</span>
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={3}>
                <Chip
                  onClick={() => onRedirectToDetails(item.search_id)}
                  label={
                    <Typography variant="h3" color="#1a1a1a">
                      Invest Now
                    </Typography>
                  }
                  sx={{
                    background: "#76FFC6",
                    width: "100%",
                    height: "1.8rem",
                  }}
                />
              </Grid>
            </Grid>
          ))}
        </Box>
      )}
    </LayoutWithBackheader>
  );
}
