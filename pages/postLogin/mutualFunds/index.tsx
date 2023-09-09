import { getMutualMasterapi } from "@/apifunctions/getMutualMaster";
import LayoutWithBackheader from "@/components/layouts/withbackheader";
import {
  Avatar,
  Box,
  Chip,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SpeedIcon from "@mui/icons-material/Speed";

export default function MutualFundHome() {
  const [value, setValue] = useState("one");
  const [mutualFundListData, setMutualFundListData] = useState([]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onGetMutualMaster = () => {
    getMutualMasterapi("/api/auth/mutualFundMaster", "GET").then((res) => {
      if (!res.errorState) {
        setMutualFundListData(res);
      }
    });
  };

  useEffect(() => {
    // onGetMutualMaster()
  }, []);

  return (
    <LayoutWithBackheader showHeader={true} pageTitle="Mutual Funds">
      <Box px="1rem" pt="5rem" pb="50%">
        {/* <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          TabIndicatorProps={{ style: { backgroundColor: "transparent" } }}
        >
          <Tab
            sx={{
              "&.Mui-selected": {
                background: "#76FFC6",
                borderRadius: "0.8rem",
                color: "#000",
              },
              height: "2rem",
            }}
            label={
              <Typography variant="h2" color="#fff">
                All
              </Typography>
            }
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                background: "#76FFC6",
                borderRadius: "0.8rem",
                p: "0rem 2rem",
                color: "#000",
              },
            }}
            label={
              <Typography variant="h2" color="#fff">
                Low
              </Typography>
            }
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                background: "#76FFC6",
                borderRadius: "0.8rem",
                p: "0rem 2rem",
                color: "#000",
              },
            }}
            label={
              <Typography variant="h2" color="#fff">
                Medium
              </Typography>
            }
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                background: "#76FFC6",
                borderRadius: "0.8rem",
                p: "0rem 2rem",
                color: "#000",
              },
            }}
            label={
              <Typography variant="h2" color="#fff">
                High
              </Typography>
            }
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                background: "#76FFC6",
                borderRadius: "0.8rem",
                p: "0rem 2rem",
                color: "#000",
              },
            }}
            label={
              <Typography variant="h2" color="#fff">
                Very High
              </Typography>
            }
          />
        </Tabs> */}

        <Box
          sx={{
            background: "#343434",
            borderRadius: "0.5rem",
            p: "0.7rem",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar>HH</Avatar>

            <Stack direction="column" spacing={1}>
              <Typography variant="h1">TesT fund dskkj</Typography>

              
              <Typography variant="h2">
                5Y {" "}
                <span style={{ fontSize: "0.6rem" }}>(29.25%)</span>
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </LayoutWithBackheader>
  );
}
