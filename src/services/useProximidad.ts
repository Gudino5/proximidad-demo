import { useProximity } from "expo-proximity";

export function useProximidad() {
  const { proximityState } = useProximity();
  return proximityState; // true = cerca
}
