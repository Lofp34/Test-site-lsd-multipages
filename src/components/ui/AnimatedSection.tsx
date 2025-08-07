'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom-in' | 'bounce-in';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fade-in',
  delay = 0,
  duration = 0.6,
  className = '',
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getAnimationVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration,
          delay: delay / 1000,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    };

    switch (animation) {
      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration,
              delay: delay / 1000,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        };
      
      case 'slide-down':
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration,
              delay: delay / 1000,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        };
      
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: {
              duration,
              delay: delay / 1000,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        };
      
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: {
              duration,
              delay: delay / 1000,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        };
      
      case 'zoom-in':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
              duration,
              delay: delay / 1000,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        };
      
      case 'bounce-in':
        return {
          hidden: { opacity: 0, scale: 0.3 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
              duration,
              delay: delay / 1000,
              ease: [0.68, -0.55, 0.265, 1.55]
            }
          }
        };
      
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={getAnimationVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;