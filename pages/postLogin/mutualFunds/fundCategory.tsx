import { getMutualFundCategoryapi } from "@/apifunctions/getMutualFundCategory";
import LayoutWithBackheader from "@/components/layouts/withbackheader";
import {
  Avatar,
  Box,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import StarsIcon from "@mui/icons-material/Stars";
import StockListsSimmer from "@/components/simmers/stockListsSimmer";

export default function FundCategory() {
  const router = useRouter();
  const [fundType, setFundType] = useState<any>("");
  const [isLoading, setIsLoading] = useState<any>(false);
  const [mutualFundList, setMutualFundList] = useState<any>([]);
  const [filteredMutualFundListData, setFilteredMutualFundListData] =
    useState<any>([]);

  const onGetFundList = (type: any) => {
    getMutualFundCategoryapi(
      `/api/auth/mutualFundCategory?type=${type}`,
      "GET"
    ).then((res) => {
      setMutualFundList(res);
      getData(res);
      setIsLoading(false);
    });
  };

  const onSearch = (searchValue: any) => {
    var filteredMutualFundListData = mutualFundList.filter((c: any) =>
      c.search_id.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredMutualFundListData(filteredMutualFundListData);
  };

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

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(true);
      setFundType(router.query.type);
      onGetFundList(router.query.type);
    }
  }, [router.query]);

  return (
    <LayoutWithBackheader showHeader={true} pageTitle={`Best ${fundType}`}>
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

          {filteredMutualFundListData.map((item: any) => (
            <Box
              onClick={() => onRedirectToDetails(item.search_id)}
              sx={{
                background: "#34343459",
                borderRadius: "0.5rem",
                p: "0.5rem",
                my: "0.5rem",
                cursor:"pointer"
              }}
            >
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={2}>
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
                      <img src={item.logo_url} height="100%" width="100%" />
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
                <Grid item xs={8}>
                  <Typography variant="h2" color="#fff">
                    {item.scheme_name}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      )}
    </LayoutWithBackheader>
  );
}
