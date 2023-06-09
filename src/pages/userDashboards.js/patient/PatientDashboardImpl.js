import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";

import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import FeaturedInfo from "../../../components/featuredInfo/FeaturedInfo";
import Charts from "../../../components/charts/Charts";
import MainFeaturedPost from "./patientList/MainFeaturedPost";
import FeaturedPostLeft from "./featurePost/FeaturedPostLeft";
import FeaturedPostRight from "./featurePost/FeaturedPostRight";
import { removeNews } from "../../../redux/newsRedux";
import { getNews } from "../../../redux/newsApiCalls";
import Footer from "./footer/Footer";

export const PatientDashboardImpl = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const news = useSelector((state) => state.news.newsData);

  const [userStats, setUserStats] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [featuredFlag, setFeaturedFlag] = useState(true);
  const [trigger, setTrigger] = useState("s");
  const [deleteTrigger, setDeleteTrigger] = useState("s");

  const [other, setOther] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [event, setEvent] = useState(0);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [featuredData, setFeaturedData] = useState([]);
  
  const currentUser = useSelector((state) => state.user.currentUser);
  // const adminUsers = useSelector((state) => state.user.adminUsers);
  // const events = useSelector((state) => state.event.events);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeNews());
      const result = await getNews(dispatch, token);
      if (result) {
        console.log("Get user data success");
        setTrigger(trigger + "s");
        setLoading1(false);
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading1, deleteTrigger]);

  // useEffect(() => {
  //   const getCountInventoryData = async () => {
  //     const result1 = await getUsersDummy(dispatch, token);
  //     if (result1) {
  //       setOther(result1.length);
  //       console.log("Success");
  //       setLoading1(false);
  //     } else {
  //       console.log("Unsuccess");
  //     }
  //   };
  //   getCountInventoryData();
  // }, []);

  // useEffect(() => {
  //   const getCountInventoryData = async () => {
  //     const result2 = await getAdminUsersDummy(dispatch, token);
  //     if (result2) {
  //       console.log(result2.length);
  //       console.log(admin);
  //       setAdmin(result2.length);
  //       console.log("Success");
  //       setLoading2(false);
  //     } else {
  //       console.log("Unsuccess");
  //     }
  //   };
  //   getCountInventoryData();
  // }, []);

  // useEffect(() => {
  //   const getCountInventoryData = async () => {
  //     const result = await getEventDummy(dispatch, token);
  //     if (result) {
  //       setEvent(result.length);
  //       setLoading3(false);
  //       console.log("Success");
  //     } else {
  //       console.log("Unsuccess");
  //     }
  //   };
  //   getCountInventoryData();
  // }, []);

  let featureData = [
    {
      index: 1,
      title: "No of Users",
      // number: other,
      number: 15,
      // percentage: -1.4,
      isDowngrade: false,
      // text: "Compared to last month",
    },
    {
      index: 2,
      title: "No of Events",
      // number: event,
      number: 86,
      // percentage: +1.4,
      isDowngrade: true,
      // text: "Compared to last month",
    },
    {
      index: 3,
      title: "No of Admin Users",
      // number: admin,
      number: 89,
      // percentage: -1.4,
      isDowngrade: false,
      // text: "Compared to last month",
    },
  ];

  useEffect(() => {
    setNewsData(news);
    // let data = [
    //   { name: MONTHS[0], User: 15, Admin: 12 },
    //   { name: MONTHS[1], User: 20, Admin: 25 },
    //   { name: MONTHS[2], User: 65, Admin: 78 },
    //   { name: MONTHS[3], User: 45, Admin: 30 },
    //   { name: MONTHS[4], User: 100, Admin: 80 },
    //   { name: MONTHS[5], User: 74, Admin: 90 },
    // ];
    // setUserStats(data);

    // setFeaturedData(featureData);
  }, []);

  const mainFeaturedPost = {
    title: "Hiii..."+currentUser.firstName+" "+currentUser.lastName,
    description:
      "Practice stress management techniques, such as deep breathing, meditation, or yoga, to help reduce stress levels.",
    image: "https://res.cloudinary.com/midefulness/image/upload/v1681233608/medicare/3568984_rooxfm.jpg",
    imageText: "main image description",
    // linkText: "Continue reading…",
  };

  return (
    <div>
      {/* {loading1 && loading2 && loading3 ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <FeaturedInfo data={featureData} />
      )} */}

      {/* <FeaturedInfo data={featureData} />

      <Charts
        data={userStats}
        title="Users Analytics"
        grid
        dataKey1="User"
        dataKey2="Admin"
      /> */}
      <MainFeaturedPost post={mainFeaturedPost} />

      <Grid container spacing={4}>
        {newsData.map((post) =>
          // featuredFlag ? (
          //   <FeaturedPostLeft key={post._id} post={post} />
          // ) : (
          //   <FeaturedPostRight key={post._id} post={post} />
          // )
          <FeaturedPostLeft key={post._id} post={post} />
        )}
      </Grid>
      <Footer
        title="MediCare"
        description="Drink plenty of water throughout the day to help maintain proper hydration levels and support overall health!"
      />
    </div>
  );
};
