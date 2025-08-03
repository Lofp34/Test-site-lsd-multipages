'use client';

import React, { useState } from 'react';
import { UploadedFile } from '@/lib/gemini/types';

interface FilePreviewProps {
  files: UploadedFile[];
  onRemove?: (fileId: string) => void;
  showRemoveButton?: boolean;
  maxPreviewSize?: number;
}

interface FilePreviewItemProps {
  file: UploadedFile;
  onRemove?: (fileId: string) => void;
  showRemoveButton?: boolean;
}

function FilePreviewItem({ file, onRemove, showRemoveButton = true }: FilePreviewItemProps) {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    if (mimeType.startsWith('video/')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    }
    if (mimeType.startsWith('audio/')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  };

  const renderPreview = () => {
    if (file.mimeType.startsWith('image/') && !imageError) {
      return (
        <div className="relative">
          <img
            src={file.uri}
            alt={file.name}
            className={`rounded-md object-cover transition-all duration-200 ${
              isExpanded ? 'w-full max-w-md' : 'w-16 h-16'
            }`}
            onError={() => setImageError(true)}
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ cursor: 'pointer' }}
          />
          {!isExpanded && (
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-md transition-all duration-200 flex items-center justify-center">
              <svg className="w-4 h-4 text-white opacity-0 hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          )}
        </div>
      );
    }

    if (file.mimeType.startsWith('video/')) {
      return (
        <video
          src={file.uri}
          className="w-16 h-16 rounded-md object-cover"
          controls={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ cursor: 'pointer' }}
        />
      );
    }

    if (file.mimeType.startsWith('audio/')) {
      return (
        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
          {isExpanded ? (
            <audio src={file.uri} controls className="w-full" />
          ) : (
            <div className="text-gray-500" onClick={() => setIsExpanded(!isExpanded)}>
              {getFileIcon(file.mimeType)}
            </div>
          )}
        </div>
      );
    }

    // Fallback pour autres types
    return (
      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
        {getFileIcon(file.mimeType)}
      </div>
    );
  };

  return (
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
      {renderPreview()}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 truncate">
            {file.name}
          </p>
          {showRemoveButton && onRemove && (
            <button
              onClick={() => onRemove(file.id)}
              className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Supprimer le fichier"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-gray-500">
            {formatFileSize(file.size)}
          </span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500 capitalize">
            {file.mimeType.split('/')[0]}
          </span>
        </div>
        
        <div className="text-xs text-gray-400 mt-1">
          Uploadé le {file.uploadedAt.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
}

export default function FilePreview({ 
  files, 
  onRemove, 
  showRemoveButton = true,
  maxPreviewSize = 5 
}: FilePreviewProps) {
  if (!files || files.length === 0) {
    return null;
  }

  const displayFiles = files.slice(0, maxPreviewSize);
  const remainingCount = files.length - maxPreviewSize;

  return (
    <div className="space-y-2">
      {displayFiles.map((file) => (
        <FilePreviewItem
          key={file.id}
          file={file}
          onRemove={onRemove}
          showRemoveButton={showRemoveButton}
        />
      ))}
      
      {remainingCount > 0 && (
        <div className="text-xs text-gray-500 text-center py-2">
          +{remainingCount} fichier{remainingCount > 1 ? 's' : ''} supplémentaire{remainingCount > 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}