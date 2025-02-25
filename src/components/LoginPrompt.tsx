import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';
import AuthCard from './AuthCard';

export default function LoginPrompt(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4 relative overflow-hidden">
      <AnimatedBackground />
      <AuthCard navigate={navigate} />
    </div>
  );
}