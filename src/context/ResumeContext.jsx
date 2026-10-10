import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleResumeData, sampleJobDescription, mockDashboardHistory, sampleAnalysisStages } from '../data/mockData';
import confetti from 'canvas-confetti';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [currentFile, setCurrentFile] = useState({
    name: sampleResumeData.fileName,
    size: sampleResumeData.fileSize,
    type: sampleResumeData.fileType,
    isSample: true
  });
  
  const [jobDescription, setJobDescription] = useState(sampleJobDescription);
  const [analysisResult, setAnalysisResult] = useState(sampleResumeData);
  const [history, setHistory] = useState(mockDashboardHistory);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStageText, setCurrentStageText] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [currentUser, setCurrentUser] = useState({
    name: "Alex Morgan",
    email: "alex.morgan@email.com",
    role: "Full Stack Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
  });

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#7C3AED', '#2563EB', '#10B981']
      });
    } catch (e) {
      // Ignore if confetti canvas not available
    }
  };

  // Run simulated AI analysis
  const runAnalysis = async (fileObj, customJd) => {
    setIsAnalyzing(true);
    setAnalysisProgress(5);
    setCurrentStageText("Initializing AI model and parsing document...");

    const totalStages = sampleAnalysisStages.length;
    for (let i = 0; i < totalStages; i++) {
      const stage = sampleAnalysisStages[i];
      setCurrentStageText(stage.label);
      await new Promise(res => setTimeout(res, stage.duration));
      setAnalysisProgress(Math.round(((i + 1) / totalStages) * 95));
    }

    // Complete analysis
    setAnalysisProgress(100);
    setCurrentStageText("Finalizing report & calculating ATS matrix...");
    await new Promise(res => setTimeout(res, 400));

    // If file provided was custom, calculate dynamic variations
    const calculatedScore = fileObj?.name?.toLowerCase().includes("senior") ? 88 : 82;
    const jdMatch = customJd && customJd.length > 50 ? 87 : 79;

    const newResult = {
      ...sampleResumeData,
      fileName: fileObj?.name || sampleResumeData.fileName,
      fileSize: fileObj?.sizeFormatted || fileObj?.size || sampleResumeData.fileSize,
      fileType: fileObj?.type || sampleResumeData.fileType,
      uploadedAt: "Just now",
      scores: {
        ...sampleResumeData.scores,
        atsScore: calculatedScore,
        jobMatchScore: jdMatch
      }
    };

    setAnalysisResult(newResult);
    
    // Add to history
    const newHistoryItem = {
      id: "res-" + Date.now().toString().slice(-4),
      resumeName: fileObj?.name || "Uploaded_Resume.pdf",
      targetRole: customJd ? "Custom Job Analysis" : "Full Stack Engineer",
      date: "Just now",
      atsScore: calculatedScore,
      jobMatch: jdMatch,
      status: calculatedScore >= 80 ? "Optimized" : "Needs Polish",
      skillsCount: 18,
      fileSize: fileObj?.sizeFormatted || "1.2 MB"
    };

    setHistory(prev => [newHistoryItem, ...prev]);
    setIsAnalyzing(false);
    triggerCelebration();
    return newResult;
  };

  const loadSampleResume = () => {
    setCurrentFile({
      name: sampleResumeData.fileName,
      size: sampleResumeData.fileSize,
      type: sampleResumeData.fileType,
      isSample: true
    });
    setJobDescription(sampleJobDescription);
    setAnalysisResult(sampleResumeData);
  };

  const removeFile = () => {
    setCurrentFile(null);
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuth = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogin = (userData) => {
    setCurrentUser(userData || {
      name: "Alex Morgan",
      email: "alex.morgan@email.com",
      role: "Full Stack Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
    });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <ResumeContext.Provider value={{
      currentFile,
      setCurrentFile,
      jobDescription,
      setJobDescription,
      analysisResult,
      setAnalysisResult,
      history,
      setHistory,
      isAnalyzing,
      analysisProgress,
      currentStageText,
      runAnalysis,
      loadSampleResume,
      removeFile,
      isAuthModalOpen,
      authMode,
      openAuth,
      closeAuth,
      currentUser,
      handleLogin,
      handleLogout,
      triggerCelebration
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
