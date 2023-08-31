import { Box, Typography } from "@mui/material";
import Image from "next/image";
import EmptyWatchlistsImg from "../../public/postLogin/emptyWatchlists.svg";

export default function EmptyWatchList() {
  return (
    <>
      <Box textAlign="center" pt="10%">
        <Image
          src={EmptyWatchlistsImg}
          height={150}
          width={150}
          alt="EmptyWatchlistsImg"
        />

        <Typography variant="h2" pt="2rem">
          Looks like you dont have <br></br> any watchlist yet
        </Typography>
      </Box>
    </>
  );
}
