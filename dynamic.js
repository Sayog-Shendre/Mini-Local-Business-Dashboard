import React, { useState } from 'react';
import { Star, MapPin, MessageCircle, RefreshCw, Building2, Loader2 } from 'lucide-react';

const BusinessDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [errors, setErrors] = useState({});

  // Simulated backend API calls
  const fetchBusinessData = async (name, location) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulated business data
    const ratings = [4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8];
    const reviewCounts = [45, 67, 89, 127, 156, 203, 278, 345];
    
    const headlines = [
      `Why ${name} is ${location}'s Best Kept Secret in 2025`,
      `${name}: The ${location} Favorite That's Taking Over Social Media`,
      `How ${name} Became ${location}'s Most Talked About Spot`,
      `${name} - Where ${location} Locals Go for the Best Experience`,
      `The Rise of ${name}: ${location}'s Hidden Gem Revealed`,
      `${name} Sets New Standards in ${location} - Here's Why`,
      `From Local to Legendary: ${name}'s ${location} Success Story`
    ];
    
    return {
      rating: ratings[Math.floor(Math.random() * ratings.length)],
      reviews: reviewCounts[Math.floor(Math.random() * reviewCounts.length)],
      headline: headlines[Math.floor(Math.random() * headlines.length)]
    };
  };

  const regenerateHeadline = async (name, location) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newHeadlines = [
      `${name}: The Ultimate ${location} Experience You Can't Miss`,
      `Breaking: ${name} Revolutionizes ${location}'s Business Scene`,
      `${name} - ${location}'s Premier Destination for Excellence`,
      `Why Everyone in ${location} is Talking About ${name}`,
      `${name} Dominates ${location} Market - Here's How`,
      `The ${name} Phenomenon: Taking ${location} by Storm`,
      `${name}: ${location}'s Crown Jewel of Innovation`
    ];
    
    return newHeadlines[Math.floor(Math.random() * newHeadlines.length)];
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Business name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const data = await fetchBusinessData(formData.name, formData.location);
      setBusinessData(data);
    } catch (error) {
      console.error('Error fetching business data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateHeadline = async () => {
    setRegenerating(true);
    try {
      const newHeadline = await regenerateHeadline(formData.name, formData.location);
      setBusinessData(prev => ({
        ...prev,
        headline: newHeadline
      }));
    } catch (error) {
      console.error('Error regenerating headline:', error);
    } finally {
      setRegenerating(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="text-blue-600 w-8 h-8" />
            <h1 className="text-4xl font-bold text-gray-900">GrowthProAI</h1>
          </div>
          <p className="text-gray-600 text-lg">Local Business SEO Dashboard</p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="text-blue-600 w-6 h-6" />
            Business Information
          </h2>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  placeholder="e.g., Cake & Co"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.location ? 'border-red-300' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  placeholder="e.g., Mumbai"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Business...
                </>
              ) : (
                'Get Business Insights'
              )}
            </button>
          </div>
        </div>

        {/* Business Data Display */}
        {businessData && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Business Dashboard
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Rating Card */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="text-yellow-500 w-6 h-6 fill-current" />
                  <h3 className="text-lg font-semibold text-gray-900">Google Rating</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-yellow-600">{businessData.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(businessData.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews Card */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <MessageCircle className="text-green-500 w-6 h-6" />
                  <h3 className="text-lg font-semibold text-gray-900">Total Reviews</h3>
                </div>
                <span className="text-3xl font-bold text-green-600">{businessData.reviews}</span>
              </div>
            </div>

            {/* SEO Headline */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                AI-Generated SEO Headline
              </h3>
              <p className="text-gray-700 text-lg mb-4 font-medium leading-relaxed">
                "{businessData.headline}"
              </p>
              <button
                onClick={handleRegenerateHeadline}
                disabled={regenerating}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {regenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Regenerate SEO Headline
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>© 2025 GrowthProAI - Empowering Local Businesses</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;