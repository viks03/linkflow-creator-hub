
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { QrCode, Download, Copy, Check } from 'lucide-react';

interface QRCodeGeneratorProps {
  profileUrl: string;
  username: string;
}

export function QRCodeGenerator({ profileUrl, username }: QRCodeGeneratorProps) {
  const [qrVisible, setQrVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrVisible && typeof window !== 'undefined') {
      import('qrcode').then((QRCode) => {
        if (canvasRef.current) {
          QRCode.toCanvas(canvasRef.current, profileUrl, {
            width: 200,
            margin: 1,
            color: {
              dark: '#000000',
              light: '#ffffff',
            },
          });
        }
      });
    }
  }, [qrVisible, profileUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `${username}-qrcode.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <QrCode className="w-5 h-5" />
          <h3 className="text-lg font-medium">Share Your Profile</h3>
        </div>
        
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={profileUrl}
            readOnly
            className="flex-1 p-2 text-sm border rounded-l-md focus:outline-none bg-gray-50 dark:bg-gray-700"
          />
          <Button 
            variant="default" 
            size="sm" 
            className="rounded-l-none" 
            onClick={handleCopyLink}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setQrVisible(!qrVisible)}
          >
            {qrVisible ? 'Hide QR Code' : 'Generate QR Code'}
          </Button>
          
          {qrVisible && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDownloadQR}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>
        
        {qrVisible && (
          <div className="flex justify-center mt-4 bg-white p-4 rounded-md">
            <canvas ref={canvasRef} />
          </div>
        )}
      </div>
    </div>
  );
}
