import Overview from "./components/Overview/Overview";
import Settings from "./components/Parameter/Settings";
import Login from "./components/LogIn/Login";
// quantity routes
import HistoryLayoutQ from "./components/Quantity/History/Layout";
import OneMedicationLayoutQ from "./components/Quantity/OneMedication/Layout";
import OneTrainingLayoutQ from "./components/Quantity/OneTraining/Layout";
import OneTrainingLayoutQSeeMore from "./components/Quantity/OneTraining/SeeMore/Layout";
import OneMedicationLayoutQSeeMore from "./components/Quantity/OneMedication/SeeMore/Layout";
import OverviewOneTrainingLayoutQ from "./components/Overview/QuantityOverview/OneTraining/Layout";
import OverviewOneTrainingLayoutQSeeMore from "./components/Overview/QuantityOverview/OneTraining/SeeMore/Layout";
import OverviewOneMedicationLayoutQ from "./components/Overview/QuantityOverview/OneMedication/Layout"
import OverviewOneMedicationLayoutQSeeMore from "./components/Overview/QuantityOverview/OneMedication/SeeMore/Layout";


// ppa routes
import HistoryLayoutP from "./components/Ppa/History/Layout";
import OneTrainingLayoutP from "./components/Ppa/OneTraining/Layout";
import OneMedicationLayoutP from "./components/Ppa/OneMedication/Layout";
import OneTrainingLayoutPSeeMore from "./components/Ppa/OneTraining/SeeMore/Layout";
import OneMedicationLayoutPSeeMore from "./components/Ppa/OneMedication/SeeMore/Layout";
import OverviewOneTrainingLayoutP from "./components/Overview/PpaOverview/OneTraining/Layout";
import OverviewOneTrainingLayoutPSeeMore from "./components/Overview/PpaOverview/OneTraining/SeeMore/Layout";
import OverviewOneMedicationLayoutP from "./components/Overview/PpaOverview/OneMedication/Layout";
import OverviewOneMedicationLayoutPSeeMore from "./components/Overview/PpaOverview/OneMedication/SeeMore/Layout";


export const Privateroutes = [
  { path: "/overview", component: Overview },
  { path: "/history/quantity", component: HistoryLayoutQ },
  { path: "/history/quantity/oneTraining", component: OneTrainingLayoutQ },
  {
    path: "/history/quantity/oneTraining/oneMedication",
    component: OneMedicationLayoutQ,
  },
  {
    path: "/history/quantity/oneTraining/SeeMore",
    component: OneTrainingLayoutQSeeMore,
  },

  { path: "/history/ppa", component: HistoryLayoutP },
  { path: "/history/ppa/oneTraining", component: OneTrainingLayoutP },
  {
    path: "/history/ppa/oneTraining/oneMedication",
    component: OneMedicationLayoutP,
  },
  {
    path: "/history/ppa/oneTraining/SeeMore",
    component: OneTrainingLayoutPSeeMore,
  },
  {
    path: "/history/quantity/oneMedication/SeeMore",
    component: OneMedicationLayoutQSeeMore,
  },
  {
    path: "/history/ppa/oneMedication/SeeMore",
    component: OneMedicationLayoutPSeeMore,
  },
  {
    path: "/overview/ppa/oneTraining",
    component: OverviewOneTrainingLayoutP,
  },
  {
    path: "/overview/ppa/oneMedication",
    component: OverviewOneMedicationLayoutP,
  },
  {
    path: "/overview/ppa/oneMedication/SeeMore",
    component: OverviewOneMedicationLayoutPSeeMore,
  },
  
  {
    path: "/overview/ppa/oneTraining/SeeMore",
    component: OverviewOneTrainingLayoutPSeeMore,
  },
  {
    path: "/overview/quantity/oneTraining",
    component: OverviewOneTrainingLayoutQ,
  },
  {
    path: "/overview/quantity/oneTraining/SeeMore",
    component: OverviewOneTrainingLayoutQSeeMore,
  },
  {
    path: "/overview/quantity/oneMedication",
    component: OverviewOneMedicationLayoutQ,
  },
  {
    path: "/overview/quantity/oneMedication/SeeMore",
    component: OverviewOneMedicationLayoutQSeeMore,
  },
  {
    path: "/settings",
    component: Settings,
  },
  
  
  //{path: "/login",component: Login}
];
export const Publicroutes = [  {path: "/login",component: Login}  ]
