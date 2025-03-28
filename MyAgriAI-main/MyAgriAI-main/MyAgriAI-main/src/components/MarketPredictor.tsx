
import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Import Recharts for market price graph
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function MarketPredictor() {
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState("");
  const [showPrediction, setShowPrediction] = useState(false);
  
  // Sample data for price prediction chart
  const priceData = [
    { month: 'Jan', price: 120 },
    { month: 'Feb', price: 135 },
    { month: 'Mar', price: 145 },
    { month: 'Apr', price: 140 },
    { month: 'May', price: 150 },
    { month: 'Jun', price: 170 },
    { month: 'Jul', price: 190 },
    { month: 'Aug', price: 210 },
    { month: 'Sep', price: 220 },
    { month: 'Oct', price: 215 },
    { month: 'Nov', price: 225 },
    { month: 'Dec', price: 240 },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setLoading(false);
      setShowPrediction(true);
    }, 1500);
  };
  
  return (
    <Card className="w-full glass-morphism card-hover">
      <CardHeader className="space-y-1">
        <div className="subtle-chip">AI Prediction</div>
        <CardTitle className="text-2xl">Market Price Predictor</CardTitle>
        <CardDescription>Get AI predictions for crop prices</CardDescription>
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
            {loading ? "Predicting Prices..." : "Predict Market Prices"}
          </Button>
        </form>
        
        {showPrediction && (
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Predicted Price Trend (USD/ton)</h4>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Price']}
                      contentStyle={{ 
                        borderRadius: '0.5rem', 
                        border: 'none',
                        boxShadow: '0 4px 12px -2px rgba(0,0,0,0.15)',
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                      activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-secondary p-3 rounded-lg">
              <h4 className="text-sm font-medium mb-1">Market Analysis:</h4>
              <p className="text-xs text-muted-foreground">
                Prices are expected to rise steadily with peak values in November-December. 
                Consider storing your harvest until Q4 for maximum profit. 
                Current demand is 15% higher than last year.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
