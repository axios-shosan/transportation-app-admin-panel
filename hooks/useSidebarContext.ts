import { useContext } from "react";
import SidebarContext from "../context/SidebarContext";

export default function useSidebarContext() {
  return useContext(SidebarContext);
}
