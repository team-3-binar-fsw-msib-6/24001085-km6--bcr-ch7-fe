import { useTheme } from "@/utils/ThemeProvider";
import {
  ResponsiveContainer,
  BarChart as BarGraph,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { LoaderCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setVotes } from "@/redux/reducers/vote";
import { Link } from "react-router-dom";

const socket = io(import.meta.env.VITE_BACKEND_API);
const BarChart = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const { votes } = useSelector((state) => state.vote);

  useEffect(() => {
    socket.on("connect", () => {});

    socket.on("update", (votes) => {
      if (!votes) {
        dispatch(setVotes([]));
      }
      setData(votes);
      dispatch(setVotes(votes));
    });

    // socket.on("connect_error", () => {
    //   console.error("socket connect error!");
    //   socket.close();
    // });

    // return () => {
    //   socket.close();
    // };
  }, [dispatch]);

  return (
    <>
      {console.log(votes)}
      {!data && <LoaderCircle className="h-12 w-12 animate-spin " />}
      {data && data.length > 0 && (
        <ResponsiveContainer width={"100%"} height={350}>
          {console.log(data)}

          <BarGraph data={data}>
            <XAxis
              dataKey="label"
              tickLine={false}
              stroke={theme == "light" ? "#888" : "#bababa"}
              fontSize={24}
            />
            <YAxis
              dataKey="votes"
              tickLine={false}
              stroke={theme == "light" ? "#888" : "#bababa"}
              fontSize={12}
            />
            <Tooltip
              contentStyle={
                theme == "light"
                  ? { background: "#bababa", border: 0 }
                  : { background: "#888", border: 0 }
              }
              itemStyle={
                theme == "light" ? { color: "#000" } : { color: "#fff" }
              }
            />
            <Bar
              dataKey="votes"
              radius={[4, 4, 0, 0]}
              fill={theme == "light" ? "#000" : "#fff"}
            />
          </BarGraph>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default BarChart;
