import { useEffect } from "react";
import About from "../../components/About/About";
import BePartner from "../../components/BePartner/BePartner";
import Ecellenece from "../../components/Excellence/Ecellenece";
import Header from "../../components/Header/Header";
import Opinion from "../../components/Opinion/Opinion";
import Partners from "../../components/Partners/Partners";
import Statistics from "../../components/Statistics/Statistics";
import { useDispatch, useSelector } from "react-redux";
import { getHome } from "../../Redux/homeSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.homeReducer);
  console.log("data", data);
  useEffect(() => {
    dispatch(getHome());
  }, []);

  return (
    <>
      <Header data={data?.slider} />
      <About data={data?.about_us} />
      <Statistics data={data?.statictics} />
      <Partners data={data?.our_partners} />
      <Ecellenece data={data?.what_makes_us_different} />
      <Opinion data={data?.feedback} />
      <BePartner data={data?.be_partner} />
    </>
  );
};

export default Home;
