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
import StarIcon from "@mui/icons-material/Star";
import TimelineIcon from "@mui/icons-material/Timeline";
import { add3Dots } from "@/utilities/commonfunctions";
import { useRouter } from "next/router";

export default function MutualFundHome() {
  const router = useRouter();
  const [value, setValue] = useState("one");
  const [color, setColor] = useState<any>();
  const [mutualFundListData, setMutualFundListData] = useState([]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onGetMutualMaster = () => {
    getMutualMasterapi("/api/auth/mutualFundMaster?type=list", "GET").then(
      (res) => {
        if (!res.errorState) {
          setMutualFundListData(res);
        }
      }
    );
  };

  const onRedirectToFundDetails = (fundName: any) => {
    router.push({
      pathname: "/postLogin/mutualFunds/fundDetails",
      query: {
        type: "details",
        fundName: fundName,
      },
    });
  };

  useEffect(() => {
    onGetMutualMaster();
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

        <Grid container spacing={3}>
          {mutualFundListData.map((item: any, index: any) => (
            <Grid item xs={12}
            onClick={() => onRedirectToFundDetails(item.fund_name)}
            >
              <Box
                sx={{
                  background: "#343434",
                  borderRadius: "0.5rem",
                  p: "0.7rem",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Avatar sx={{ background: "#fff" }}>
                      <img height="100%" width="100%" src={item.logoUrl} />
                    </Avatar>

                    <Stack spacing={1.5}>
                      <Typography variant="h2">
                        {add3Dots(item.fund_name, 25)}
                      </Typography>

                      <Stack direction="row" alignItems="center" spacing={5}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <StarIcon
                            sx={{ color: "#9381FF", fontSize: "1.1rem" }}
                          />
                          <Typography variant="h2" fontSize="0.9rem">
                            {item.groww_rating}
                          </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1}>
                          <TimelineIcon
                            sx={{ color: "#9381FF", fontSize: "1.2rem" }}
                          />

                          <Typography variant="h2" fontSize="0.9rem">
                            {item.return5y}{" "}
                            <span style={{ fontSize: "0.7rem", color: "#ccc" }}>
                              {" "}
                              (5Y){" "}
                            </span>
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Box
                    sx={{
                      background:
                        item.risk == "Low"
                          ? "#99FFC4"
                          : item.risk == "Moderate"
                          ? "#FFD770"
                          : item.risk == "High"
                          ? "#FFA947"
                          : "#FF8247",
                      p: "0.1rem 0.5rem",
                      borderRadius: "5rem",
                      minWidth: "64px",
                    }}
                  >
                    <Typography
                      fontSize="0.7rem"
                      fontWeight="400"
                      color="#09080C"
                      textAlign="center"
                    >
                      {item.risk}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </LayoutWithBackheader>
  );
}
