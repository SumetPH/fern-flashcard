export const tts = text => {
  let msg = new SpeechSynthesisUtterance();
  msg.voiceURI = "native";
  msg.volume = 1;
  msg.rate = 1;
  msg.pitch = 0.8;
  msg.text = text;
  msg.lang = "en-US";
  speechSynthesis.speak(msg);
};
