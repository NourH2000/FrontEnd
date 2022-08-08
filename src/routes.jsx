import Overview from "./components/Overview/Overview";
import Settings from "./components/Parameter/Settings";
// quantity routes
import HistoryLayoutQ from "./components/Quantity/History/Layout";
import OneMedicationLayoutQ from "./components/Quantity/OneMedication/Layout";
import OneTrainingLayoutQ from "./components/Quantity/OneTraining/Layout";
import OneTrainingLayoutQSeeMore from "./components/Quantity/OneTraining/SeeMore/Layout";
import OneMedicationLayoutQSeeMore from "./components/Quantity/OneMedication/SeeMore/Layout";

// ppa routes
import HistoryLayoutP from "./components/Ppa/History/Layout";
import OneTrainingLayoutP from "./components/Ppa/OneTraining/Layout";
import OneMedicationLayoutP from "./components/Ppa/OneMedication/Layout";
import OneTrainingLayoutPSeeMore from "./components/Ppa/OneTraining/SeeMore/Layout";
import OneMedicationLayoutPSeeMore from "./components/Ppa/OneMedication/SeeMore/Layout";

export const routes = [
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
    path: "/settings",
    component: Settings,
  },
];
