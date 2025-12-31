import { useState } from 'react';
import { Calculator, RotateCcw, Info, CheckCircle2 } from 'lucide-react';
import { MedicalScore } from '@/data/medicalScores';

interface ScoreCalculatorProps {
  score: MedicalScore;
}

export const ScoreCalculator = ({ score }: ScoreCalculatorProps) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const totalScore = score.fields
    .filter(field => selectedItems.has(field.id))
    .reduce((sum, field) => sum + field.points, 0);

  const getInterpretation = () => {
    // Find matching interpretation based on score
    for (const interp of score.interpretation) {
      const range = interp.range;
      if (range.includes('-')) {
        const [min, max] = range.split('-').map(n => parseInt(n));
        if (totalScore >= min && totalScore <= max) return interp;
      } else if (range.startsWith('≥')) {
        const min = parseInt(range.slice(1));
        if (totalScore >= min) return interp;
      } else if (range.startsWith('≤')) {
        const max = parseInt(range.slice(1));
        if (totalScore <= max) return interp;
      } else if (range.startsWith('>')) {
        const min = parseInt(range.slice(1));
        if (totalScore > min) return interp;
      } else if (range.startsWith('<')) {
        const max = parseInt(range.slice(1));
        if (totalScore < max) return interp;
      } else {
        if (totalScore === parseInt(range)) return interp;
      }
    }
    return score.interpretation[score.interpretation.length - 1];
  };

  const interpretation = getInterpretation();

  const reset = () => setSelectedItems(new Set());

  // Group fields by category for Glasgow-like scores
  const isGlasgowType = score.id === 'glasgow' || score.id === 'apgar';

  return (
    <div className="space-y-6">
      {/* Score Result Display */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-sm font-medium mb-1">Score Total</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black">{totalScore}</span>
              <span className="text-emerald-200 text-lg">points</span>
            </div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
            <Calculator size={28} />
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className={`font-bold ${interpretation.color.replace('text-', 'text-white')}`}>
            {interpretation.risk}
          </p>
        </div>
      </div>

      {/* Criteria Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-foreground">Critères</h4>
          <button 
            onClick={reset}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <RotateCcw size={14} />
            Réinitialiser
          </button>
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {score.fields.map((field) => {
            const isSelected = selectedItems.has(field.id);
            return (
              <button
                key={field.id}
                onClick={() => toggleItem(field.id)}
                className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  isSelected 
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                    : 'border-border bg-card hover:border-muted-foreground/30'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                  isSelected 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {isSelected ? <CheckCircle2 size={14} /> : <span className="text-xs font-bold">{field.points > 0 ? `+${field.points}` : field.points}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-foreground'}`}>
                    {field.label}
                  </p>
                  {field.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{field.description}</p>
                  )}
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex-shrink-0 ${
                  isSelected 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {field.points > 0 ? `+${field.points}` : field.points}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interpretation Guide */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Info size={16} className="text-muted-foreground" />
          <h4 className="font-bold text-sm text-foreground">Interprétation</h4>
        </div>
        <div className="space-y-2">
          {score.interpretation.map((interp, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm">
              <span className="font-mono font-bold text-muted-foreground w-12">{interp.range}</span>
              <span className={`font-medium ${interp.color}`}>{interp.risk}</span>
            </div>
          ))}
        </div>
        {score.source && (
          <p className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
            Source: {score.source}
          </p>
        )}
      </div>
    </div>
  );
};
