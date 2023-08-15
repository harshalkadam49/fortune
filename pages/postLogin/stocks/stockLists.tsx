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

export default function StocksLists() {
  const router = useRouter();
  const [equityLists, setEquityLists] = useState<any>([]);
  const [filteredEquityLists, setFilteredEquityLists] = useState<any>([]);

  const getData = (res: any) => {
    setFilteredEquityLists(res);
  };

  const onGetEquityLists = () => {
    getEquityMasterapi("/api/auth/equityMaster", "GET").then((res) => {
      if (!res.errorState) {
        setEquityLists(res);
        getData(res);
      }
    });
  };

  const onRedirectToDetails = (CompanyName: any) => {
    router.push({
      pathname: "/postLogin/stocks/stockDetails",
      query: { CompanyName: CompanyName },
    });
  };

  const onSearch = (searchValue: any) => {
    var filteredEquityLists = equityLists.filter((c: any) =>
      c.CompanyName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredEquityLists(filteredEquityLists);
  };

  useEffect(() => {
    onGetEquityLists();
  }, []);

  return (
    <LayoutWithBackheader showHeader={true} pageTitle="Stock List">
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

        {filteredEquityLists.map((item: any, index: any) => (
          <Grid
            key={index}
            mt="1rem"
            container
            alignItems="center"
            sx={{
              background: "#343434",
              borderRadius: "0.5rem",
              p: "1.2rem 0.688rem",
            }}
          >
            <Grid
              item
              xs={2}
              onClick={() => onRedirectToDetails(item.CompanyName)}
            >
              <Avatar
                sx={{ background: "#F3FFBD", height: "2rem", width: "2rem" }}
              >
                <Typography variant="h2" color="#1a1a1a">
                  {item.CompanyName.split(" ")[0].substring(0, 1)}
                  {item.CompanyName.split(" ").length > 1
                    ? item.CompanyName.split(" ")[1].substring(0, 1)
                    : ""}
                </Typography>
              </Avatar>
            </Grid>

            <Grid
              item
              xs={5}
              onClick={() => onRedirectToDetails(item.CompanyName)}
            >
              <Typography variant="h2">{item.CompanyName}</Typography>
              <Stack direction="row" alignItems="center" pt={1} spacing={1}>
                <Typography variant="h3">₹ {item.PrevClose}</Typography>
                <Typography
                  variant="h3"
                  color={item.Change > 0 ? "#76FFC6" : "#EE4D37"}
                >
                  ({item.Change})
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={5}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Chip
                  label={
                    <Typography variant="h3" color="#fff">
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
        ))}
      </Box>
    </LayoutWithBackheader>
  );
}
