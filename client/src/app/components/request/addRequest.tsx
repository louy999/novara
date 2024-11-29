"use client";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import axios from "axios";
import { deleteCookie } from "cookies-next";

interface TokenData {
  id: number;
  name: string;
  image_profile?: string;
}

interface AddRequestProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tokenData?: any; // Make tokenData optional
}

const AddRequest: React.FC<AddRequestProps> = ({ tokenData }) => {
  const [userData, setUserData] = useState<TokenData | null>(null);
  const [requestText, setRequestText] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  useEffect(() => {
    const fetchDataFromToken = async () => {
      const res = await axios.get(`${process.env.local}/users/${tokenData.id}`);
      setUserData(res.data.data);
      if (!res.data.data) {
        deleteCookie("token");
      }
    };
    fetchDataFromToken();
  }, [tokenData]);

  const addRequestFetch = async () => {
    setLoading(true);
    if (userData) {
      if (requestText !== "") {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const res = await axios.post(`${process.env.local}/req`, {
            user_id: userData.id,
            request: requestText,
          });
          window.location.reload();
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    } else {
      setErr("please login");
      setTimeout(() => {
        setErr("");
      }, 5000);
    }
  };
  return (
    <div className="w-11/12 md:w-8/12 lg:w-6/12 border-primary p-4 rounded-lg bg-white shadow-2xl ">
      <div className="label">
        <span className="label-text flex justify-center items-center gap-2 text-2xl font-semibold">
          {userData ? (
            <>
              <span>
                {tokenData?.image_profile ? (
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <Image
                        alt="avatar"
                        src={`${process.env.img}/image/${tokenData?.image_profile}`}
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                ) : (
                  <CgProfile className="text-2xl" />
                )}
              </span>
              <span>{tokenData?.name}</span>
            </>
          ) : (
            <>
              <span>
                <CgProfile className="text-xl" />
              </span>
              <span>YOU</span>
            </>
          )}
        </span>
      </div>
      <textarea
        className="textarea textarea-primary w-full resize-none "
        placeholder="Bio"
        onChange={(e) => setRequestText(e.target.value)}
        value={requestText}
      ></textarea>
      <div className="label flex justify-end">
        {err && <div className="text-error">{err}</div>}
        <span className="label-text-alt">
          {loading ? (
            <button className="btn btn-info text-white w-32">
              <span className="loading loading-dots loading-md "></span>
            </button>
          ) : (
            <button
              className="btn btn-info text-white w-32"
              onClick={addRequestFetch}
            >
              Add Request
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export default AddRequest;
