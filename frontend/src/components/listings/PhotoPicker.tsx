import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, X, AlertCircle } from 'lucide-react';

interface PhotoPickerProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export default function PhotoPicker({ photos, onPhotosChange }: PhotoPickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setError('');

    // Validate files
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(`Invalid file type: ${file.name}. Please upload JPEG, PNG, or WebP images.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(`File too large: ${file.name}. Maximum size is 5MB per image.`);
        return;
      }
    }

    onPhotosChange([...photos, ...files]);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
    setError('');
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          className="w-full sm:w-auto"
        >
          <Upload className="mr-2 h-4 w-4" />
          Select Photos
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Upload JPEG, PNG, or WebP images. Maximum 5MB per image.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Photo Previews */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => {
            const previewUrl = URL.createObjectURL(photo);
            return (
              <div key={index} className="relative group aspect-square bg-muted overflow-hidden">
                <img
                  src={previewUrl}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                  onLoad={() => URL.revokeObjectURL(previewUrl)}
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove photo"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                  {(photo.size / 1024).toFixed(0)} KB
                </div>
              </div>
            );
          })}
        </div>
      )}

      {photos.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {photos.length} {photos.length === 1 ? 'photo' : 'photos'} selected
        </p>
      )}
    </div>
  );
}
