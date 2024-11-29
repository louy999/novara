import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

interface MapReplayProps {
  id: number;
  user_id: number;
  date: string;
  replay: string;
  tokenData?: {
    access: boolean;
    id: number;
  };
}

const MapReplay: React.FC<MapReplayProps> = (props) => {
  const [dataUser, setDataUser] = useState<{
    name?: string;
    image_profile?: string;
    user_id: string;
  }>({
    name: undefined,
    image_profile: undefined,
    user_id: "", // Default value
  });
  const [replayText, setReplayText] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.local}/users/${props.user_id}`
        );
        setDataUser(res.data.data || {}); // Safely handle missing data
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [props.user_id]);

  const deleteRequest = async () => {
    try {
      await axios.delete(`${process.env.local}/replay/${props.id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const updateRequest = async () => {
    if (replayText !== "") {
      try {
        await axios.patch(`${process.env.local}/replay/${props.id}`, {
          replay: replayText,
          id: props.id,
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <article className="p-4 rounded-lg bg-white shadow-2xl mt-5">
      <div className="flex items-center mb-4">
        <Image
          width={200}
          height={200}
          className="w-10 h-10 me-4 rounded-full"
          src={`${process.env.img}/image/${dataUser?.image_profile}`}
          alt=""
        />
        <div className="font-medium">
          <p>
            {dataUser?.name}
            <time dateTime={props.date} className="block text-sm text-gray-500">
              {formatDistanceToNow(new Date(props.date), {
                addSuffix: true,
              })}
            </time>
          </p>
        </div>
      </div>
      <p className="mb-3 text-gray-500">
        {props.replay.split("\n").map((item, index) => (
          <span key={index}>
            {item}
            <br />
          </span>
        ))}
      </p>
      <aside>
        <div className="flex items-center mt-3">
          {props.tokenData?.access || props.tokenData?.id === props.user_id ? (
            <div className="btn btn-outline btn-error" onClick={deleteRequest}>
              delete
            </div>
          ) : null}
          {props.tokenData?.access || props.tokenData?.id === props.user_id ? (
            <>
              <button
                className="btn btn-info btn-md ml-2 btn-outline"
                onClick={() => {
                  const modal = document.getElementById(
                    `my_modal_${props.id}`
                  ) as HTMLDialogElement | null;
                  if (modal) modal.showModal();
                }}
              >
                Edit
              </button>
              <dialog id={`my_modal_${props.id}`} className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Edit Request:</h3>
                  <textarea
                    className="textarea textarea-primary w-full resize-none"
                    placeholder="Edit your reply"
                    onChange={(e) => setReplayText(e.target.value)}
                    value={replayText}
                  />
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
          ) : null}
        </div>
      </aside>
    </article>
  );
};

export default MapReplay;
