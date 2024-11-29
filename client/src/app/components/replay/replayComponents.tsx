/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import MapReplay from "./MapReplay";
interface ReplayData {
  id: number;
  user_id: number;
  date: string;
  request: string;
}
interface TokenDataType {
  id: string | number;
  access: boolean;
}
const ReplayComponents: React.FC<{
  dataUser: ReplayData;
  tokenData: TokenDataType;
}> = ({ dataUser, tokenData }) => {
  const [dataReplay, setDataReplay] = useState<any[]>([]);

  useEffect(() => {
    const fetchReplayData = async () => {
      try {
        const res = await axios.get(
          `${process.env.local}/replay/req/${dataUser.id}`
        );
        setDataReplay(res.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReplayData();
  }, [dataUser]);

  return (
    <div className="w-11/12">
      {dataReplay.length > 0 ? (
        dataReplay.map((replay, index) => (
          <MapReplay key={index} {...replay} tokenData={tokenData} />
        ))
      ) : (
        <div>No Replay</div>
      )}
    </div>
  );
};

export default ReplayComponents;
