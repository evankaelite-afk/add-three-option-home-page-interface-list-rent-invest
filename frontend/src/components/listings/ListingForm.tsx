import { useState } from 'react';
import { useCreateListing } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';
import PhotoPicker from './PhotoPicker';

interface ListingFormProps {
  onSuccess: (listingId: bigint) => void;
}

interface FormData {
  title: string;
  description: string;
  address: string;
  propertyType: string;
  area: string;
  price: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ListingForm({ onSuccess }: ListingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    address: '',
    propertyType: '',
    area: '',
    price: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const createListingMutation = useCreateListing();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.propertyType.trim()) newErrors.propertyType = 'Property type is required';
    if (!formData.area.trim()) newErrors.area = 'Area/size is required';
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid positive number';
    }
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required';
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Convert photos to Uint8Array
      const imagePromises = photos.map((file) => {
        return new Promise<Uint8Array>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            resolve(new Uint8Array(arrayBuffer));
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
        });
      });

      const images = await Promise.all(imagePromises);

      // Create full description with all details
      const fullDescription = `${formData.description}

Property Details:
- Address: ${formData.address}
- Property Type: ${formData.propertyType}
- Area/Size: ${formData.area}

Contact Information:
- Name: ${formData.contactName}
- Phone: ${formData.contactPhone}
- Email: ${formData.contactEmail}`;

      const listingId = await createListingMutation.mutateAsync({
        title: formData.title,
        description: fullDescription,
        price: BigInt(formData.price),
        images,
      });

      onSuccess(listingId);
    } catch (error) {
      console.error('Failed to create listing:', error);
    }
  };

  const isSubmitting = createListingMutation.isPending;
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-urbanet">
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>
            Provide detailed information about your property
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Error Alert */}
          {createListingMutation.isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {createListingMutation.error instanceof Error
                  ? createListingMutation.error.message
                  : 'Failed to create listing. Please try again.'}
              </AlertDescription>
            </Alert>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Property Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Spacious 3BHK Apartment in Prime Location"
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe your property, its features, amenities, and what makes it special..."
              rows={5}
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">
              Address/Location <span className="text-destructive">*</span>
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="e.g., Sector 15, Gurgaon, Haryana"
              className={errors.address ? 'border-destructive' : ''}
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address}</p>
            )}
          </div>

          {/* Property Type and Area */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="propertyType">
                Property Type <span className="text-destructive">*</span>
              </Label>
              <Input
                id="propertyType"
                value={formData.propertyType}
                onChange={(e) => handleChange('propertyType', e.target.value)}
                placeholder="e.g., Apartment, Villa, Office"
                className={errors.propertyType ? 'border-destructive' : ''}
              />
              {errors.propertyType && (
                <p className="text-sm text-destructive">{errors.propertyType}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">
                Area/Size <span className="text-destructive">*</span>
              </Label>
              <Input
                id="area"
                value={formData.area}
                onChange={(e) => handleChange('area', e.target.value)}
                placeholder="e.g., 1500 sq ft"
                className={errors.area ? 'border-destructive' : ''}
              />
              {errors.area && (
                <p className="text-sm text-destructive">{errors.area}</p>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">
              Expected Rent/Price (₹) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              placeholder="e.g., 50000"
              className={errors.price ? 'border-destructive' : ''}
            />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price}</p>
            )}
          </div>

          {/* Photos */}
          <div className="space-y-2">
            <Label>Property Photos</Label>
            <PhotoPicker photos={photos} onPhotosChange={setPhotos} />
          </div>

          {/* Contact Information */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">
                  Contact Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => handleChange('contactName', e.target.value)}
                  placeholder="Your full name"
                  className={errors.contactName ? 'border-destructive' : ''}
                />
                {errors.contactName && (
                  <p className="text-sm text-destructive">{errors.contactName}</p>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleChange('contactPhone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className={errors.contactPhone ? 'border-destructive' : ''}
                  />
                  {errors.contactPhone && (
                    <p className="text-sm text-destructive">{errors.contactPhone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    placeholder="your.email@example.com"
                    className={errors.contactEmail ? 'border-destructive' : ''}
                  />
                  {errors.contactEmail && (
                    <p className="text-sm text-destructive">{errors.contactEmail}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting || hasErrors}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Listing...
                </>
              ) : (
                'Create Listing'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
