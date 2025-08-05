/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Mic, MicOff } from "lucide-react";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import soundWave from "../../constants/soundanimation.json";
import { vapi } from "@/lib/vapi.sdk";
import { FaMicrophone } from "react-icons/fa";
import { MdMicOff } from "react-icons/md";
enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}
const CompanionVoice = ({
  companionId,
  subject,
  userName,
  userImage,
  style,
  voice,
  topic,
}: CompanionComponentProps) => {
  const lottieRef = useRef<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log("Error", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  const toggleMic = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };
    // @ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus?.FINISHED);
    vapi.stop();
  };

  return (
    <div className="flex justify-center gap-4">
      {/* left card */}
      <div className="w-[500px]">
        <div className="flex flex-col gap-4">
          {/* bot card */}
          <Card className="rounded-xl border-2 border-[#EBD6FB] !bg-white p-8">
            <CardContent className="flex flex-col items-center justify-center p-0 text-center">
              <div className="mb-6 flex items-center justify-center rounded-2xl">
                <div
                  className={cn(
                    "transition-opacity duration-1000",
                    callStatus === CallStatus.FINISHED ||
                      callStatus === CallStatus.INACTIVE
                      ? "opacity-1000"
                      : "opacity-0",
                    callStatus === CallStatus.CONNECTING &&
                      "opacity-100 animate-pulse"
                  )}
                >
                  <Bot className="text-primary_color" size={200} />
                </div>
                <div
                  className={cn(
                    "absolute transition-opacity duration-1000",
                    callStatus === CallStatus.ACTIVE
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                >
                  <Lottie
                    className="companion-lottie"
                    autoPlay={false}
                    lottieRef={lottieRef}
                    animationData={soundWave}
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
                {subject}
              </h2>
            </CardContent>
          </Card>
          {/* User Profile Card */}
          <Card className="relative w-full h-60 overflow-hidden rounded-xl p-6 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-0 flex flex-col items-center justify-center">
            {/* Background image layer */}
            <div
              className="absolute inset-0 bg-center bg-cover scale-110 filter blur-md z-0"
              style={{ backgroundImage: `url('${userImage}')` }}
              aria-hidden="true" // Decorative background
            />

            {/* Content layer */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <Image
                src={userImage || "/placeholder.svg"}
                alt={userName}
                width={100}
                height={100}
                className="mb-4 rounded-full object-cover border-2 border-white"
                priority
              />
              <h3 className="text-lg font-semibold text-white">{userName}</h3>
            </div>

            {/* Control Buttons */}
            {callStatus === CallStatus.ACTIVE && (
              <div className="absolute bottom-4 right-4 transform transition-all duration-500 ease-in-out cursor-pointer">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMic}
                  className="bg-black/60 hover:bg-black/80 text-white rounded-full w-12 h-12 flex items-center justify-center"
                  aria-label={
                    isMuted ? "Turn on microphone" : "Turn off microphone"
                  }
                >
                  {isMuted ? (
                    <MicOff className="w-6 h-6" />
                  ) : (
                    <Mic className="w-6 h-6" />
                  )}
                </Button>
              </div>
            )}
          </Card>

          <div className="">
            {" "}
            {/* End Lesson Button */}
            <Button
              onClick={
                callStatus === CallStatus.ACTIVE ||
                callStatus === CallStatus.CONNECTING
                  ? handleDisconnect
                  : handleCall
              }
              className={cn(
                "h-14 w-full rounded-lg bg-red-600 text-lg font-semibold text-white",
                callStatus === CallStatus.ACTIVE
                  ? "bg-[#D92C54]"
                  : "bg-[#54C392]",
                callStatus === CallStatus.CONNECTING &&
                  "bg-gray-200 text-gray-800"
              )}
            >
              {callStatus === CallStatus.ACTIVE
                ? "End Session"
                : callStatus === CallStatus.CONNECTING
                ? "Connecting"
                : "Start Session"}
            </Button>
          </div>
          {/* tool bar */}
          {/* <div className="flex w-full flex-col gap-6 "></div> */}
        </div>
      </div>
      {/* message */}
      {callStatus === CallStatus.ACTIVE && (
        <div className="bg-red-200 w-full h-[600px] transform transition-all duration-500 ease-in-out ">
          {/* messages */}
          <section className="transcript">
            <div className="transcript-message no-scrollbar">
              {messages?.map((message, index) => {
                if (message.role === "assistant") {
                  return (
                    <p key={index} className="text-sm">
                      {name.split(" ")[0].replace("/[.,]/g, ", " ")}
                      {message.content}
                    </p>
                  );
                } else {
                  return (
                    <p key={index} className="text-lg font-semibold">
                      {userName}: {message.content}
                    </p>
                  );
                }
              })}
            </div>
            {/* <div className="transcript-fade" /> */}
          </section>
        </div>
      )}
    </div>

    // <div className="flex items-center justify-between mx-auto h-[400px] gap-6">

    // </div>
  );
};

export default CompanionVoice;
