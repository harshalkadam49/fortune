import LayoutWithBackheader from "@/components/layouts/withbackheader";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Typography,
} from "@mui/material";
import Lottie from "react-lottie";
import BottomStay from "@/components/bottomNavigation";
import { useRouter } from "next/router";
import RiskprofileConservative from "../../../public/postLogin/riskProfile/riskprofileConservative.json";
import RiskprofileBalanced from "../../../public/postLogin/riskProfile/riskprofileBalanced.json";
import RiskProfileAggressive from "../../../public/postLogin/riskProfile/riskProfileAggressive.json";
import { useEffect, useState } from "react";
import { add3Dots } from "@/utilities/commonfunctions";
import stockDetails from "../stocks/stockDetails";
import { getUsersRiskProfileapi } from "@/apifunctions/GET/getUsersRiskProfile";

export default function RiskprofileIndex() {
  const [userData, setUserData] = useState<any>({});
  const profileDesc = [
    {
      profileName: "conservative",
      desc: "Conservative risk profile refers to a significantly low-risk aptitude. Investors with this risk profile will lean towards investment options that provide the safety of the corpus more than anything. The scale of returns is a secondary factor to conservative investors as long as it is not negative. Typically, a conservative risk profile accounts for a short period horizon.Investment options most suited for conservative or low risk-takers are treasury bills, corporate bonds, sovereign bonds, debt-based mutual funds, etc.",
    },
    {
      profileName: "modrate",
      desc: "Moderate risk-takers usually strive to strike a balance between returns and risk. These types of individuals will go for high returns scaled to an agreeable level of risk. Therefore, a moderate risk-taker’s portfolio will constitute a moderate share of equities with debt instruments for adequate risk dilution. Such risk-takers can also singularly invest in equity-based mutual funds.",
    },
    {
      profileName: "aggressive",
      desc: "This risk-profile exhibits the most willingness for withstanding market volatilities in the expectation of earning exponential returns. Usually, these investors are seasoned and well conversant in the ways of stock markets. Apart from that, such investors also have a long-term investment horizon; which is why they can stomach the short-term volatilities.",
    },
  ];
  const [riskProfileName, setRiskProfileName] = useState<any>("");
  const [expanded, setExpanded] = useState(false);

  const router = useRouter();

  const RiskprofileConservativeAnimation = {
    loop: false,
    autoplay: true,
    animationData: RiskprofileConservative,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const RiskprofileBalancedAnimation = {
    loop: false,
    autoplay: true,
    animationData: RiskprofileBalanced,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const RiskProfileAggressiveAnimation = {
    loop: false,
    autoplay: true,
    animationData: RiskProfileAggressive,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onRedirectToHome = () => {
    router.push({
      pathname: "/postLogin",
    });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      var storedUser: any = localStorage.getItem("userData");
      var userObject: any = JSON.parse(storedUser);
      setUserData(userObject);
      getUsersRiskProfileapi(
        `/api/auth/userRiskProfile?userID=${userObject._id}`,
        "GET"
      ).then((res) => {
        if (!res.errorState) {
          console.log(res.data);
          setRiskProfileName(res.data[0].riskprofile);
        }
      });
    }
  }, []);

  return (
    <>
      <LayoutWithBackheader showHeader={false} pageTitle="Watchlist">
        <Box px="1rem" pt="5rem">
          <Box
            height={180}
            width={180}
            sx={{
              background: "#fff",
              borderRadius: "50%",
              mx: "auto",
              position: "relative",
            }}
          >
            {riskProfileName.toLowerCase() == "conservative" && (
              <Lottie
                options={RiskprofileConservativeAnimation}
                height={300}
                width={300}
                style={{
                  position: "absolute",
                  left: "-54.6px",
                  right: "0",
                  top: "-3.8rem",
                }}
              />
            )}

            {riskProfileName.toLowerCase() == "modrate" && (
              <Lottie
                options={RiskprofileBalancedAnimation}
                height={300}
                width={300}
                style={{
                  position: "absolute",
                  left: "-54.6px",
                  right: "0",
                  top: "-3.8rem",
                }}
              />
            )}

            {riskProfileName.toLowerCase() == "aggressive" && (
              <Lottie
                options={RiskProfileAggressiveAnimation}
                height={300}
                width={300}
                style={{
                  position: "absolute",
                  left: "-54.6px",
                  right: "0",
                  top: "-3.8rem",
                }}
              />
            )}
          </Box>

          <Typography
            pt="10%"
            textAlign="center"
            fontSize="1.3rem"
            variant="h1"
          >
            Your risk profile is {riskProfileName}
          </Typography>

          {profileDesc.map(
            (item: any, index: any) =>
              item.profileName == riskProfileName.toLowerCase() && (
                <Card
                  key={index}
                  sx={{ mt: "1rem", background: "#000", p: "0rem" }}
                >
                  <CardHeader
                    sx={{ p: "0rem" }}
                    onClick={handleExpandClick}
                    title={
                      <>
                        {!expanded && (
                          <Typography
                            fontSize="1rem"
                            fontWeight="200"
                            textAlign="justify"
                            color="#fff"
                          >
                            {item.desc && add3Dots(item.desc, 200)}{" "}
                            <span style={{ color: "#76FFC6" }}>See More</span>
                          </Typography>
                        )}
                      </>
                    }
                    subheader="September 14, 2016"
                  />
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent sx={{ p: "0rem" }} onClick={handleExpandClick}>
                      <Typography
                        fontSize="1rem"
                        fontWeight="200"
                        textAlign="justify"
                        color="#fff"
                      >
                        {item.desc}{" "}
                        <span style={{ color: "#76FFC6" }}>See Less</span>
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              )
          )}

          <BottomStay>
            <Button
              onClick={onRedirectToHome}
              variant="contained"
              fullWidth={true}
            >
              Start Investing
            </Button>
          </BottomStay>
        </Box>
      </LayoutWithBackheader>
    </>
  );
}
