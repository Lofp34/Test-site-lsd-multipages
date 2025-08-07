'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useFeedbackCollection } from '@/hooks/usePostDeploymentTracking';
import { 
  MessageSquare, 
  Star, 
  Send, 
  X, 
  ThumbsUp, 
  ThumbsDown,
  Bug,
  Lightbulb,
  Heart
} from 'lucide-react';

interface FeedbackWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  context?: {
    feature: string;
    action: string;
  };
  className?: string;
}

export default function FeedbackWidget({ 
  isOpen, 
  onClose, 
  context,
  className 
}: FeedbackWidgetProps) {
  const [step, setStep] = useState<'rating' | 'details' | 'success'>('rating');
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'markdown' | 'scroll' | 'controls' | 'performance' | 'accessibility' | 'general'>('general');
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature_request' | 'improvement' | 'praise' | 'complaint'>('improvement');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { collectFeedback } = useFeedbackCollection();

  if (!isOpen) return null;

  const handleRatingSelect = (selectedRating: number) => {
    setRating(selectedRating);
    setStep('details');
    
    // Auto-select feedback type based on rating
    if (selectedRating <= 2) {
      setFeedbackType('complaint');
    } else if (selectedRating === 3) {
      setFeedbackType('improvement');
    } else if (selectedRating === 4) {
      setFeedbackType('improvement');
    } else {
      setFeedbackType('praise');
    }
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      await collectFeedback(rating, message, category, feedbackType);
      setStep('success');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('rating');
    setRating(0);
    setMessage('');
    setCategory('general');
    setFeedbackType('improvement');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className={`w-full max-w-md ${className}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Share Your Feedback
            </CardTitle>
            <CardDescription>
              Help us improve the chat experience
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          {step === 'rating' && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  How would you rate your experience with the chat enhancements?
                </p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingSelect(star)}
                      className="p-1 hover:scale-110 transition-transform"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 hover:text-yellow-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleRatingSelect(1)}
                  className="flex items-center gap-2"
                >
                  <ThumbsDown className="h-4 w-4" />
                  Poor
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleRatingSelect(5)}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Excellent
                </Button>
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-600">Your rating:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  What type of feedback is this?
                </label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { type: 'bug', icon: Bug, label: 'Bug Report' },
                    { type: 'feature_request', icon: Lightbulb, label: 'Feature Request' },
                    { type: 'improvement', icon: ThumbsUp, label: 'Improvement' },
                    { type: 'praise', icon: Heart, label: 'Praise' }
                  ].map(({ type, icon: Icon, label }) => (
                    <Button
                      key={type}
                      variant={feedbackType === type ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFeedbackType(type as any)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="h-3 w-3" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Which feature does this relate to?
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { value: 'markdown', label: 'Markdown Rendering' },
                    { value: 'scroll', label: 'Scroll Control' },
                    { value: 'controls', label: 'Chat Controls' },
                    { value: 'performance', label: 'Performance' },
                    { value: 'accessibility', label: 'Accessibility' },
                    { value: 'general', label: 'General' }
                  ].map(({ value, label }) => (
                    <Badge
                      key={value}
                      variant={category === value ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setCategory(value as any)}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="feedback-message" className="text-sm font-medium mb-2 block">
                  Tell us more about your experience
                </label>
                <Textarea
                  id="feedback-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={getFeedbackPlaceholder(feedbackType, category)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep('rating')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!message.trim() || isSubmitting}
                  className="flex-1 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Feedback
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <ThumbsUp className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Thank you for your feedback!
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Your input helps us improve the chat experience for everyone.
                  We'll review your feedback and use it to make the system better.
                </p>
              </div>
              <Button onClick={handleClose} className="w-full">
                Close
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function getFeedbackPlaceholder(
  feedbackType: string, 
  category: string
): string {
  const placeholders = {
    bug: {
      markdown: "Describe the issue with markdown rendering (e.g., 'Code blocks don't display correctly')",
      scroll: "Describe the scrolling problem (e.g., 'Auto-scroll doesn't work when typing')",
      controls: "Describe the issue with chat controls (e.g., 'Close button doesn't respond')",
      performance: "Describe the performance issue (e.g., 'Chat becomes slow with long conversations')",
      accessibility: "Describe the accessibility problem (e.g., 'Screen reader doesn't announce new messages')",
      general: "Describe the bug you encountered"
    },
    feature_request: {
      markdown: "What markdown feature would you like to see? (e.g., 'Support for math equations')",
      scroll: "What scroll feature would improve your experience? (e.g., 'Jump to specific message')",
      controls: "What control feature would be helpful? (e.g., 'Minimize to corner of screen')",
      performance: "What performance improvement would help? (e.g., 'Faster message loading')",
      accessibility: "What accessibility feature would help? (e.g., 'High contrast mode')",
      general: "What new feature would improve your experience?"
    },
    improvement: {
      markdown: "How could we improve markdown rendering? (e.g., 'Better syntax highlighting')",
      scroll: "How could we improve scrolling behavior? (e.g., 'Smoother animations')",
      controls: "How could we improve the chat controls? (e.g., 'More keyboard shortcuts')",
      performance: "How could we improve performance? (e.g., 'Faster loading times')",
      accessibility: "How could we improve accessibility? (e.g., 'Better keyboard navigation')",
      general: "How could we improve your overall experience?"
    },
    praise: {
      markdown: "What do you love about the markdown rendering?",
      scroll: "What works well with the scrolling behavior?",
      controls: "What do you like about the chat controls?",
      performance: "What performs well in your experience?",
      accessibility: "What accessibility features work well for you?",
      general: "What do you love about the chat experience?"
    },
    complaint: {
      markdown: "What's frustrating about markdown rendering?",
      scroll: "What's annoying about the scrolling behavior?",
      controls: "What's problematic with the chat controls?",
      performance: "What performance issues are bothering you?",
      accessibility: "What accessibility barriers are you facing?",
      general: "What's frustrating about your experience?"
    }
  };

  return placeholders[feedbackType as keyof typeof placeholders]?.[category as keyof typeof placeholders.bug] || 
         "Please share your thoughts about the chat experience...";
}