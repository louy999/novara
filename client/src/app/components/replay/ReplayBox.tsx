import React from "react";
import { useState } from "react";
import axios from "axios";
interface ReplayData {
  id: number;
  name: string;
  image_profile: string;
  access: boolean;
}
interface ReqData {
  id: number;
}
interface TokenDataType {
  id: string | number;
  access: boolean;
}
const ReplayBox: React.FC<{
  data: ReplayData;
  req: ReqData;
  tokenData: TokenDataType;
}> = ({ data, req, tokenData }) => {
  const [textReplay, setTextReplay] = useState("");
  const fetchAddReplay = async () => {
    const res = await axios.post(`${process.env.local}/replay`, {
      user_id: tokenData.id,
      request_id: req.id,
      replay: textReplay,
    });
    console.log(res.data.data);
  };

  return (
    <form className="w-11/12 mt-5 rounded-lg bg-white shadow-2xl">
      <label className="text-sm text-slate-400 pl-3 ">
        Replay to: ~ {data.name}
      </label>
      <label htmlFor="chat" className="sr-only  ">
        Your message
      </label>
      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 ">
        <textarea
          id="chat"
          onChange={(e) => setTextReplay(e.target.value)}
          value={textReplay}
          rows={1}
          className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your message..."
        ></textarea>
        <button
          onClick={fetchAddReplay}
          type="submit"
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100  "
        >
          <svg
            className="w-5 h-5 rotate-90 rtl:-rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
          </svg>
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  );
};

export default ReplayBox;
