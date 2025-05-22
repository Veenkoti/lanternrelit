import React, { useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Copy, Check } from 'lucide-react';
import { JournalContext } from '@/context/JournalContext';

interface EntryExportButtonProps {
  entryId: string;
}

const EntryExportButton: React.FC<EntryExportButtonProps> = ({ entryId }) => {
  const [copied, setCopied] = useState(false);
  const context = useContext(JournalContext);
  
  if (!context) {
    console.error("EntryExportButton must be used within JournalProvider");
    return null;
  }
  
  const { exportEntryToEmail, exportEntryToText } = context;
  
  const handleCopyToClipboard = () => {
    const textContent = exportEntryToText(entryId);
    if (textContent) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleEmailExport = () => {
    exportEntryToEmail(entryId);
  };

  return (
    <div className="flex space-x-2 mt-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="text-amber-700 bg-transparent border-amber-200 hover:bg-amber-100/20 flex items-center" 
        onClick={handleCopyToClipboard}
      >
        {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
        {copied ? 'Copied' : 'Copy to Notes'}
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="text-amber-700 bg-transparent border-amber-200 hover:bg-amber-100/20 flex items-center" 
        onClick={handleEmailExport}
      >
        <Mail className="h-4 w-4 mr-1" />
        Export to Email
      </Button>
    </div>
  );
};

export default EntryExportButton;