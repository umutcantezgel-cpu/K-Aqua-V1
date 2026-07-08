/* eslint-disable react/jsx-no-literals */

"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { UploadCloud, CheckCircle2, Briefcase, GraduationCap, ChevronRight, ArrowLeft } from "lucide-react";

export default function ApplicationPortal() {
  const t = useTranslations("application");
  const jobs = t.raw("portal.jobs") as Array<{ id: string; title: string; type: string; desc: string }>;
  const stepsText = t.raw("portal.steps") as { step1: string; step2: string; step3: string };
  const formText = t.raw("portal.form") as Record<string, string>;

  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    startDate: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [useBuilder, setUseBuilder] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Builder State
  const [experience, setExperience] = useState([{ company: "", role: "", from: "", to: "" }]);
  const [education, setEducation] = useState([{ school: "", degree: "", from: "", to: "" }]);
  const [skills, setSkills] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUseBuilder(false);
    }
  };

  const submitApplication = async () => {
    setIsSubmitting(true);

    const submitData = new FormData();
    submitData.append("jobId", selectedJob || "init");
    submitData.append("firstName", formData.firstName);
    submitData.append("lastName", formData.lastName);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("startDate", formData.startDate);

    if (file) {
      submitData.append("cv", file);
    } else if (useBuilder) {
      submitData.append("experience", JSON.stringify(experience));
      submitData.append("education", JSON.stringify(education));
      submitData.append("skills", skills);
    }

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: submitData,
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert(formText.error);
      }
    } catch (error) {
      console.error(error);
      alert(formText.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-6">
        <Reveal>
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-heading font-extrabold text-h3 text-foreground mb-4">{formText.success}</h2>
          <p className="text-muted-foreground">{formText.successSub}</p>
        </Reveal>
      </div>
    );
  }

  if (!selectedJob) {
    return (
      <div className="py-20 max-w-[1200px] mx-auto px-6" data-screen-label="job-board">
        <Reveal>
          <SectionHead
            eyebrow={t("portal.eyebrow")}
            title={<>{t("portal.title")} <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">{t("portal.titleGrad")}</span></>}
            lead={t("portal.lead")}
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {jobs.map((job, idx) => (
            <Reveal key={job.id} delay={idx * 0.1}>
              <Card 
                className="h-full flex flex-col justify-between p-6 cursor-pointer hover:border-primary transition-all hover:shadow-glow group"
                onClick={() => {
                  setSelectedJob(job.id);
                  setCurrentStep(1);
                }}
              >
                <div>
                  <div className="inline-block px-3 py-1 bg-background-subtle rounded-full text-tiny font-bold text-muted-foreground mb-4">
                    {job.type}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-small text-muted-foreground">{job.desc}</p>
                </div>
                <div className="mt-6 flex items-center text-primary font-bold text-sm">
                  {formText.next} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 max-w-[800px] mx-auto px-6" data-screen-label="application-flow">
      <Reveal>
        <button 
          onClick={() => setSelectedJob(null)}
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm font-bold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {formText.back}
        </button>

        <div className="mb-12">
          <h2 className="font-heading font-extrabold text-h3 text-foreground mb-2">
            {jobs.find((j) => j.id === selectedJob)?.title}
          </h2>
          <div className="flex gap-2">
            <div className="w-1/3 h-1 bg-primary rounded-full transition-all" style={{ opacity: currentStep >= 1 ? 1 : 0.2 }} />
            <div className="w-1/3 h-1 bg-primary rounded-full transition-all" style={{ opacity: currentStep >= 2 ? 1 : 0.2 }} />
            <div className="w-1/3 h-1 bg-primary rounded-full transition-all" style={{ opacity: currentStep >= 3 ? 1 : 0.2 }} />
          </div>
          <div className="flex justify-between mt-2 text-tiny font-bold text-muted-foreground">
            <span className={currentStep >= 1 ? "text-primary" : ""}>{stepsText.step1}</span>
            <span className={currentStep >= 2 ? "text-primary" : ""}>{stepsText.step2}</span>
            <span className={currentStep >= 3 ? "text-primary" : ""}>{stepsText.step3}</span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <Card className="p-6 sm:p-8">
          {/* STEP 1: Personal Data */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-small font-bold text-foreground">{formText.firstName}*</span>
                  <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="h-12 px-4 rounded-lg bg-background-subtle border border-card-border focus:border-primary focus:outline-none transition-colors" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-small font-bold text-foreground">{formText.lastName}*</span>
                  <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="h-12 px-4 rounded-lg bg-background-subtle border border-card-border focus:border-primary focus:outline-none transition-colors" />
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-small font-bold text-foreground">{formText.email}*</span>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="h-12 px-4 rounded-lg bg-background-subtle border border-card-border focus:border-primary focus:outline-none transition-colors" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-small font-bold text-foreground">{formText.phone}</span>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="h-12 px-4 rounded-lg bg-background-subtle border border-card-border focus:border-primary focus:outline-none transition-colors" />
                </label>
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-small font-bold text-foreground">{formText.startDate}</span>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="h-12 px-4 rounded-lg bg-background-subtle border border-card-border focus:border-primary focus:outline-none transition-colors" />
              </label>

              <div className="flex justify-end mt-4">
                <Button 
                  onClick={() => {
                    if (formData.firstName && formData.lastName && formData.email) setCurrentStep(2);
                    else alert("Please fill in required fields (*)");
                  }}
                >
                  {formText.next} <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: CV & Upload */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-8">
              {!useBuilder ? (
                <>
                  <div 
                    className="border-2 border-dashed border-card-border hover:border-primary rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-background-subtle"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                    <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
                    <h4 className="font-heading font-bold text-foreground text-lg mb-2">{file ? file.name : formText.uploadTitle}</h4>
                    <p className="text-small text-muted-foreground max-w-sm">{file ? 'Click to replace file' : formText.uploadDesc}</p>
                  </div>
                  
                  <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-card-border"></div>
                    <span className="flex-shrink-0 mx-4 text-muted-foreground text-small font-bold uppercase">OR</span>
                    <div className="flex-grow border-t border-card-border"></div>
                  </div>

                  <div className="text-center">
                    <h4 className="font-heading font-bold text-foreground text-lg mb-2">{formText.builderTitle}</h4>
                    <p className="text-small text-muted-foreground mb-6">{formText.builderDesc}</p>
                    <Button variant="secondary" onClick={() => setUseBuilder(true)}>
                      {formText.builderTitle}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-8">
                  <div className="flex justify-between items-center">
                    <h3 className="font-heading font-bold text-lg text-foreground flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" /> {formText.workExp}
                    </h3>
                    <button onClick={() => setUseBuilder(false)} className="text-tiny text-primary hover:underline">
                      Cancel Builder
                    </button>
                  </div>
                  
                  {experience.map((exp, i) => (
                    <div key={i} className="p-4 rounded-lg bg-background-subtle border border-card-border flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input placeholder={formText.company} value={exp.company} onChange={(e) => { const newExp = [...experience]; if(newExp[i]) newExp[i].company = e.target.value; setExperience(newExp); }} className="h-10 px-3 rounded-md bg-background border border-card-border text-sm" />
                        <input placeholder={formText.role} value={exp.role} onChange={(e) => { const newExp = [...experience]; if(newExp[i]) newExp[i].role = e.target.value; setExperience(newExp); }} className="h-10 px-3 rounded-md bg-background border border-card-border text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input placeholder={formText.from} value={exp.from} onChange={(e) => { const newExp = [...experience]; if(newExp[i]) newExp[i].from = e.target.value; setExperience(newExp); }} className="h-10 px-3 rounded-md bg-background border border-card-border text-sm" />
                        <input placeholder={formText.to} value={exp.to} onChange={(e) => { const newExp = [...experience]; if(newExp[i]) newExp[i].to = e.target.value; setExperience(newExp); }} className="h-10 px-3 rounded-md bg-background border border-card-border text-sm" />
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setExperience([...experience, { company: "", role: "", from: "", to: "" }])} className="text-sm font-bold text-primary self-start hover:underline">+ Add more</button>

                  <h3 className="font-heading font-bold text-lg text-foreground flex items-center gap-2 mt-4">
                    <GraduationCap className="w-5 h-5 text-primary" /> {formText.education}
                  </h3>
                  
                  {education.map((edu, i) => (
                    <div key={i} className="p-4 rounded-lg bg-background-subtle border border-card-border flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input placeholder={formText.school} value={edu.school} onChange={(e) => { const newEdu = [...education]; if(newEdu[i]) newEdu[i].school = e.target.value; setEducation(newEdu); }} className="h-10 px-3 rounded-md bg-background border border-card-border text-sm" />
                        <input placeholder={formText.degree} value={edu.degree} onChange={(e) => { const newEdu = [...education]; if(newEdu[i]) newEdu[i].degree = e.target.value; setEducation(newEdu); }} className="h-10 px-3 rounded-md bg-background border border-card-border text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input placeholder={formText.from} value={edu.from} onChange={(e) => { const newEdu = [...education]; if(newEdu[i]) newEdu[i].from = e.target.value; setEducation(newEdu); }} className="h-10 px-3 rounded-md bg-background border border-card-border text-sm" />
                        <input placeholder={formText.to} value={edu.to} onChange={(e) => { const newEdu = [...education]; if(newEdu[i]) newEdu[i].to = e.target.value; setEducation(newEdu); }} className="h-10 px-3 rounded-md bg-background border border-card-border text-sm" />
                      </div>
                    </div>
                  ))}

                  <label className="flex flex-col gap-2 mt-4">
                    <span className="text-small font-bold text-foreground">{formText.skills}</span>
                    <textarea value={skills} onChange={(e) => setSkills(e.target.value)} className="min-h-24 p-3 rounded-md bg-background border border-card-border text-sm resize-y" />
                  </label>
                </div>
              )}

              <div className="flex justify-between mt-4">
                <Button variant="secondary" onClick={() => setCurrentStep(1)}>{formText.back}</Button>
                <Button 
                  onClick={() => {
                    if (file || useBuilder) setCurrentStep(3);
                    else alert("Please upload a file or build your CV");
                  }}
                >
                  {formText.next} <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Submit */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-6">
              <div className="bg-background-subtle rounded-xl p-6 border border-card-border">
                <h4 className="font-heading font-bold text-foreground mb-4">Review Application</h4>
                <div className="grid grid-cols-2 gap-y-4 text-small">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-bold text-foreground">{formData.firstName} {formData.lastName}</span>
                  
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-bold text-foreground">{formData.email}</span>
                  
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-bold text-foreground">{formData.phone || '-'}</span>
                  
                  <span className="text-muted-foreground">CV Attached</span>
                  <span className="font-bold text-foreground text-primary flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> {file ? file.name : "Generated via Builder"}
                  </span>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <Button variant="secondary" onClick={() => setCurrentStep(2)} disabled={isSubmitting}>{formText.back}</Button>
                <Button onClick={submitApplication} disabled={isSubmitting}>
                  {isSubmitting ? formText.submitting : formText.submit}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </Reveal>
    </div>
  );
}
