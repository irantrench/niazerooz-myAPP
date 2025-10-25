import React from 'react';
import { List, FileText, DollarSign, Camera, Check } from 'lucide-react';

interface StepIconProps {
  step: { id: string; title: string; icon: any };
}

const StepIcon: React.FC<StepIconProps> = ({ step }) => {
  switch (step.id) {
    case 'category':
      return <List className="w-6 h-6 text-primary" />;
    case 'details':
      return <FileText className="w-6 h-6 text-primary" />;
    case 'pricing':
      return <DollarSign className="w-6 h-6 text-primary" />;
    case 'media':
      return <Camera className="w-6 h-6 text-primary" />;
    case 'finish':
      return <Check className="w-6 h-6 text-primary" />;
    default:
      return null;
  }
};

export default StepIcon;