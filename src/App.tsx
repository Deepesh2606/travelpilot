import React, { useState } from 'react';
import {
  Download,
  Sparkles,
  Edit3,
  RefreshCw,
  Printer,
  Info,
  Check,
  Plus,
  Trash2,
  X,
  Compass,
  MapPin,
  Calendar,
  Wallet,
  Users,
  Image as ImageIcon,
  BookOpen,
} from 'lucide-react';
import ItineraryPDF from './components/ItineraryPDF';
import { sampleItineraries } from './data/sampleItineraries';
import { ItineraryData, DayPlan } from './types/itinerary';

export default function App() {
  const [currentItinerary, setCurrentItinerary] = useState<ItineraryData>(
    sampleItineraries.tokyo
  );
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPrintGuideOpen, setIsPrintGuideOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // AI Form state
  const [aiForm, setAiForm] = useState({
    destination: '',
    days: 3,
    travelers: 'Couple',
    budgetTier: 'Moderate',
    interests: 'Culinary, History & Scenic Walks',
    specialRequests: '',
  });

  // Edit Form state
  const [editForm, setEditForm] = useState<ItineraryData>(currentItinerary);

  const handleSelectPreset = (key: string) => {
    if (sampleItineraries[key]) {
      setCurrentItinerary(sampleItineraries[key]);
      setEditForm(sampleItineraries[key]);
    }
  };

  const handleOpenEdit = () => {
    setEditForm(JSON.parse(JSON.stringify(currentItinerary)));
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    setCurrentItinerary(editForm);
    setIsEditModalOpen(false);
  };

  const handleGenerateAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiForm.destination.trim()) return;

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aiForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate itinerary');
      }

      const data = await response.json();
      if (data.itinerary) {
        // Attach a reliable unsplash image based on destination
        const destQuery = encodeURIComponent(data.itinerary.destination.split(',')[0]);
        const enrichedItinerary: ItineraryData = {
          ...data.itinerary,
          coverImageUrl: `https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80`,
          polaroidImageUrl: `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=700&q=80`,
        };
        setCurrentItinerary(enrichedItinerary);
        setEditForm(enrichedItinerary);
        setIsAiModalOpen(false);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || 'Something went wrong while generating the itinerary. Please try again.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f4eee5] text-[#2c2c2c] selection:bg-[#c4917e]/30">
      {/* Top Banner & Control Bar (Screen Only) */}
      <header className="no-print sticky top-0 z-40 bg-[#faf6f0]/95 backdrop-blur-md border-b border-[#e2d8ca] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-[#7d9b76] flex items-center justify-center text-lg bg-[#faf6f0] shadow-sm">
              ✈️
            </div>
            <div>
              <h1 className="font-serif-vintage text-xl font-bold tracking-tight text-[#2c2c2c] m-0 leading-tight">
                Scrapbook Travel Journal
              </h1>
              <p className="text-xs text-[#7d9b76] font-sans font-semibold tracking-wide uppercase m-0">
                A4 PDF Ready · Vintage Handcrafted Style
              </p>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 bg-[#ede4d6] p-1 rounded-full text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleSelectPreset('tokyo')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                currentItinerary.destination.includes('Tokyo')
                  ? 'bg-[#7d9b76] text-white shadow-sm'
                  : 'text-[#555] hover:text-[#2c2c2c]'
              }`}
            >
              🇯🇵 Tokyo
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('paris')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                currentItinerary.destination.includes('Paris')
                  ? 'bg-[#7d9b76] text-white shadow-sm'
                  : 'text-[#555] hover:text-[#2c2c2c]'
              }`}
            >
              🇫🇷 Paris
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('amalfi')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                currentItinerary.destination.includes('Amalfi')
                  ? 'bg-[#7d9b76] text-white shadow-sm'
                  : 'text-[#555] hover:text-[#2c2c2c]'
              }`}
            >
              🇮🇹 Amalfi
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('kyoto')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                currentItinerary.destination.includes('Kyoto')
                  ? 'bg-[#7d9b76] text-white shadow-sm'
                  : 'text-[#555] hover:text-[#2c2c2c]'
              }`}
            >
              ⛩️ Kyoto
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#c4917e] hover:bg-[#b07f6e] text-white text-xs font-bold shadow-sm transition-all active:scale-95"
            >
              <Sparkles size={14} />
              <span>AI Generator</span>
            </button>

            <button
              type="button"
              onClick={handleOpenEdit}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#fffdf8] hover:bg-white text-[#2c2c2c] border border-[#d8cdbd] text-xs font-bold shadow-sm transition-all"
            >
              <Edit3 size={14} className="text-[#7d9b76]" />
              <span>Customize</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPrintGuideOpen(true)}
              className="p-2 rounded-lg bg-[#fffdf8] hover:bg-white text-[#666] border border-[#d8cdbd] text-xs transition-all"
              title="Print to PDF Instructions"
            >
              <Info size={15} />
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7d9b76] hover:bg-[#6c8a65] text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              <Download size={14} />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Helpful print notification tip bar */}
        <div className="bg-[#e9dfcf] border-t border-[#dfd3c0] text-[11px] text-[#665e52] py-1 px-4 text-center">
          <span>💡 Tip: Click <strong>Download as PDF</strong>, then in the print window choose <strong>Destination: Save as PDF</strong>, <strong>Margins: None</strong>, and check <strong>Background graphics</strong>.</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="py-8 px-2 sm:px-4 flex justify-center">
        <div className="w-full max-w-[840px] bg-[#faf6f0] shadow-xl border border-[#ded5c6] rounded-sm transition-all">
          <ItineraryPDF itinerary={currentItinerary} onDownload={handlePrint} />
        </div>
      </main>

      {/* ========================================================================= */}
      {/* AI GENERATOR MODAL */}
      {/* ========================================================================= */}
      {isAiModalOpen && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#faf6f0] rounded-xl shadow-2xl border-2 border-[#7d9b76] p-6 relative overflow-hidden">
            {/* Washi tape accent on modal */}
            <div className="washi-tape tape-1 -top-3 left-4 w-32" />

            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#7d9b76] font-bold">
                  Gemini AI Powered
                </span>
                <h2 className="font-serif-vintage text-2xl font-bold text-[#2c2c2c] m-0">
                  Craft Custom Scrapbook Itinerary
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="text-[#888] hover:text-[#2c2c2c] p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleGenerateAI} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#555] uppercase tracking-wider mb-1">
                  Destination & Country *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Barcelona, Spain or Reykjavik, Iceland"
                  value={aiForm.destination}
                  onChange={(e) =>
                    setAiForm({ ...aiForm, destination: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#d8cdbd] rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#7d9b76]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#555] uppercase tracking-wider mb-1">
                    Trip Length
                  </label>
                  <select
                    value={aiForm.days}
                    onChange={(e) =>
                      setAiForm({ ...aiForm, days: parseInt(e.target.value, 10) })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#d8cdbd] rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#7d9b76]"
                  >
                    <option value={2}>2 Days Weekend</option>
                    <option value={3}>3 Days Express</option>
                    <option value={4}>4 Days Discovery</option>
                    <option value={5}>5 Days Extended</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#555] uppercase tracking-wider mb-1">
                    Travelers
                  </label>
                  <select
                    value={aiForm.travelers}
                    onChange={(e) =>
                      setAiForm({ ...aiForm, travelers: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#d8cdbd] rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#7d9b76]"
                  >
                    <option value="Solo Explorer">Solo Explorer</option>
                    <option value="Couple">Couple</option>
                    <option value="Family with Kids">Family with Kids</option>
                    <option value="Group of Friends">Friends Trip</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#555] uppercase tracking-wider mb-1">
                    Budget Level
                  </label>
                  <select
                    value={aiForm.budgetTier}
                    onChange={(e) =>
                      setAiForm({ ...aiForm, budgetTier: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#d8cdbd] rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#7d9b76]"
                  >
                    <option value="Budget Backpacker">Budget Backpacker</option>
                    <option value="Moderate & Cozy">Moderate & Cozy</option>
                    <option value="Luxury Boutique">Luxury Boutique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#555] uppercase tracking-wider mb-1">
                    Primary Vibe
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Foodie, Architecture, Nature"
                    value={aiForm.interests}
                    onChange={(e) =>
                      setAiForm({ ...aiForm, interests: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#d8cdbd] rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#7d9b76]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#555] uppercase tracking-wider mb-1">
                  Special Requests / Must-See Spots (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Include vegetarian restaurants, vintage shops, or a sunset viewpoint"
                  value={aiForm.specialRequests}
                  onChange={(e) =>
                    setAiForm({ ...aiForm, specialRequests: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#d8cdbd] rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#7d9b76]"
                />
              </div>

              {/* Quick inspiration chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-[#777]">Quick ideas:</span>
                {['Rome, Italy', 'Bali, Indonesia', 'New York City', 'Oaxaca, Mexico'].map(
                  (place) => (
                    <button
                      type="button"
                      key={place}
                      onClick={() => setAiForm({ ...aiForm, destination: place })}
                      className="text-[11px] bg-[#ede4d6] hover:bg-[#dfd3bf] px-2 py-0.5 rounded text-[#444]"
                    >
                      {place}
                    </button>
                  )
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#e6ddd0]">
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-transparent text-[#666] hover:text-[#2c2c2c] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#7d9b76] hover:bg-[#6c8a65] text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Drafting Scrapbook...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      <span>Generate Itinerary</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CUSTOMIZE & EDIT MODAL */}
      {/* ========================================================================= */}
      {isEditModalOpen && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#faf6f0] rounded-xl shadow-2xl border-2 border-[#c4917e] p-6 max-h-[90vh] overflow-y-auto my-6">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#e2d8ca]">
              <div className="flex items-center gap-2">
                <Edit3 size={20} className="text-[#c4917e]" />
                <h2 className="font-serif-vintage text-2xl font-bold text-[#2c2c2c] m-0">
                  Customize Itinerary
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-[#888] hover:text-[#2c2c2c] p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#555] uppercase tracking-wider mb-1">
                    Destination Name
                  </label>
                  <input
                    type="text"
                    value={editForm.destination}
                    onChange={(e) =>
                      setEditForm({ ...editForm, destination: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#d8cdbd] rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#555] uppercase tracking-wider mb-1">
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={editForm.tagline || ''}
                    onChange={(e) =>
                      setEditForm({ ...editForm, tagline: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#d8cdbd] rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#555] uppercase tracking-wider mb-1">
                    Travelers
                  </label>
                  <input
                    type="text"
                    value={editForm.travelers}
                    onChange={(e) =>
                      setEditForm({ ...editForm, travelers: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#d8cdbd] rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#555] uppercase tracking-wider mb-1">
                    Total Estimated Cost
                  </label>
                  <input
                    type="text"
                    value={editForm.totalEstimatedCost}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        totalEstimatedCost: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#d8cdbd] rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-bold text-[#555] uppercase tracking-wider mb-1">
                  Trip Narrative Summary
                </label>
                <textarea
                  rows={3}
                  value={editForm.summary}
                  onChange={(e) =>
                    setEditForm({ ...editForm, summary: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#d8cdbd] rounded-lg text-sm"
                />
              </div>

              {/* Photos URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#555] uppercase tracking-wider mb-1">
                    Cover Photo (Unsplash URL)
                  </label>
                  <input
                    type="text"
                    value={editForm.coverImageUrl || ''}
                    onChange={(e) =>
                      setEditForm({ ...editForm, coverImageUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#d8cdbd] rounded-lg text-sm font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#555] uppercase tracking-wider mb-1">
                    Polaroid Photo URL
                  </label>
                  <input
                    type="text"
                    value={editForm.polaroidImageUrl || ''}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        polaroidImageUrl: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#d8cdbd] rounded-lg text-sm font-mono text-xs"
                  />
                </div>
              </div>

              {/* Budget Table */}
              <div className="bg-[#ede4d6]/60 p-4 rounded-lg border border-[#dfd3c0]">
                <h4 className="font-serif-vintage text-sm font-bold text-[#2c2c2c] mb-2">
                  Budget Table Breakdown
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-[#666]">Accommodation</label>
                    <input
                      type="text"
                      value={editForm.budget?.accommodation || ''}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          budget: {
                            ...editForm.budget,
                            accommodation: e.target.value,
                          },
                        })
                      }
                      className="w-full px-2 py-1.5 bg-white border border-[#d8cdbd] rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#666]">Food & Dining</label>
                    <input
                      type="text"
                      value={editForm.budget?.food || ''}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          budget: { ...editForm.budget, food: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1.5 bg-white border border-[#d8cdbd] rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#666]">Activities</label>
                    <input
                      type="text"
                      value={editForm.budget?.activities || ''}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          budget: {
                            ...editForm.budget,
                            activities: e.target.value,
                          },
                        })
                      }
                      className="w-full px-2 py-1.5 bg-white border border-[#d8cdbd] rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#666]">Transport</label>
                    <input
                      type="text"
                      value={editForm.budget?.transport || ''}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          budget: {
                            ...editForm.budget,
                            transport: e.target.value,
                          },
                        })
                      }
                      className="w-full px-2 py-1.5 bg-white border border-[#d8cdbd] rounded text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Handwritten Note */}
              <div>
                <label className="block text-xs font-bold text-[#555] uppercase tracking-wider mb-1">
                  Personal Handwritten Notes & Souvenir Reminders
                </label>
                <textarea
                  rows={2}
                  value={editForm.handwrittenNotes || ''}
                  onChange={(e) =>
                    setEditForm({ ...editForm, handwrittenNotes: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#d8cdbd] rounded-lg text-sm font-handwriting text-lg"
                  placeholder="e.g. Don't forget to buy ceramic tiles in town square..."
                />
              </div>

              {/* Day Plans Editor */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-serif-vintage text-base font-bold text-[#2c2c2c] m-0">
                    Day-by-Day Cards ({editForm.days?.length || 0} Days)
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const nextDayNum = (editForm.days?.length || 0) + 1;
                      const newDay: DayPlan = {
                        day: nextDayNum,
                        theme: `Day ${nextDayNum} Exploration`,
                        morning: {
                          activity: 'Morning Sightseeing',
                          description: 'Discover local market and iconic landmarks.',
                          cost: '$15',
                        },
                        afternoon: {
                          activity: 'Afternoon Discovery',
                          description: 'Visit boutique shops and enjoy specialty lunch.',
                          cost: '$20',
                        },
                        evening: {
                          activity: 'Evening Sunset & Dinner',
                          description: 'Atmospheric dining and waterfront stroll.',
                          cost: '$30',
                        },
                      };
                      setEditForm({
                        ...editForm,
                        days: [...(editForm.days || []), newDay],
                      });
                    }}
                    className="flex items-center gap-1 text-xs text-[#7d9b76] font-bold hover:underline"
                  >
                    <Plus size={14} /> Add Day
                  </button>
                </div>

                <div className="space-y-4">
                  {editForm.days?.map((day, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white border border-[#e0d8ce] rounded-lg relative"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-xs text-[#7d9b76]">
                          Day {day.day}
                        </span>
                        {editForm.days.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editForm.days.filter(
                                (_, dIdx) => dIdx !== idx
                              );
                              // Re-index days
                              const reindexed = updated.map((d, i) => ({
                                ...d,
                                day: i + 1,
                              }));
                              setEditForm({ ...editForm, days: reindexed });
                            }}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>

                      <div className="mb-2">
                        <label className="text-[11px] font-bold text-[#777]">Theme</label>
                        <input
                          type="text"
                          value={day.theme}
                          onChange={(e) => {
                            const newDays = [...editForm.days];
                            newDays[idx].theme = e.target.value;
                            setEditForm({ ...editForm, days: newDays });
                          }}
                          className="w-full px-2 py-1 border border-[#e0d8ce] rounded text-xs"
                        />
                      </div>

                      {/* Morning slot */}
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="col-span-2">
                          <label className="text-[10px] font-bold text-[#888]">🌅 Morning Activity</label>
                          <input
                            type="text"
                            value={day.morning.activity}
                            onChange={(e) => {
                              const newDays = [...editForm.days];
                              newDays[idx].morning.activity = e.target.value;
                              setEditForm({ ...editForm, days: newDays });
                            }}
                            className="w-full px-2 py-1 border border-[#e0d8ce] rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#888]">Cost</label>
                          <input
                            type="text"
                            value={day.morning.cost}
                            onChange={(e) => {
                              const newDays = [...editForm.days];
                              newDays[idx].morning.cost = e.target.value;
                              setEditForm({ ...editForm, days: newDays });
                            }}
                            className="w-full px-2 py-1 border border-[#e0d8ce] rounded text-xs"
                          />
                        </div>
                      </div>

                      {/* Afternoon slot */}
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="col-span-2">
                          <label className="text-[10px] font-bold text-[#888]">☀️ Afternoon Activity</label>
                          <input
                            type="text"
                            value={day.afternoon.activity}
                            onChange={(e) => {
                              const newDays = [...editForm.days];
                              newDays[idx].afternoon.activity = e.target.value;
                              setEditForm({ ...editForm, days: newDays });
                            }}
                            className="w-full px-2 py-1 border border-[#e0d8ce] rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#888]">Cost</label>
                          <input
                            type="text"
                            value={day.afternoon.cost}
                            onChange={(e) => {
                              const newDays = [...editForm.days];
                              newDays[idx].afternoon.cost = e.target.value;
                              setEditForm({ ...editForm, days: newDays });
                            }}
                            className="w-full px-2 py-1 border border-[#e0d8ce] rounded text-xs"
                          />
                        </div>
                      </div>

                      {/* Evening slot */}
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="col-span-2">
                          <label className="text-[10px] font-bold text-[#888]">🌙 Evening Activity</label>
                          <input
                            type="text"
                            value={day.evening.activity}
                            onChange={(e) => {
                              const newDays = [...editForm.days];
                              newDays[idx].evening.activity = e.target.value;
                              setEditForm({ ...editForm, days: newDays });
                            }}
                            className="w-full px-2 py-1 border border-[#e0d8ce] rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#888]">Cost</label>
                          <input
                            type="text"
                            value={day.evening.cost}
                            onChange={(e) => {
                              const newDays = [...editForm.days];
                              newDays[idx].evening.cost = e.target.value;
                              setEditForm({ ...editForm, days: newDays });
                            }}
                            className="w-full px-2 py-1 border border-[#e0d8ce] rounded text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 mt-6 border-t border-[#e6ddd0]">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-transparent text-[#666] hover:text-[#2c2c2c] text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#7d9b76] hover:bg-[#6c8a65] text-white text-xs font-bold shadow-md transition-all"
              >
                <Check size={14} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PRINT GUIDE MODAL */}
      {/* ========================================================================= */}
      {isPrintGuideOpen && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#faf6f0] rounded-xl shadow-2xl border border-[#7d9b76] p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-serif-vintage text-xl font-bold text-[#2c2c2c] m-0 flex items-center gap-2">
                <Printer size={18} className="text-[#7d9b76]" />
                How to Save as Scrapbook PDF
              </h3>
              <button
                type="button"
                onClick={() => setIsPrintGuideOpen(false)}
                className="text-[#888] hover:text-[#2c2c2c]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#555] leading-relaxed">
              <div className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-[#e6ded3]">
                <div className="w-5 h-5 rounded-full bg-[#7d9b76] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  1
                </div>
                <div>
                  <strong>Click "Download as PDF"</strong> or press{' '}
                  <kbd className="px-1.5 py-0.5 bg-[#ede4d6] rounded font-mono text-[10px]">
                    Cmd + P
                  </kbd>{' '}
                  / <kbd className="px-1.5 py-0.5 bg-[#ede4d6] rounded font-mono text-[10px]">Ctrl + P</kbd>.
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-[#e6ded3]">
                <div className="w-5 h-5 rounded-full bg-[#7d9b76] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  2
                </div>
                <div>
                  Set <strong>Destination: Save as PDF</strong> in your browser's print dialogue.
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-[#e6ded3]">
                <div className="w-5 h-5 rounded-full bg-[#7d9b76] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  3
                </div>
                <div>
                  Under <em>More Settings</em>:
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-[#666]">
                    <li>Paper size: <strong>A4</strong></li>
                    <li>Margins: <strong>None</strong> (or Minimum)</li>
                    <li>
                      <strong>Check "Background graphics"</strong> to preserve paper texture, washi tape, and stamps.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsPrintGuideOpen(false);
                  handlePrint();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7d9b76] hover:bg-[#6c8a65] text-white text-xs font-bold shadow-md"
              >
                <span>Got it, Print now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
