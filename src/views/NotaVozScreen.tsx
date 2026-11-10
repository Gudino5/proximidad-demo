import { View, Text, Button, StyleSheet } from 'react-native';
import { useNotaVozViewModel } from '../viewmodels/useNotaVozViewModel';

export default function NotaVozScreen() {
  const { cerca, disponible, verificarSensor, reproducir, pausar } = useNotaVozViewModel();

  if (disponible === false) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Este dispositivo no tiene sensor de proximidad.</Text>
        <Button title="Reintentar" onPress={verificarSensor} />
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Nota de voz educativa</Text>
      <Button title="Reproducir" onPress={reproducir} />
      <Button title="Pausar" onPress={pausar} />
      {cerca && <View style={styles.overlay} />}
    </View>
  );
}
const styles = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: 'center', padding: 24, gap: 12 },
  titulo: { fontSize: 22, textAlign: 'center' },
overlay: { ...StyleSheet.absoluteFill, backgroundColor: '#000' },
});