import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  loop?: boolean;
}

export const useTypewriter = ({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  loop = true,
}: UseTypewriterOptions) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const type = useCallback(() => {
    const currentWord = words[currentWordIndex];
    
    if (isDeleting) {
      setCurrentText(currentWord.substring(0, currentText.length - 1));
    } else {
      setCurrentText(currentWord.substring(0, currentText.length + 1));
    }
    
    if (!isDeleting && currentText === currentWord) {
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => {
        const nextIndex = prev + 1;
        return loop ? nextIndex % words.length : Math.min(nextIndex, words.length - 1);
      });
    }
  }, [currentText, currentWordIndex, isDeleting, words, loop, pauseTime]);

  useEffect(() => {
    if (!isPaused && words.length > 0) {
      const speed = isDeleting ? deleteSpeed : typeSpeed;
      const timer = setTimeout(type, speed);
      return () => clearTimeout(timer);
    }
  }, [currentText, isDeleting, isPaused, type, typeSpeed, deleteSpeed, words.length]);

  return {
    text: currentText,
    isTyping: !isDeleting && currentText.length < words[currentWordIndex]?.length,
  };
};