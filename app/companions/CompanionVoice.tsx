/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Repeat2 } from "lucide-react";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import soundWave from "../../constants/soundwaves.json";
import { vapi } from "@/lib/vapi.sdk";

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
    const onMessage = () => {};
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
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex flex-col w-full h-[365px] flex-col gap-6 md:flex-row">
          {/* Main Content Area */}
          <Card className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-red-500 bg-white p-8 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center p-0 text-center">
              <div
                className="w-fit mx-auto mb-6 flex items-center justify-center rounded-2xl bg-purple-200 p-[50px]"
                style={{
                  backgroundColor: getSubjectColor(subject),
                }}
              >
                <div
                  className={cn(
                    "absolute transition-opacity duration-1000",
                    callStatus === CallStatus.FINISHED ||
                      callStatus === CallStatus.INACTIVE
                      ? "opacity-1000"
                      : "opacity-0",
                    callStatus === CallStatus.CONNECTING &&
                      "opacity-100 animate-pulse"
                  )}
                >
                  <Image
                    src={`/icons/${subject}.svg`}
                    alt="Flask icon"
                    width={64}
                    height={64}
                    className="h-16 w-16"
                  />
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

          {/* Sidebar */}
          <div className="flex w-full flex-col gap-6 md:w-80">
            {/* User Profile Card */}
            <Card className="flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-lg">
              <Image
                src={userImage}
                alt="Adrian"
                width={96}
                height={96}
                className="mb-4 h-24 w-24 rounded-full object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {userName}
              </h3>
            </Card>

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={toggleMic}
                className="flex h-24 flex-col items-center justify-center rounded-xl bg-white text-gray-800 shadow-lg hover:bg-gray-50"
              >
                {isMuted ? (
                  <MicOff className="mb-2 h-8 w-8" />
                ) : (
                  <Mic className="mb-2 h-8 w-8" />
                )}
                <span className="text-sm">
                  {isMuted ? "Turn On mic" : "Turn off mic"}
                </span>
              </Button>
              <Button className="flex h-24 flex-col items-center justify-center rounded-xl bg-white text-gray-800 shadow-lg hover:bg-gray-50">
                <Repeat2 className="mb-2 h-6 w-6" />
                <span className="text-sm">Repeat</span>
              </Button>
            </div>

            {/* End Lesson Button */}
            <Button
              onClick={
                callStatus === CallStatus.ACTIVE ||
                callStatus === CallStatus.CONNECTING
                  ? handleDisconnect
                  : handleCall
              }
              className={cn(
                "h-14 w-full rounded-xl bg-red-600 text-lg font-semibold text-white shadow-lg",
                callStatus === CallStatus.ACTIVE
                  ? "bg-[#D92C54]"
                  : "bg-[#54C392]",
                callStatus === CallStatus.CONNECTING && "bg-gray-200"
              )}
            >
              {callStatus === CallStatus.ACTIVE
                ? "End Session"
                : callStatus === CallStatus.CONNECTING
                ? "Connecting"
                : "Start Session"}
            </Button>
          </div>
        </div>
      </div>
      <section className="mt-5 transcript">
        <div className="transcript-message no-scrollbart">message</div>
        <div className="transcript-fade"></div>
      </section>
    </div>
  );
};

export default CompanionVoice;
