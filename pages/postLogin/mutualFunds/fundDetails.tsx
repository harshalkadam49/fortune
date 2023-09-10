import { getMutualMasterapi } from "@/apifunctions/getMutualMaster";
import LayoutWithBackheader from "@/components/layouts/withbackheader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FundDetails() {
  const router = useRouter();
  const [mutualFundDetailsData, setMutualFundDetailsData] = useState<any>([]);

  const onGetMutualDetailsMaster = (type: any, fundName: any) => {
    getMutualMasterapi(
      `/api/auth/mutualFundMaster?type=${type}&fundName=${fundName}`,
      "GET"
    ).then((res) => {
      if (!res.errorState) {
        setMutualFundDetailsData(res);
      }
    });
  };

  useEffect(() => {
    onGetMutualDetailsMaster(router.query.type, router.query.fundName);
  }, [router.query]);
  return (
    <LayoutWithBackheader showHeader={true} pageTitle="Mutual Details">
      Test
    </LayoutWithBackheader>
  );
}
