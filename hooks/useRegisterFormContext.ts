import RegisterFormCotext from "../context/RegisterFormContext";
import { useContext } from "react";

export default function useRegisterFormContext() {
    return useContext(RegisterFormCotext);
}