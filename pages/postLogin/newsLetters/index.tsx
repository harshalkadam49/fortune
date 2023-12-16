import { getNewLettersapi } from "@/apifunctions/GET/getNewLetters";
import LayoutWithBackheader from "@/components/layouts/withbackheader";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useRouter } from "next/router";
import Loader from "@/components/loader";
export default function NewsLetters() {
  const [newsLetters, setNewsLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onGetNewLetters = () => {
    setIsLoading(true);
    getNewLettersapi("/api/auth/newsLetters", "GET").then((res: any) => {
      if (!res.errorState) {
        setNewsLetters(res);
        setIsLoading(false);
      }
    });
  };

  const onRedirectToDetails = (searchId: any, viewedFrom: any) => {
    router.push({
      pathname: "/postLogin/stocks/stockDetails",
      query: { searchId: searchId, viewedFrom: viewedFrom },
    });
  };

  useEffect(() => {
    onGetNewLetters();
  }, []);

  return (
    <LayoutWithBackheader showHeader={true} pageTitle="Stocks In news">
      <Box px="1rem" pt="5rem" pb="50%">
        {isLoading ? (
          <Loader isLoading={true} />
        ) : (
          <>
            {newsLetters &&
              newsLetters.map((item: any, index: any) => (
                <Box
                  //   onClick={() => router.push(item.link)}
                  key={index}
                  sx={{
                    background: "#34343459",
                    borderRadius: "0.5rem",
                    p: "1rem",
                    cursor: "pointer",
                    mt: "1rem",
                  }}
                >
                  <Stack direction="row" alignItems="flex-start" spacing={2}>
                    <Avatar
                      sx={{
                        background: "#fff",
                        height: "2.5rem",
                        width: "2.5rem",
                        color: "#1a1a1a",
                        fontSize: "1rem",
                      }}
                    >
                      <img src={item.imageUrl} height="100%" width="100%" />
                    </Avatar>
                    <Typography variant="h2">{item.title}</Typography>

                    <Box
                      sx={{
                        color:
                          item.companies[0].livePriceDto.dayChangePerc <= 0
                            ? "#d62626"
                            : "#509669",
                        background:
                          item.companies[0].livePriceDto.dayChangePerc <= 0
                            ? "#fee2e2"
                            : "#d1fae5",
                        borderRadius: "2rem",
                        p: "0.2rem 0.5rem",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <ArrowDownwardIcon
                          sx={{
                            color:
                              item.companies[0].livePriceDto.dayChangePerc <= 0
                                ? "#d62626"
                                : "#509669",
                            fontSize: "1rem",
                          }}
                        />
                        <Typography
                          variant="h2"
                          fontSize="0.8rem"
                          pt="0.1rem"
                          fontWeight="550"
                        >
                          {item.companies[0].livePriceDto.dayChangePerc.toFixed(
                            2
                          )}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  {item.summary && (
                    <Typography
                      fontSize="0.8rem"
                      color="#8a8a8a"
                      pt={5}
                      textAlign="justify"
                    >
                      {item.summary}
                    </Typography>
                  )}

                  <Box textAlign="right" pt={2}>
                    <Button
                      onClick={() =>
                        onRedirectToDetails(item.companies[0].searchId, 0)
                      }
                      variant="text"
                      size="small"
                      sx={{
                        fontSize: "0.8rem",
                        color: "#fff",
                      }}
                    >
                      Stock Details
                    </Button>
                  </Box>
                </Box>
              ))}
          </>
        )}
      </Box>
    </LayoutWithBackheader>
  );
}
