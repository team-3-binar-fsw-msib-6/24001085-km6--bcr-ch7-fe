import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VoteDialog from "@/components/VoteDialog";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const data = [
  {
    name: "Pasangan nomor urut 1",
    label:
      "Calon Presiden - H. ANIES RASYID BASWEDAN, Ph.D & Calon Wakil Presiden - H. A. MUHAIMIN ISKANDAR, Dr. (H.C.) - NO 1",
    id: 1,
    image: "/pasangan_nomor_urut_1.png",
  },
  {
    name: "Pasangan nomor urut 2",
    label:
      "Calon Presiden - H. PRABOWO SUBIANTO & Calon Wakil Presiden - GIBRAN RAKABUMING RAKA - NO 2",
    id: 2,
    image: "/pasangan_nomor_urut_2.png",
  },
  {
    name: "Pasangan nomor urut 3",
    label:
      "Calon Presiden - H. GANJAR PRANOWO S.H., M.I.P & Calon Wakil Presiden - Prof. Dr. H. M. MAHFUD MD - NO 3",
    id: 3,
    image: "/pasangan_nomor_urut_3.png",
  },
];

const socket = io(import.meta.env.VITE_BACKEND_API);

const ElectionPage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user?.vote ? (
        <p className="font-semibold text-2xl text-center py-32">
          You have voted for Pasangan no {user?.vote.toString()}, therefore you
          cannot vote again!
        </p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-4 grid-cols-1">
          {data.map((d) => (
            <Card key={d.id} className="group">
              <img
                src={d.image}
                alt="choice_image"
                className="object-contain w-full h-[250px] scale-125"
              />
              <CardHeader className="flex flex-col space-y-4 justify-end">
                <CardTitle className="text-2xl font-semibold text-center">
                  {d.name}
                </CardTitle>
                <CardDescription className="text-center text-lg">
                  {d.label}
                </CardDescription>
                <VoteDialog id={d.id} socket={socket} />
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default ElectionPage;
