import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import MainReplay from "../replay/MainReplay";

interface RequestData {
  id: number;
  user_id: number;
  date: string;
  request: string;
}
interface UserData {
  id: number;
  name: string;
  image_profile: string;
  access: boolean;
}
interface TokenDataType {
  id: string | number;
  access: boolean;
}

const MapRequest: React.FC<{ data: RequestData; tokenData: TokenDataType }> = ({
  data,
  tokenData,
}) => {
  const [dataUser, setDataUser] = useState<UserData | null>(null);
  const [requestText, setRequestText] = useState<string>("");
  const [dataReplay, setDataReplay] = useState([]);
  const [showReplay, setShowReplay] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.local}/users/${data.user_id}`
        );
        setDataUser(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [data]);
  const updateRequest = async () => {
    if (requestText !== "") {
      try {
        const res = await axios.patch(`${process.env.local}/req/${data.id}`, {
          request: requestText,
          id: data.id,
        });
        console.log(res.data.data);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const deleteRequest = async () => {
    try {
      const res = await axios.delete(`${process.env.local}/req/${data.id}`);
      console.log(res.data.data);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchReplayData = async () => {
      try {
        const res = await axios.get(
          `${process.env.local}/replay/req/${data.id}`
        );
        setDataReplay(res.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReplayData();
  }, [data]);
  console.log(dataReplay.length);

  return (
    <>
      <div className="w-11/12 md:w-8/12 lg:w-6/12 border-primary p-4 rounded-lg bg-white shadow-2xl">
        <article>
          <div className="flex items-center mb-4">
            <Image
              className="w-10 h-10 me-4 rounded-full"
              src={`${process.env.img}/image/${dataUser?.image_profile}`}
              alt=""
              width={200}
              height={200}
            />
            <div className="font-medium ">
              <p>
                {dataUser?.name}
                <time
                  dateTime={data.date}
                  className="block text-sm text-gray-500"
                >
                  {formatDistanceToNow(new Date(data.date), {
                    addSuffix: true,
                  })}
                </time>
              </p>
            </div>
          </div>
          <p className="mb-2 text-gray-500 break-words ">
            {" "}
            {data.request.split("\n").map((item, index) => (
              <span key={index}>
                {item}
                <br />
              </span>
            ))}
          </p>

          <aside>
            <div className="flex items-center mt-3">
              {tokenData?.access || tokenData?.id === data?.user_id ? (
                <div
                  className="btn btn-outline btn-error"
                  onClick={deleteRequest}
                >
                  delete
                </div>
              ) : (
                ""
              )}
              {tokenData?.access || tokenData?.id === data?.user_id ? (
                <>
                  <button
                    className="btn btn-info btn-md ml-2 btn-outline"
                    onClick={() => {
                      const modal = document.getElementById(
                        `$my_modal_{data.id}`
                      ) as HTMLDialogElement | null;
                      if (modal) {
                        modal.showModal();
                      } else {
                        console.error("Modal element not found");
                      }
                    }}
                  >
                    Edit
                  </button>
                  <dialog id={`my_modal_${data.id}`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Edit Request :</h3>
                      <textarea
                        className="textarea textarea-primary w-full resize-none"
                        placeholder="Bio"
                        onChange={(e) => setRequestText(e.target.value)}
                        value={requestText}
                      ></textarea>
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn" onClick={updateRequest}>
                            Done
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </>
              ) : (
                ""
              )}
              {tokenData ? (
                <div
                  onClick={() => setShowReplay((prev) => !prev)}
                  className="ps-4 text-sm font-medium text-blue-600 hover:underline cursor-pointer border-gray-200 ms-4 border-s md:mb-0"
                >
                  Replay ({dataReplay.length})
                </div>
              ) : (
                <>
                  <div
                    className="ps-4 text-sm font-medium text-blue-600 hover:underline cursor-pointer border-gray-200 ms-4 border-s md:mb-0"
                    onClick={() => {
                      const modal = document.getElementById(
                        "my_modal_2"
                      ) as HTMLDialogElement | null;
                      if (modal) {
                        modal.showModal(); // Safely call showModal() only if modal is not null
                      } else {
                        console.error("Modal element not found");
                      }
                    }}
                  >
                    Replay ({dataReplay.length})
                  </div>
                  <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Novara!</h3>
                      <p className="py-4">please Login...</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </>
              )}
            </div>
          </aside>
        </article>
      </div>
      {showReplay && dataUser && (
        <MainReplay data={dataUser} dataRequest={data} tokenData={tokenData} />
      )}
    </>
  );
};

export default MapRequest;
