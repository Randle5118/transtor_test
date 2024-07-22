"use client";

import "regenerator-runtime";

import "font-awesome/css/font-awesome.min.css";
import LanguageFromModal from "../components/LanguageFromModal";
import LanguageToModal from "../components/LanguageToModal";
import React, { useRef, useState } from "react";
import { record_from, record_to } from "../Actions";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { languageCodes } from "../languageCodes";

import main from "../utils/translate";

export default function Home() {
  const languages = [
    "Arabic",
    "Chinese",
    "English",
    "French",
    "Hindi",
    "Portuguese",
    "Russian",
    "Japanese",
    "Spanish",
    "German",
    "Korean",
    "Turkish",
    "Vietnamese",
    "Italian",
  ];

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const [selectedToLanguage, setSelectedToLanguage] = useState("ja-JP");
  const [selectedFromLanguage, setSelectedFromLanguage] = useState("en-US");
  const [targetToLanguage, setTargetToLanguage] = useState("Japanese");
  const [targetFromLanguage, setTargetFromLanguage] = useState("English");

  const handleSelectToLanguage = (language: string) => {
    setTargetToLanguage(language);
    var langCode = getLanguageCode(language) || "en-US";
    setSelectedToLanguage(langCode);
  };

  const getLanguageCode = (language: string): string | undefined => {
    const languageObj = languageCodes.find((lang) => lang.name === language);
    return languageObj ? languageObj.code : undefined;
  };

  const handleSelectFromLanguage = (language: string) => {
    setTargetFromLanguage(language);
    var langCode = getLanguageCode(language) || "en-US";
    setSelectedFromLanguage(langCode);
  };

  const progress1Ref = useRef<HTMLDivElement>(null);
  const textBox1Ref = useRef<HTMLDivElement>(null);
  const loading1Ref = useRef<HTMLDivElement>(null);
  const progress2Ref = useRef<HTMLDivElement>(null);
  const textBox2Ref = useRef<HTMLDivElement>(null);
  const loading2Ref = useRef<HTMLDivElement>(null);
  const from_text = useRef<HTMLDivElement>(null);
  const to_text = useRef<HTMLDivElement>(null);
  const countTime_to = useRef<HTMLButtonElement>(null);
  const countTime_From = useRef<HTMLButtonElement>(null);

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handleClickTo = () => {
    const progress2 = progress2Ref.current;
    const loading2 = loading2Ref.current;
    const textBox2 = textBox2Ref.current;
    const textBox1 = textBox1Ref.current;
    const countTime = countTime_to.current;

    startListening(progress2, textBox2, loading2, textBox1, countTime, targetFromLanguage);
  };

  const handleClickFrom = () => {
    const progress1 = progress1Ref.current;
    const textBox1 = textBox1Ref.current;
    const loading1 = loading1Ref.current;
    const textBox2 = textBox2Ref.current;
    const counTime = countTime_From.current;

    startListening(progress1, textBox1, loading1, textBox2, counTime, targetToLanguage);
  };

  const startListening = (
    progress: any,
    textbox: any,
    loading: any,
    res_textbox: any,
    countTime: any,
    targetLanguage: string
  ) => {
    var count: number = 19;

    if (progress.style.display == "block") {
      if (intervalId != null) {
        clearInterval(intervalId);
      }
      progress.style.display = "none";
      loading.style.display = "none";

      SpeechRecognition.stopListening();
      record_from(progress, textbox, loading);
      setTimeout(async () => {
        textbox.firstChild.innerHTML = from_text.current?.innerHTML;
        const res = await main(from_text.current?.innerHTML, targetLanguage);
        res_textbox.classList.remove("content-center");
        res_textbox.classList.remove("text-center");
        res_textbox.firstChild.innerHTML = res;
      }, 500);
      countTime.innerHTML = 20;
      count = 19;
    } else {
      const countDown = setInterval(() => {
        countTime.innerHTML = count--;
        if (count < 0) {
          clearInterval(countDown);
          progress.style.display = "none";
          loading.style.display = "none";

          SpeechRecognition.stopListening();
          record_from(progress, textbox, loading);
          setTimeout(async () => {
            textbox.firstChild.innerHTML = from_text.current?.innerHTML;
            const res = await main(
              from_text.current?.innerHTML,
              targetToLanguage
            );
            res_textbox.classList.remove("content-center");
            res_textbox.classList.remove("text-center");
            res_textbox.firstChild.innerHTML = res;
          }, 500);
          countTime.innerHTML = 20;
          count = 19;
        }
      }, 1000);

      setIntervalId(countDown);

      if (count < 0) {
        clearInterval(countDown);
        progress.style.display = "none";
        loading.style.display = "none";

        SpeechRecognition.stopListening();
        record_from(progress, textbox, loading);
        setTimeout(async () => {
          textbox.firstChild.innerHTML = from_text.current?.innerHTML;
          const res = await main(
            from_text.current?.innerHTML,
            targetToLanguage
          );
          res_textbox.classList.remove("content-center");
          res_textbox.classList.remove("text-center");
          res_textbox.firstChild.innerHTML = res;
        }, 500);
        countTime.innerHTML = 20;
        count = 19;
      } else {
        progress.style.display = "block";
        loading.style.display = "block";
        textbox.classList.remove("content-center");
        textbox.classList.remove("text-center");
        textbox.firstChild.innerHTML = "";

        resetTranscript();
        SpeechRecognition.startListening({
          continuous: true,
          language: selectedFromLanguage,
        });
      }
    }
  };

  return (
    <div>
      <main className="bg-white max-w-lg mx-auto p-4">
        <div
          className="p-4 my-2 rounded-lg shadow overflow-auto"
          style={{ transform: "rotate(180deg)" }}
        >
          <div
            className="w-full h-28 overflow-auto p-2 border border-gray-400 rounded-lg relative disabled:bg-gray-400"
            id="to-textbox"
            ref={textBox2Ref}
          >
            <p></p>
            <p ref={to_text} style={{ visibility: "hidden" }}></p>
            <div className="loading" id="loading-to" ref={loading2Ref}>
              <img src="audio.png" alt="" />
              <p className="text-center" id="loading_text_to">
                Speaking...
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <button
              className="btn-speak relative text-white overflow-hidden px-4 py-2 rounded-lg my-3 disabled:bg-slate-400"
              onClick={handleClickTo}
            >
              <div
                className="btn-progress"
                id="progress-bar-2"
                ref={progress2Ref}
              >
                <div className="progress-bar"></div>
                <p className="progress-percent-text">
                  Finish record (<span ref={countTime_to}>20</span>)
                </p>
              </div>
              <i className="fa fa-microphone mr-2"></i>
              Speak
            </button>
          </div>
        </div>

        <div className="mid-box my-9 py-6">
          <div className="flex justify-between mb-4">
            <h1 style={{ fontSize: "30px", fontFamily: "Vector" }}>
              Translator
            </h1>
            <a
              href="https://reurl.cc/qVlK43"
              target="_blank"
              className="content-center"
            >
              <i className="fa fa-envelope-o mr-2"></i>
              Contact
            </a>
          </div>
          <div className="flex justify-between">
            <LanguageFromModal
              languages={languages}
              onSelectLanguage={handleSelectFromLanguage}
            />
            <span className="text-gray-500" style={{ fontSize: "25px" }}>
              <img
                src="exchange.png"
                alt=""
                style={{ width: "25px", height: "25px", marginTop: "5px" }}
              />
            </span>
            <LanguageToModal
              languages={languages}
              onSelectLanguage={handleSelectToLanguage}
            />
          </div>
        </div>

        <div className="p-4 my-2 rounded-lg shadow">
          <div
            id="from-textbox"
            ref={textBox1Ref}
            className="w-full h-28 overflow-auto p-2 border border-gray-400 rounded-lg text-center content-center relative disabled:bg-gray-400"
          >
            <p>Press Speak button to speak</p>
            <p ref={from_text} style={{ visibility: "hidden" }}>
              {transcript}
            </p>
            <div className="loading" ref={loading1Ref} id="loading-from">
              <img
                src="audio.png"
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
              <p className="text-center" id="loading_text_from">
                Speaking...
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <button
              className="btn-speak text-white px-4 py-2 rounded-lg my-3 relative overflow-hidden"
              onClick={handleClickFrom}
            >
              <div
                className="btn-progress"
                id="progress-bar-1"
                ref={progress1Ref}
              >
                <div className="progress-bar"></div>
                <p className="progress-percent-text">
                  Finish record (<span ref={countTime_From}>20</span>)
                </p>
              </div>
              <i className="fa fa-microphone mr-2"></i>
              Speak
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
