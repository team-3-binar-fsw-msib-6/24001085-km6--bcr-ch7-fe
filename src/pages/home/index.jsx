import { io } from "socket.io-client"
import { useMemo, useEffect, useState } from "react"
import { BarChart } from "@mui/x-charts"

const Home = () => {
  const [DT, setData] = useState([])
  const socket = useMemo(() => io("http://localhost:4000"))

  useEffect(() => {
    socket.on("update", (votes) => {
      const voteCounts = {
        1: 0,
        2: 0,
        3: 0,
      }

      votes.forEach((user) => {
        voteCounts[user.vote]++
      })

      setData([voteCounts[1], voteCounts[2], voteCounts[3]])
    })
  }, [])

  const updateVote = (payload) => {
    socket.emit("vote", {
      email: payload.email,
      voteNumber: payload.voteNumber,
    })
  }
  return (
    <>
      <h4>Voting</h4>
      <div className="bar">
        <BarChart
          width={800}
          height={350}
          series={[
            {
              data: DT.length > 0 ? DT : [0, 0, 0],
              id: "uvId",
              label: "Votes",
            },
          ]}
          xAxis={[
            {
              data: ["Capres 01", "Capres 02", "Capres 03"],
              scaleType: "band",
            },
          ]}
        />
      </div>
      <h3>
        <u>Cast Vote</u>
      </h3>
      <div className="btn">
        <button
          className="myButton"
          onClick={() => updateVote({ email: "testfromsocket", voteNumber: 1 })}
        >
          Capres 01
        </button>
        <button
          className="myButton"
          onClick={() => updateVote({ email: "testfromsocket", voteNumber: 2 })}
        >
          Capres 02
        </button>
        <button
          className="myButton"
          onClick={() => updateVote({ email: "testfromsocket", voteNumber: 3 })}
        >
          Capres 03
        </button>
      </div>
    </>
  )
}

export default Home
