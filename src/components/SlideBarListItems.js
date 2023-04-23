import BookmarksIcon from "@mui/icons-material/Bookmarks";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CellTowerIcon from "@mui/icons-material/CellTower";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import SchoolIcon from "@mui/icons-material/School";
import { useSelector } from "react-redux";
import { useState } from "react";
// import { useSelector } from "react-redux";
export const SlideBarListItems = () => {
  // const userType = useSelector((state) => state.user.userType);
  const userType = "Doctor"
  // const [listItems, setListItems] = useState([]);
  let listItems = [];
  // const userType = user.userrole;

  if (userType === "Doctor") {
    listItems = [
      {
        id: "leftbar-listItem-1",
        listName: "Dashboard",
        icon: <BookmarksIcon />,
        link: "/doctorDashboard",
        name: "dashboard",
      },
      {
        id: "leftbar-listItem-2",
        listName: "Patients",
        link: "/user",
        // link: "/doctor/patient",
        icon: <BookmarksIcon />,
        hasExpand: false,
        name: "patients",
      },
      {
        id: "leftbar-listItem-3",
        listName: "All Medical Records",
        link: "/medicalRecord",
        icon: <BookmarksIcon />,
        hasExpand: false,
        name: "all_medical_records",
      },
      // {
      //   id: "leftbar-listItem-4",
      //   listName: "Manage Events",
      //   icon: <BookmarksIcon />,
      //   hasExpand: false,
      //   link: "/event",
      //   name: "view_events",
      // },
      // {
      //   id: "leftbar-listItem-5",
      //   listName: "Manage Advertisements",
      //   icon: <BookmarksIcon />,
      //   hasExpand: false,
      //   link: "/advertisement",
      //   name: "view_advertisement",
      // },
      // {
      //   id: "leftbar-listItem-6",
      //   listName: "Manage Posts",
      //   icon: <BookmarksIcon />,
      //   hasExpand: false,
      //   link: "/post",
      //   name: "view_posts",
      // },
    ];
  } else if (userType === "Patient") {
    listItems = [
      {
        id: "leftbar-listItem-1",
        listName: "Dashboard",
        icon: <BookmarksIcon />,
        link: "/patientDashboard",
        name: "dashboard",
      }
    ];
  } else if (userType === "Pharmacist") {
    listItems = [
      {
        id: "leftbar-listItem-1",
        listName: "Dashboard",
        icon: <BookmarksIcon />,
        link: "/pharmacistDashboard",
        name: "dashboard",
      }
    ];
  } else if (userType === "Admin") {
    listItems = [
      {
        id: "leftbar-listItem-1",
        listName: "Dashboard",
        icon: <BookmarksIcon />,
        link: "/dashboard",
        name: "dashboard",
      }
    ];
  }

  return listItems;
};
