import CustomInput from "@/components/inputs/custominput";
import LayoutWithBackheader from "@/components/layouts/withbackheader";
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function MutualFundOrders() {
  return (
    <LayoutWithBackheader showHeader={true} pageTitle="SIP">
      <Box px="1rem" pt="5rem" pb="50%">
        <Typography variant="h1" textAlign="center">
          Enter Monthly Amount
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <TextField
          autoComplete="off"
            variant="standard"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="h1" fontSize="1.5rem" color="#fff">
                    ₹
                  </Typography>
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />
        </Stack>
      </Box>
    </LayoutWithBackheader>
  );
}
