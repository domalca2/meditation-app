import { Stack } from "expo-router";
import React from "react";
import tutorial from '../../../tutorial'; // Importamos los datos del tutorial

const TutorialViewerLayout = () => {
  // Función para reproducir audio
  const playAudio = (audio) => {
    stopAllAudios();  // Detiene otros audios que están en reproducción
    audio.play();
  };

  // Función para detener el audio
  const stopAudio = (audio) => {
    audio.pause();
    audio.currentTime = 0;  // Reinicia al inicio
  };

  // Función para detener todos los audios
  const stopAllAudios = () => {
    tutorial.forEach((item) => stopAudio(item.audio));
  };

  // Función para saltar al final
  const skipToEnd = () => {
    stopAllAudios(); // Detiene todos los audios
    window.location.href = "/tutorial"; // Redirige a la página principal del tutorial
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_bottom",
      }}
    >
      <div className="tutorial-sections" style={{ position: "relative" }}>
        {tutorial.map((item, index) => (
          <div key={index} className="tutorial-section">
            <h2>{item.title}</h2>
            <button onClick={() => playAudio(item.audio)}>Reproducir</button>
            <button onClick={() => stopAudio(item.audio)}>Detener</button>
          </div>
        ))}
        {/* Botón para saltar al final */}
        <button className="skip-button" onClick={skipToEnd}>
          Prescocitar cely tutorial
        </button>
      </div>
    </Stack>
  );
};

export default TutorialViewerLayout;
