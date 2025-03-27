// import { View, Text, Image } from 'react-native'
// import React from 'react'
// import { icons } from '@/constants/icons'

// const Call = () => {
//   return (
//     <View className='bg-primary flex-1 justify-center items-center'>
//       <Image source={icons.call} tintColor="#AB8BFF"></Image>
//       <Text className='text-light-300 mt-2'>Call</Text>
//     </View>
//   )
// }

// export default Call




import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";
import * as Speech from "expo-speech";

const SpeechConverter: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    // Initialize voice recognition listeners
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    // Cleanup listeners on component unmount
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      Speech.stop();
    };
  }, []);

  // Speech Recognition Handlers
  const onSpeechStart = (): void => {
    console.log("Speech recognition started");
  };

  const onSpeechEnd = (): void => {
    setIsListening(false);
    console.log("Speech recognition ended");
  };

  const onSpeechResults = (event: SpeechResultsEvent): void => {
    if (event.value && event.value.length > 0) {
      const recognizedText = event.value[0];
      setText(recognizedText);
      setResults(event.value);
    }
  };

  const onSpeechError = (error: SpeechErrorEvent): void => {
    console.error("Speech recognition error:", error);
    setIsListening(false);
    Alert.alert(
      "Speech Recognition Error",
      "Unable to recognize speech. Please try again."
    );
  };

  // Start/Stop Speech Recognition
  const toggleSpeechRecognition = async (): Promise<void> => {
    try {
      if (isListening) {
        await Voice.stop();
        setIsListening(false);
      } else {
        await Voice.start(Platform.OS === "ios" ? "en-US" : "en-US");
        setIsListening(true);
        setResults([]);
      }
    } catch (error) {
      console.error("Speech recognition toggle error:", error);
      Alert.alert(
        "Error",
        Platform.OS === "ios"
          ? "Please check microphone permissions in settings."
          : "Please check microphone permissions and ensure you are not in an emulator."
      );
    }
  };

  // Text-to-Speech Handler
  const speakText = (): void => {
    if (!text.trim()) {
      Alert.alert(
        "Empty Text",
        "Please enter or recognize some text to speak."
      );
      return;
    }

    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    Speech.speak(text, {
      onDone: () => setIsSpeaking(false),
      onError: (error) => {
        console.error("Speech error:", error);
        setIsSpeaking(false);
        Alert.alert("Speech Error", "Unable to speak the text.");
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-100 p-4"
    >
      <View className="flex-1">
        <Text className="text-2xl font-bold text-center mb-4 text-blue-800">
          Speech Converter
        </Text>

        <TextInput
          multiline
          placeholder="Enter text or tap the microphone to speak"
          value={text}
          onChangeText={setText}
          className="bg-white border border-gray-300 rounded-lg p-4 mb-4 min-h-[150px] text-base"
          textAlignVertical="top"
        />

        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            onPress={toggleSpeechRecognition}
            className={`flex-1 mr-2 p-4 rounded-lg items-center ${
              isListening ? "bg-red-500" : "bg-blue-600"
            }`}
          >
            <Text className="text-white font-bold">
              {isListening ? "Stop speaking" : "Speak"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={speakText}
            className={`flex-1 ml-2 p-4 rounded-lg items-center ${
              isSpeaking ? "bg-red-500" : "bg-blue-600"
            }`}
          >
            <Text className="text-white font-bold">
              {isSpeaking ? "Stop Reading" : "Read Text"}
            </Text>
          </TouchableOpacity>
        </View>

        {results.length > 0 && (
          <View className="bg-white border border-gray-300 rounded-lg p-4">
            <Text className="text-lg font-bold mb-2 text-gray-800">
              Alternative Results:
            </Text>
            <ScrollView>
              {results.map((result, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setText(result)}
                  className="py-2 border-b border-gray-200"
                >
                  <Text className="text-gray-700">{result}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default SpeechConverter;
