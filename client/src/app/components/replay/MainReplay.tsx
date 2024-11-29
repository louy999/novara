import React from "react";
import ReplayBox from "./ReplayBox";
import ReplayComponents from "./replayComponents";

interface ReplayData {
  id: number;
  name: string;
  image_profile: string;
  access: boolean;
}
interface TokenDataType {
  id: string | number;
  access: boolean;
}
interface RequestData {
  id: number;
  user_id: number;
  date: string;
  request: string;
}
const MainReplay: React.FC<{
  data: ReplayData;
  dataRequest: RequestData;
  tokenData: TokenDataType;
}> = ({ data, dataRequest, tokenData }) => {
  return (
    <div className="w-11/12 md:w-8/12 lg:w-6/12  flex flex-wrap justify-end border-l-2 border-l-info">
      <ReplayComponents dataUser={dataRequest} tokenData={tokenData} />
      <ReplayBox data={data} req={dataRequest} tokenData={tokenData} />
    </div>
  );
};

export default MainReplay;
