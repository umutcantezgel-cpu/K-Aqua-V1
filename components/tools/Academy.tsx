"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { LocalVideo } from "@/components/ui/LocalVideo";
import { Flame, Award, ArrowRight } from "@/components/ui/icon";

// Mappings for Academy videos: local path and YouTube SEO fallback
const VIDEO_ASSETS = [
  { src: '/videos/socket-welding-hand.mp4', fallback: 'https://www.youtube.com/watch?v=d56p048YB2o&t=20s' },
  { src: '/videos/socket-welding-machine.mp4', fallback: 'https://www.youtube.com/watch?v=yD99teROIKc&t=59s' },
  { src: '/videos/electrofusion.mp4', fallback: 'https://www.youtube.com/watch?v=ob2wMFZgm0k' },
  { src: '/videos/butt-fusion.mp4', fallback: 'https://www.youtube.com/watch?v=Ws7-whaL-q8&t=43s' }
];

const CORRECT_ANSWERS = [1, 0, 1, 1, 1];
const SCORE_SEPARATOR = " / ";
const QUESTION_STEP_LABEL_SUFFIX = " / 5";
const OPTION_LETTERS = ["A", "B", "C"];
const ENSPACE = " ";

interface AcademyVideo {
  t: string;
  s: string;
}

interface AcademyQuestion {
  q: string;
  o: string[];
}

interface AcademyData {
  eyebrow: string;
  title1: string;
  titleGrad: string;
  lead: string;
  videos: AcademyVideo[];
  quizEyebrow: string;
  quizTitle: string;
  intro: string;
  start: string;
  qLabel: string;
  quiz: AcademyQuestion[];
  resPerfect: string;
  resGood: string;
  resLow: string;
  retry: string;
  titlePerfect: string;
  titleGood: string;
}

interface AcademyProps {
  data: AcademyData;
}

export function Academy({ data }: AcademyProps) {
  const [quizStep, setQuizStep] = useState<number>(-1); // -1 = intro, 0..4 = question, 5 = result
  const [answers, setAnswers] = useState<number[]>([]);
  const [chosenAnswer, setChosenAnswer] = useState<number | null>(null);

  const handleStartQuiz = () => {
    setQuizStep(0);
    setAnswers([]);
    setChosenAnswer(null);
  };

  const handleAnswerClick = (optIdx: number) => {
    if (chosenAnswer !== null) return;
    setChosenAnswer(optIdx);

    setTimeout(() => {
      setAnswers((prev) => [...prev, optIdx]);
      setChosenAnswer(null);
      setQuizStep((prev) => prev + 1);
    }, 850);
  };

  const handleRetryQuiz = () => {
    setQuizStep(-1);
    setAnswers([]);
    setChosenAnswer(null);
  };

  // Calculate results
  const correctCount = answers.reduce((acc, ans, idx) => {
    return acc + (ans === CORRECT_ANSWERS[idx] ? 1 : 0);
  }, 0);

  const scoreText = `${correctCount}${SCORE_SEPARATOR}${CORRECT_ANSWERS.length}`;
  const stepLabelText = `${data.qLabel}${SCORE_SEPARATOR}${quizStep + 1}${QUESTION_STEP_LABEL_SUFFIX}`;

  const getResultTitle = () => {
    if (correctCount === 5) return data.titlePerfect;
    if (correctCount >= 3) return data.titleGood;
    return data.intro;
  };

  const getResultDescription = () => {
    if (correctCount === 5) return data.resPerfect;
    if (correctCount >= 3) return data.resGood;
    return data.resLow;
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-20 border-b border-card-border">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
          <Reveal>
            <div className="max-w-[760px] mb-12 flex flex-col gap-3 text-start items-start">
              <div className="mb-1">
                <span className="font-heading text-sm font-bold tracking-widest uppercase text-muted-foreground">{data.eyebrow}</span>
              </div>
              <h1 className="text-h1 font-heading font-extrabold text-foreground tracking-tight leading-[1.08] text-wrap-balance">
                {data.title1}{ENSPACE}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {data.titleGrad}
                </span>
              </h1>
              <p className="text-lead text-muted-foreground max-w-[62ch] mt-1 text-wrap-pretty">
                {data.lead}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 border-b border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.videos.map((video, idx) => {
              const asset = VIDEO_ASSETS[idx] || VIDEO_ASSETS[0];

              return (
                <Reveal key={video.t} delay={idx * 0.07}>
                  <div className="flex flex-col h-full">
                    <Card className="h-full flex flex-col gap-4 text-start p-6 hover:-translate-y-1 transition-all duration-200">
                      <LocalVideo
                        src={asset?.src || ""}
                        title={video.t}
                        description={video.s}
                        fallbackYoutubeUrl={asset?.fallback}
                      />
                      <div className="flex flex-col gap-1 mt-2">
                        <h3 className="font-heading font-bold text-base text-foreground leading-snug">
                          {video.t}
                        </h3>
                        <p className="text-tiny text-muted-foreground">
                          {video.s}
                        </p>
                      </div>
                    </Card>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-16 bg-background-subtle">
        <div className="max-w-[760px] mx-auto px-6">
          <Reveal>
            <SectionHead
              align="center"
              eyebrow={data.quizEyebrow}
              title={data.quizTitle}
            />
          </Reveal>

          <Reveal delay={0.12}>
            <Card className="min-h-[320px] flex flex-col justify-center p-5 sm:p-8 text-start bg-card border-card-border shadow-lift mt-8">
              {quizStep === -1 ? (
                /* Step -1: Intro */
                <div className="flex flex-col items-center text-center gap-6 max-w-md mx-auto py-6">
                  <div className="w-16 h-16 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0">
                    <Flame size={32} />
                  </div>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {data.intro}
                  </p>
                  <Button
                    onClick={handleStartQuiz}
                    icon={<ArrowRight className="w-4.5 h-4.5" />}
                    iconPosition="right"
                  >
                    {data.start}
                  </Button>
                </div>
              ) : quizStep < CORRECT_ANSWERS.length ? (
                /* Step 0..4: Questions */
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <span className="text-small font-bold text-primary">
                      {stepLabelText}
                    </span>
                    {/* Segmented Progress Bar */}
                    <div className="flex gap-1.5">
                      {CORRECT_ANSWERS.map((_, i) => (
                        <span
                          key={i}
                          className={clsx(
                            "h-1.5 w-6 rounded-full transition-colors duration-300",
                            i < quizStep
                              ? "bg-primary"
                              : i === quizStep
                              ? "bg-accent-strong"
                              : "bg-card-border"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-foreground">
                    {data.quiz[quizStep]?.q}
                  </h3>

                  <div className="flex flex-col gap-3">
                    {data.quiz[quizStep]?.o.map((option, optIdx) => {
                      const letter = OPTION_LETTERS[optIdx] || "";
                      const isAnswered = chosenAnswer !== null;
                      const isThisCorrect = isAnswered && optIdx === CORRECT_ANSWERS[quizStep];
                      const isThisChosenWrong = isAnswered && chosenAnswer === optIdx && chosenAnswer !== CORRECT_ANSWERS[quizStep];

                      return (
                        <button
                          key={option}
                          type="button"
                          disabled={isAnswered}
                          className={clsx(
                            "flex items-center gap-4 w-full min-h-[56px] px-6 py-4 rounded-xl border-1.5 transition-all duration-200 outline-none text-start text-body",
                            isAnswered
                              ? isThisCorrect
                                ? "border-green-600 bg-green-500/10 text-green-700 dark:text-green-400 font-bold"
                                : isThisChosenWrong
                                ? "border-red-600 bg-red-500/10 text-red-700 dark:text-red-400 font-bold"
                                : "border-card-border bg-card opacity-50 cursor-default"
                              : "border-card-border bg-card hover:border-primary hover:bg-primary-soft active:scale-[0.97] cursor-pointer"
                          )}
                          onClick={() => handleAnswerClick(optIdx)}
                        >
                          <span className="font-heading font-extrabold text-primary w-6 shrink-0">
                            {letter}
                          </span>
                          <span className="text-foreground">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Step 5: Results */
                <div className="flex flex-col items-center text-center gap-6 max-w-md mx-auto py-6">
                  <div
                    className={clsx(
                      "w-16 h-16 rounded-[14px] grid place-items-center shrink-0 transition-colors duration-300",
                      correctCount === 5
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary-soft text-primary"
                    )}
                  >
                    <Award size={32} />
                  </div>
                  <span className="text-display font-heading font-extrabold text-foreground">
                    {scoreText}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-heading font-bold text-xl text-primary">
                      {getResultTitle()}
                    </h3>
                    <p className="text-body text-muted-foreground leading-relaxed">
                      {getResultDescription()}
                    </p>
                  </div>
                  <Button variant="ghost" onClick={handleRetryQuiz}>
                    {data.retry}
                  </Button>
                </div>
              )}
            </Card>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
