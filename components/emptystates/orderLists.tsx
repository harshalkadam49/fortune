import { Box, Typography } from "@mui/material";
import Image from "next/image";
import EmptyOrderListImg from "../../public/postLogin/emptyOrderList.svg";

export default function EmptyOrderList() {
  return (
    <>
      <Box textAlign="center" pt="10%">
        <Image
          src={EmptyOrderListImg}
          height={100}
          width={100}
          alt="EmptyOrderList"
        />

        <Typography variant="h2" pt="2rem" >Looks like you dont have <br></br> any orders yet</Typography>
      </Box>
    </>
  );
}
