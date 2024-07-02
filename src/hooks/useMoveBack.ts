import { NavigateFunction, useNavigate } from "react-router-dom";

export function useMoveBack(): NavigateFunction {
  const navigate = useNavigate();

  return () => navigate(-1);
}
