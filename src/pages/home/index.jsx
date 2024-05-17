import BarChart from "@/components/BarChart";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-137px)] space-y-4">
      <p className="p-4 font-semibold">Votes Overview</p>
      <BarChart />
    </div>
  );
};

export default HomePage;
