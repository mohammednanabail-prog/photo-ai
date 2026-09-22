
import React from 'react';
import {
  Upload,
  Sparkles,
  Download,
  RotateCcw,
  Camera,
  Image as ImageIcon,
  Layers,
  Wand2,
  Trash2,
  Share2,
  Copy,
  Check,
  Maximize2,
  X,
  History,
  Sliders,
  Split,
  Eye,
  ArrowRightLeft
} from 'lucide-react';

export const UploadIcon: React.FC<{ className?: string }> = ({ className = "h-8 w-8 text-sky-500" }) => (
  <Upload className={className} />
);

export const MagicIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <Sparkles className={className} />
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <Download className={className} />
);

export const ResetIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <RotateCcw className={className} />
);

export {
  Camera,
  ImageIcon,
  Layers,
  Wand2,
  Trash2,
  Share2,
  Copy,
  Check,
  Maximize2,
  X,
  History,
  Sliders,
  Split,
  Eye,
  ArrowRightLeft,
  Sparkles
};

