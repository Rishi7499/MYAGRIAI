
import { useState } from 'react';
import { Sprout } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FertilizerGuide() {
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState("");
  const [showRecommendation, setShowRecommendation] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setLoading(false);
      setShowRecommendation(true);
    }, 1500);
  };
  
  return (
    <Card className="w-full glass-morphism card-hover">
      <CardHeader className="space-y-1">
        <div className="subtle-chip">AI Guide</div>
        <CardTitle className="text-2xl">Fertilizer & Water Guide</CardTitle>
        <CardDescription>Optimize resource usage for better yields</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="crop">Select Crop</Label>
            <Select 
              value={crop} 
              onValueChange={setCrop}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="corn">Corn</SelectItem>
                <SelectItem value="soybeans">Soybeans</SelectItem>
                <SelectItem value="cotton">Cotton</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!crop || loading}
          >
            {loading ? "Generating Guide..." : "Get Recommendations"}
          </Button>
        </form>
        
        {showRecommendation && (
          <div className="mt-6 space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="fertilizer">
                <AccordionTrigger className="text-sm font-medium">
                  Fertilizer Recommendations
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-2">
                    <div>
                      <h5 className="text-xs font-medium">Primary Fertilizers:</h5>
                      <ul className="text-xs text-muted-foreground list-disc pl-4 mt-1 space-y-1">
                        <li>NPK 10-26-26: 100kg/hectare at planting</li>
                        <li>Urea (46-0-0): 50kg/hectare, 30 days after planting</li>
                        <li>Potassium Nitrate: 25kg/hectare during flowering stage</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-medium">Organic Alternatives:</h5>
                      <ul className="text-xs text-muted-foreground list-disc pl-4 mt-1 space-y-1">
                        <li>Composted manure: 2-3 tons/hectare before planting</li>
                        <li>Bone meal: 50kg/hectare for phosphorus</li>
                        <li>Seaweed extract: Foliar spray every 14 days</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-medium">Micronutrients:</h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        Apply zinc sulfate (15kg/hectare) and boron (5kg/hectare) to address common deficiencies in this crop.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="irrigation">
                <AccordionTrigger className="text-sm font-medium">
                  Irrigation Schedule
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-2">
                    <div>
                      <h5 className="text-xs font-medium">Critical Growth Stages:</h5>
                      <ul className="text-xs text-muted-foreground list-disc pl-4 mt-1 space-y-1">
                        <li><span className="font-medium">Seedling stage:</span> Light watering (5mm) daily</li>
                        <li><span className="font-medium">Vegetative stage:</span> 25mm every 3-4 days</li>
                        <li><span className="font-medium">Flowering stage:</span> 35mm every 2-3 days (critical)</li>
                        <li><span className="font-medium">Grain filling:</span> 30mm every 3 days</li>
                        <li><span className="font-medium">Maturity:</span> Reduce to 15mm every 5 days</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-medium">Water Conservation Tips:</h5>
                      <ul className="text-xs text-muted-foreground list-disc pl-4 mt-1 space-y-1">
                        <li>Use drip irrigation or micro-sprinklers to reduce water usage by 30%</li>
                        <li>Apply mulch to reduce evaporation</li>
                        <li>Water early morning or late evening to minimize evaporation</li>
                        <li>Monitor soil moisture with sensors to optimize irrigation timing</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="schedule">
                <AccordionTrigger className="text-sm font-medium">
                  Application Schedule
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-2">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Growth Stage</th>
                          <th className="text-left py-2">Week</th>
                          <th className="text-left py-2">Application</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">Pre-planting</td>
                          <td className="py-2">-1</td>
                          <td className="py-2">Base fertilizer (NPK)</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Seedling</td>
                          <td className="py-2">1-2</td>
                          <td className="py-2">Light watering only</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Early growth</td>
                          <td className="py-2">3-4</td>
                          <td className="py-2">Nitrogen application</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Vegetative</td>
                          <td className="py-2">5-7</td>
                          <td className="py-2">Micronutrients spray</td>
                        </tr>
                        <tr>
                          <td className="py-2">Flowering</td>
                          <td className="py-2">8-10</td>
                          <td className="py-2">Potassium application</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="bg-secondary p-3 rounded-lg mt-2">
              <h4 className="text-sm font-medium mb-1">Key Recommendation:</h4>
              <p className="text-xs text-muted-foreground">
                This crop is particularly sensitive to water stress during the flowering stage. 
                Ensure consistent moisture during weeks 8-10 for optimal yield. 
                Using soil moisture sensors can help optimize irrigation timing and reduce water usage by up to 25%.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
