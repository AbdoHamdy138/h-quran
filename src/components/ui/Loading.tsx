import React from 'react';
import { cn } from '../../utils/helpers';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  size = 'md', 
  className,
  text 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-primary-600',
        sizeClasses[size]
      )} />
      {text && (
        <p className="mt-2 text-sm text-gray-600">{text}</p>
      )}
    </div>
  );
};

export const LoadingSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('loading-shimmer rounded', className)} />
);

export const SurahCardSkeleton: React.FC = () => (
  <div className="card p-6 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <LoadingSkeleton className="w-12 h-12 rounded-full" />
        <div>
          <LoadingSkeleton className="h-4 w-24 mb-2" />
          <LoadingSkeleton className="h-3 w-16" />
        </div>
      </div>
      <LoadingSkeleton className="h-6 w-20" />
    </div>
    <LoadingSkeleton className="h-3 w-full mb-2" />
    <LoadingSkeleton className="h-3 w-3/4" />
  </div>
);

export const VerseCardSkeleton: React.FC = () => (
  <div className="card p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <LoadingSkeleton className="w-8 h-8 rounded-full" />
      <div className="flex space-x-2">
        <LoadingSkeleton className="w-8 h-8 rounded" />
        <LoadingSkeleton className="w-8 h-8 rounded" />
      </div>
    </div>
    <div className="space-y-3 mb-4">
      <LoadingSkeleton className="h-6 w-full" />
      <LoadingSkeleton className="h-6 w-5/6" />
      <LoadingSkeleton className="h-6 w-4/5" />
    </div>
    <LoadingSkeleton className="h-4 w-full mb-2" />
    <LoadingSkeleton className="h-4 w-3/4" />
  </div>
);