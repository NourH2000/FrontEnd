import GridViewIcon from "@mui/icons-material/GridView";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import PaidIcon from "@mui/icons-material/Paid";
import MedicationIcon from "@mui/icons-material/Medication";
import ArchiveIcon from "@mui/icons-material/Archive";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";
import SettingsIcon from "@mui/icons-material/Settings";
export const items = [
  { icon: "", path: "", type: "", label: "Overview" },
  {
    icon: <GridViewIcon />,
    path: "/overview",
    type: "item",
    label: "Overview",
  },

  {
    icon: <PaidIcon />,
    path: "/overview/ppa/oneTraining",
    type: "item",
    label: "Prix ppa",
  },
  {
    icon: <MedicationIcon />,
    path: "/overview",
    type: "item",
    label: "Quantitée de medicaments",
  },
  { icon: "", patéh: "", type: "", label: "History" },
  {
    icon: <ArchiveIcon />,
    path: "/history/ppa",
    type: "item",
    label: "Prix ppa",
  },
  {
    icon: <ArchiveIcon />,
    path: "/history/quantity",
    type: "item",
    label: "Quantitée de medicaments",
  },
  { icon: "", path: "/historique", type: "", label: "Other" },
  {
    icon: <EqualizerRoundedIcon />,
    path: "",
    type: "item",
    label: "Data analytique",
  },
  //{ icon: "", path: "/historique", type: "", label: "devider" },
  {
    icon: <SettingsIcon />,
    path: "/settings",
    type: "item",
    label: "Parametre",
  },
];
