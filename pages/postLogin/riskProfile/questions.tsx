import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { getRiskProfileQuesAndAnsapi } from "@/apifunctions/GET/getRiskProfileQues&Ans";
import { useEffect, useState } from "react";
import LayoutWithBackheader from "@/components/layouts/withbackheader";
import { Stack } from "@mui/material";
import Image from "next/image";
import CheckIcon from "../../../public/postLogin/riskProfile/checkIcon.svg";
import UncheckIcon from "../../../public/postLogin/riskProfile/uncheckIcon.svg";
import BottomStay from "@/components/bottomNavigation";
import { postRiskProfileQuestionsapi } from "@/apifunctions/POST/postRiskProfileQuestions";
import Lottie from "react-lottie";
import RiskprofileProcessing from "../../../public/postLogin/riskProfile/riskprofileProcessing.json";
import { useRouter } from "next/router";

export default function VerticalLinearStepper() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [questions, setQuestions] = useState<any>([]);
  const [answers, setAnswers] = useState<any>([]);
  const [filteredAnswersArray, setFilteredAnswersArray] = useState<any>([]);
  const [userData, setUserData] = useState<any>({});
  const [riskProfileResult, setRiskProfileResult] = useState<any>({});
  const [isQuestionShow, setIsQuestionShow] = useState<any>(true);

  const handleNext = (ansersItem: any, array: any) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    for (let i = 0; i < array.length; i++) {
      if (ansersItem.answer == array[i].answer) {
        array[i].isSelected = true;
      } else if (ansersItem.questionID == array[i].questionID) {
        array[i].isSelected = false;
        setFilteredAnswersArray([...array]);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onGetRiskProfileQuesAndAns = () => {
    getRiskProfileQuesAndAnsapi("/api/auth/riskProfileQues&Ans", "GET").then(
      (res) => {
        setQuestions(res.questions);
        setAnswers(res.answers);
        setFilteredAnswersArray(res.answers);
      }
    );
  };

  const handleSubmit = () => {
    let tempArray = filteredAnswersArray.filter(
      (c: any) => c.isSelected == true
    );

    var finalData: any = [];

    for (let i = 0; i < tempArray.length; i++) {
      finalData.push({
        userID: userData._id,
        answer: tempArray[i].answer,
        answerID: tempArray[i].answerID,
        score: tempArray[i].score,
        question: tempArray[i].question,
        isSelected: tempArray[i].isSelected,
        questionID: tempArray[i].questionID,
      });
    }

    postRiskProfileQuestionsapi(
      finalData,
      "/api/auth/generateRiskProfile",
      "POST"
    ).then((res) => {
      setIsQuestionShow(false);
      setRiskProfileResult(res.data);

      setTimeout(() => onRedirectToRiskProfileResult(res.data), 5000);
    });
  };

  const onRedirectToRiskProfileResult = (data: any) => {
    router.replace({
      pathname: "/postLogin/riskProfile/riskProfileResult",
      query: {
        riskprofile: data.riskprofile,
        score: data.score,
      },
    });
  };

  const RiskProfileProcressingAmimation = {
    loop: true,
    autoplay: true,
    animationData: RiskprofileProcessing,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    onGetRiskProfileQuesAndAns();

    if (typeof window !== "undefined") {
      var storedUser: any = localStorage.getItem("userData");
      var userObject: any = JSON.parse(storedUser);
      setUserData(userObject);
    }
  }, []);

  return (
    <>
      {isQuestionShow ? (
        <LayoutWithBackheader showHeader={true} pageTitle="Risk Profile">
          <Box px="1rem" pt="5.5rem" pb="50%">
            <Stepper activeStep={activeStep} orientation="vertical">
              {questions.map((step: any, index: any) => (
                <Step key={index}>
                  <StepLabel
                    sx={{
                      "& .MuiSvgIcon-root.Mui-completed": {
                        color: "#9DFFCE",
                        fontSize: "1.5rem",
                      },
                      "& .MuiSvgIcon-root.Mui-active": {
                        color: "transparent",
                        fontSize: "1.5rem",
                        border: "2px solid #9DFFCE",
                        borderRadius: "50%",
                      },
                    }}
                  >
                    <Typography variant="h1" color="#fff">
                      {step}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Stack direction="column" spacing={5} pt="1rem">
                      {filteredAnswersArray.map(
                        (ansersItem: any, ansersIndex: any, array: any) =>
                          ansersItem.questionID == index + 1 && (
                            <Stack
                              key={ansersIndex}
                              direction="row"
                              spacing={2}
                              onClick={() => handleNext(ansersItem, array)}
                              sx={{
                                cursor:"pointer"
                              }}
                            >
                              {ansersItem.isSelected ? (
                                <Image
                                  src={CheckIcon}
                                  height={20}
                                  width={20}
                                  alt="CheckIcon"
                                />
                              ) : (
                                <Image
                                  src={UncheckIcon}
                                  height={20}
                                  width={20}
                                  alt="UncheckIcon"
                                />
                              )}
                              <Typography variant="h2" color="#fff">
                                {ansersItem.answer}
                              </Typography>
                            </Stack>
                          )
                      )}
                    </Stack>

                    <Box sx={{ mb: 2, textAlign: "right" }}>
                      <Button
                        variant="contained"
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{
                          mt: 5,
                          borderRadius: "2rem",
                          p: "0rem 1.5rem",
                        }}
                      >
                        Back
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === questions.length && (
              <BottomStay>
                <Stack direction="row" spacing={3}>
                  <Button
                    fullWidth={true}
                    variant="outlined"
                    onClick={handleReset}
                    sx={{
                      color: "#fff",
                      fontSize: "1rem",
                      textTransform: "capitalize",
                      width: "50%",
                    }}
                  >
                    Reset
                  </Button>

                  <Button
                    fullWidth={true}
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ width: "50%" }}
                  >
                    Submit
                  </Button>
                </Stack>
              </BottomStay>
            )}
          </Box>
        </LayoutWithBackheader>
      ) : (
        <LayoutWithBackheader showHeader={false} pageTitle="Watchlist">
          <Box px="1rem" pt="5rem" pb="50%">
            <Lottie
              options={RiskProfileProcressingAmimation}
              height={290}
              width={320}
            />

            <Typography
              textTransform="capitalize"
              textAlign="center"
              fontSize="1.3rem"
              variant="h1"
              pt="15%"
            >
              Please Wait while we generate your risk profile
            </Typography>
          </Box>
        </LayoutWithBackheader>
      )}
    </>
  );
}
