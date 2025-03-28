
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CropRecommendation() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setResult("Based on your inputs, we recommend: Rice, Wheat, and Soybeans. These crops have shown excellent yield in your soil type and climate conditions. The expected ROI is around 25-30% with proper care.");
      setLoading(false);
    }, 1500);
  };
  
  return (
    <Card className="w-full max-w-lg glass-morphism card-hover">
      <CardHeader className="space-y-1">
        <div className="subtle-chip">AI-Powered</div>
        <CardTitle className="text-2xl">Crop Recommendation</CardTitle>
        <CardDescription>Enter your farm details and get AI-powered crop suggestions</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="soil-type">Soil Type</Label>
            <Select defaultValue="loamy">
              <SelectTrigger>
                <SelectValue placeholder="Select soil type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sandy">Sandy</SelectItem>
                <SelectItem value="clayey">Clayey</SelectItem>
                <SelectItem value="loamy">Loamy</SelectItem>
                <SelectItem value="silty">Silty</SelectItem>
                <SelectItem value="peaty">Peaty</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter your location" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="water">Water Availability</Label>
            <Select defaultValue="moderate">
              <SelectTrigger>
                <SelectValue placeholder="Select water availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="budget">Budget (USD)</Label>
            <Input id="budget" type="number" placeholder="Enter your budget" />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Analyzing..." : "Get Recommendations"}
          </Button>
        </form>
      </CardContent>
      
      {result && (
        <CardFooter className="border-t pt-4">
          <div className="space-y-2 w-full">
            <h4 className="font-medium text-primary">AI Recommendation:</h4>
            <p className="text-sm">{result}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
