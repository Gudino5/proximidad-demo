import { useEffect, useState } from "react";
import {
  useAudioPlayer,
  useAudioPlayerStatus,
  setAudioModeAsync,
} from "expo-audio";
import { isAvailableAsync } from "expo-proximity";
import { useProximidad } from "../services/useProximidad";

export function useNotaVozViewModel() {
  const player = useAudioPlayer(require("../../assets/nota.mp3"));
  const estado = useAudioPlayerStatus(player);
  const cerca = useProximidad();

  const [disponible, setDisponible] = useState<boolean | null>(null);
  const verificarSensor = () => isAvailableAsync().then(setDisponible);
  useEffect(() => {
    verificarSensor();
  }, []);

  // cerca = auricular frontal, lejos = altavoz
  useEffect(() => {
    setAudioModeAsync({ shouldRouteThroughEarpiece: !!cerca });
  }, [cerca]);

  return {
    cerca: !!cerca,
    disponible,
    cargado: estado.isLoaded,
    duracion: estado.duration,
    verificarSensor,
    reproducir: () => {
      if (estado.duration > 0 && estado.currentTime >= estado.duration - 0.1) {
        player.seekTo(0);
      }
      player.play();
    },
    pausar: () => player.pause(),
  };
}
