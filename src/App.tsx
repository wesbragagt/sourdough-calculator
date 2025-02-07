import React, { useState, useEffect } from 'react';
import { Scale, Thermometer, Clock, Heading as Bread } from 'lucide-react';

interface Recipe {
  flour: number;
  water: number;
  starter: number;
  salt: number;
  bulkTime: number;
  proofTime: number;
}

function App() {
  const [inputs, setInputs] = useState({
    flourAmount: 1000,
    flourProtein: 12.5,
    starterAmount: 20,
    roomTemp: 22,
    hydration: 75,
    fridgeProof: false,
  });

  const [recipe, setRecipe] = useState<Recipe>({
    flour: 0,
    water: 0,
    starter: 0,
    salt: 0,
    bulkTime: 0,
    proofTime: 0,
  });

  const calculateRecipe = () => {
    const { flourAmount, hydration, starterAmount, roomTemp, fridgeProof } = inputs;
    
    // Calculate basic ingredients
    const flour = flourAmount;
    const water = (flourAmount * hydration) / 100;
    const starter = (flourAmount * starterAmount) / 100;
    const salt = flourAmount * 0.02; // 2% salt

    // Calculate fermentation times based on temperature
    let bulkTime = 4; // Base bulk fermentation time in hours
    bulkTime = bulkTime * (24 / roomTemp); // Adjust for temperature

    let proofTime = fridgeProof ? 12 : 2; // Base proofing time in hours
    if (!fridgeProof) {
      proofTime = proofTime * (24 / roomTemp);
    }

    setRecipe({
      flour,
      water,
      starter,
      salt,
      bulkTime,
      proofTime,
    });
  };

  useEffect(() => {
    calculateRecipe();
  }, [inputs]);

  return (
    <div className="min-h-screen bg-[#FFF5EB] px-4 py-6 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#C2410C] mb-2">Sourdough Calculator</h1>
          <p className="text-[#9A3412] text-sm sm:text-base">Perfect your sourdough recipe with precision</p>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-[#FDBA74]">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#C2410C] mb-4 sm:mb-6">Input Variables</h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#9A3412] mb-1">
                  Flour Amount (g)
                </label>
                <input
                  type="number"
                  value={inputs.flourAmount}
                  onChange={(e) => setInputs({ ...inputs, flourAmount: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-[#FDBA74] rounded-md focus:ring-2 focus:ring-[#F97316] focus:border-transparent text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9A3412] mb-1">
                  Flour Protein (%)
                </label>
                <input
                  type="number"
                  value={inputs.flourProtein}
                  onChange={(e) => setInputs({ ...inputs, flourProtein: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-[#FDBA74] rounded-md focus:ring-2 focus:ring-[#F97316] focus:border-transparent text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9A3412] mb-1">
                  Starter Amount (% of flour)
                </label>
                <input
                  type="number"
                  value={inputs.starterAmount}
                  onChange={(e) => setInputs({ ...inputs, starterAmount: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-[#FDBA74] rounded-md focus:ring-2 focus:ring-[#F97316] focus:border-transparent text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9A3412] mb-1">
                  Room Temperature (°C)
                </label>
                <input
                  type="number"
                  value={inputs.roomTemp}
                  onChange={(e) => setInputs({ ...inputs, roomTemp: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-[#FDBA74] rounded-md focus:ring-2 focus:ring-[#F97316] focus:border-transparent text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9A3412] mb-1">
                  Hydration (%)
                </label>
                <input
                  type="number"
                  value={inputs.hydration}
                  onChange={(e) => setInputs({ ...inputs, hydration: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-[#FDBA74] rounded-md focus:ring-2 focus:ring-[#F97316] focus:border-transparent text-base"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="fridgeProof"
                  checked={inputs.fridgeProof}
                  onChange={(e) => setInputs({ ...inputs, fridgeProof: e.target.checked })}
                  className="w-4 h-4 text-[#F97316] border-[#FDBA74] rounded focus:ring-[#F97316]"
                />
                <label htmlFor="fridgeProof" className="text-sm font-medium text-[#9A3412]">
                  Proof in fridge
                </label>
              </div>
            </div>
          </div>

          {/* Recipe Section */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-[#FDBA74]">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#C2410C] mb-4 sm:mb-6">Recipe</h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center space-x-3">
                  <Scale className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#9A3412]">Flour</p>
                    <p className="font-semibold text-[#C2410C]">{recipe.flour}g</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Thermometer className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#9A3412]">Water</p>
                    <p className="font-semibold text-[#C2410C]">{Math.round(recipe.water)}g</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Bread className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#9A3412]">Starter</p>
                    <p className="font-semibold text-[#C2410C]">{Math.round(recipe.starter)}g</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Scale className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#9A3412]">Salt</p>
                    <p className="font-semibold text-[#C2410C]">{Math.round(recipe.salt)}g</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#FDBA74] pt-4">
                <h3 className="text-lg font-semibold text-[#C2410C] mb-3">Timing</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[#9A3412]">Bulk Fermentation</p>
                      <p className="font-semibold text-[#C2410C]">
                        {Math.round(recipe.bulkTime)} hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[#9A3412]">Proofing Time</p>
                      <p className="font-semibold text-[#C2410C]">
                        {Math.round(recipe.proofTime)} hours {inputs.fridgeProof ? '(in fridge)' : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#FDBA74] pt-4">
                <p className="text-sm text-[#9A3412] italic">
                  Total dough weight: {Math.round(recipe.flour + recipe.water + recipe.starter + recipe.salt)}g
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;