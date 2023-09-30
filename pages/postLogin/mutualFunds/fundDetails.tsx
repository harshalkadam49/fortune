import { getMutualDetailsapi } from "@/apifunctions/getMutualDetails";
import { getMutualMasterapi } from "@/apifunctions/getMutualMaster";
import LayoutWithBackheader from "@/components/layouts/withbackheader";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FundDetails() {
  const router = useRouter();
  const [mutualFundDetailsData, setMutualFundDetailsData] = useState<any>([]);

  const onGetMutualDetailsMaster = (fundName: any) => {
    getMutualDetailsapi(
      `/api/auth/mutualFundDetails?fundName=${fundName}`,
      "GET"
    ).then((res) => {
      if (!res.errorState) {
        setMutualFundDetailsData(res);
      }
    });
  };

  useEffect(() => {
    onGetMutualDetailsMaster(router.query.fundName);
  }, [router.query]);
  return (
    <LayoutWithBackheader showHeader={true} pageTitle="Mutual Details">
      <Box px="1rem" pt="5rem" pb="50%">
        
      </Box>
    </LayoutWithBackheader>
  );
}
