import React from 'react';
import {
  Download,
  MapPin,
  Wallet,
  Users,
  Calendar,
  Sparkles,
  Plane,
  Camera,
  Coffee,
  Moon,
  Sun,
  Compass,
} from 'lucide-react';
import { ItineraryData } from '../types/itinerary';

interface ItineraryPDFProps {
  itinerary: ItineraryData;
  onDownload?: () => void;
  showCoverPhoto?: boolean;
}

export default function ItineraryPDF({
  itinerary,
  onDownload,
  showCoverPhoto = true,
}: ItineraryPDFProps) {
  const handlePrint = () => {
    if (onDownload) {
      onDownload();
    } else {
      window.print();
    }
  };

  const coverImage =
    itinerary.coverImageUrl ||
    `https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80`;

  const polaroidImage =
    itinerary.polaroidImageUrl ||
    coverImage;

  return (
    <div className="print-area">
      {/* ===== PAGE 1 — COVER ===== */}
      <div className="pdf-page cover-page">
        {/* Washi Tape Strip */}
        <div className="washi-tape tape-1" />
        <div className="washi-tape tape-2" />

        {/* Vintage Stamp */}
        <div className="vintage-stamp">
          <span role="img" aria-label="airplane">✈️</span>
          <small>AIRMAIL</small>
        </div>

        <div className="cover-content w-full my-auto flex flex-col items-center">
          <p className="cover-label">— YOUR TRAVEL JOURNAL —</p>
          <h1 className="cover-title">
            {itinerary.destination}
          </h1>

          {itinerary.tagline && (
            <p className="font-handwriting text-2xl text-[#7d9b76] mt-2 font-semibold">
              {itinerary.tagline}
            </p>
          )}

          <div className="cover-divider">
            <span>✦</span>
            <span className="divider-line" />
            <span className="text-lg">✈</span>
            <span className="divider-line" />
            <span>✦</span>
          </div>

          {/* Polaroid on Cover */}
          {showCoverPhoto && coverImage && (
            <div className="cover-polaroid">
              <img
                src={coverImage}
                alt={itinerary.destination}
                loading="eager"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <p className="text-center font-handwriting">
                {itinerary.destination} · Expedition Notes
              </p>
            </div>
          )}

          <div className="cover-details">
            <div className="detail-item">
              <Calendar size={17} />
              <span>{itinerary.days?.length || 0} Days Adventure</span>
            </div>
            <div className="detail-item">
              <Wallet size={17} />
              <span>{itinerary.totalEstimatedCost}</span>
            </div>
            <div className="detail-item">
              <Users size={17} />
              <span>{itinerary.travelers}</span>
            </div>
            {itinerary.interests && itinerary.interests.length > 0 && (
              <div className="detail-item">
                <MapPin size={17} />
                <span>{itinerary.interests.slice(0, 3).join(' · ')}</span>
              </div>
            )}
          </div>

          <p className="cover-quote">
            "{itinerary.quote?.text || 'The world is a book and those who do not travel read only one page.'}"
            <br />
            <em>— {itinerary.quote?.author || 'Saint Augustine'}</em>
          </p>
        </div>

        {/* Postmark stamp bottom badge */}
        <div className="w-full flex justify-between items-end px-2 pt-4">
          <div className="postmark-badge font-mono">
            PASSPORT VERIFIED · {new Date().getFullYear()}
          </div>
          <div className="text-xs tracking-widest text-[#7d9b76] uppercase font-bold">
            Edition No. 01
          </div>
        </div>

        {/* Decorative corner doodles */}
        <div className="corner-doodle tl">❋</div>
        <div className="corner-doodle tr">❋</div>
        <div className="corner-doodle bl">❋</div>
        <div className="corner-doodle br">❋</div>
      </div>

      {/* ===== PAGE 2 — TRIP SUMMARY ===== */}
      <div className="pdf-page summary-page">
        {/* Washi tape accents */}
        <div className="washi-tape tape-3" />

        <div className="page-header">
          <div className="page-header-left">
            <span className="header-sticker">📌</span>
            <div>
              <h2>Trip Overview</h2>
              <span className="page-tagline">Highlights & Logistics</span>
            </div>
          </div>
          <div className="text-xs uppercase tracking-widest text-[#7d9b76] font-bold">
            Journal Page · 02
          </div>
        </div>

        <div className="summary-grid">
          {/* Photo polaroid */}
          <div className="polaroid">
            <img
              src={polaroidImage}
              alt={itinerary.destination}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <p>{itinerary.destination} 📍</p>
          </div>

          {/* Summary text */}
          <div className="summary-text torn-paper">
            <h3 className="font-serif-vintage text-xl font-bold text-[#2c2c2c] mb-2 flex items-center gap-2">
              <Sparkles size={18} className="text-[#c4917e]" />
              The Journey Ahead
            </h3>
            <p>{itinerary.summary}</p>
          </div>
        </div>

        {/* Budget Table */}
        <div className="budget-section">
          <h3 className="section-label">
            <Wallet size={20} />
            Estimated Budget Breakdown
          </h3>
          <table className="budget-table">
            <thead>
              <tr>
                <th>Expense Category</th>
                <th>Estimated Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>🏨 Accommodation</td>
                <td>{itinerary.budget?.accommodation || '$0'}</td>
              </tr>
              <tr>
                <td>🍽️ Food & Artisan Dining</td>
                <td>{itinerary.budget?.food || '$0'}</td>
              </tr>
              <tr>
                <td>🎟️ Sightseeing & Activities</td>
                <td>{itinerary.budget?.activities || '$0'}</td>
              </tr>
              <tr>
                <td>🚇 Local Transport & Passes</td>
                <td>{itinerary.budget?.transport || '$0'}</td>
              </tr>
              <tr className="total-row">
                <td><strong>Total Projected Budget</strong></td>
                <td><strong>{itinerary.totalEstimatedCost}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Vintage postal stamp in corner */}
        <div className="vintage-stamp" style={{ top: 'auto', bottom: '30px', right: '40px' }}>
          <span>🗺️</span>
          <small>EXPEDITION</small>
        </div>

        {/* Decorative corner doodles */}
        <div className="corner-doodle tl">❋</div>
        <div className="corner-doodle tr">❋</div>
        <div className="corner-doodle bl">❋</div>
        <div className="corner-doodle br">❋</div>
      </div>

      {/* ===== PAGES 3+ — DAY CARDS ===== */}
      {itinerary.days?.map((day, i) => (
        <div key={day.day || i} className="pdf-page day-page">
          {/* Alternating Washi tape on side */}
          {i % 2 === 0 ? (
            <div className="washi-tape tape-1 tape-sage" />
          ) : (
            <div className="washi-tape tape-3 tape-rose" />
          )}

          <div className="page-header">
            <div className="page-header-left">
              <span className="header-sticker">📅</span>
              <div>
                <h2>Day {day.day} — {day.theme}</h2>
                <span className="page-tagline">Daily Schedule & Highlights</span>
              </div>
            </div>
            <div className="text-xs uppercase tracking-widest text-[#7d9b76] font-bold">
              Day {day.day} of {itinerary.days.length}
            </div>
          </div>

          <div className="day-card torn-paper">
            {/* Time slots */}
            {[
              { label: '🌅 Morning', slot: day.morning, icon: '📸' },
              { label: '☀️ Afternoon', slot: day.afternoon, icon: '🍽️' },
              { label: '🌙 Evening', slot: day.evening, icon: '🎵' },
            ].map((period, idx) => (
              <div key={idx} className="time-slot">
                <div className="slot-header">
                  <span className="slot-label">{period.label}</span>
                  <span className="slot-cost">{period.slot?.cost || 'Included'}</span>
                </div>
                <div className="slot-body">
                  <div className="slot-icon">{period.icon}</div>
                  <div className="flex-1">
                    <h4 className="slot-title">
                      {period.slot?.activity || 'Free Exploration'}
                    </h4>
                    <p className="slot-desc">
                      {period.slot?.description || 'Discover hidden gems and local culture.'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Day Reflection Prompt */}
          <div className="torn-paper mt-6 bg-[#fffdf5] border border-dashed border-[#e3d8c8] py-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">📷</span>
              <p className="text-xs font-serif-vintage italic text-[#777] m-0">
                Favorite photo spot or memory from Day {day.day}:
              </p>
            </div>
            <div className="w-48 border-b border-dashed border-[#bbb] h-4" />
          </div>

          {/* Corner Doodles */}
          <div className="corner-doodle tl">❋</div>
          <div className="corner-doodle tr">❋</div>
          <div className="corner-doodle bl">❋</div>
          <div className="corner-doodle br">❋</div>
        </div>
      ))}

      {/* ===== FINAL PAGE — TIPS + FOOTER ===== */}
      <div className="pdf-page tips-page">
        {/* Washi tape accents */}
        <div className="washi-tape tape-2" />

        <div className="page-header">
          <div className="page-header-left">
            <span className="header-sticker">💡</span>
            <div>
              <h2>Travel Tips & Field Notes</h2>
              <span className="page-tagline">Insider Guidance & Reminders</span>
            </div>
          </div>
          <div className="text-xs uppercase tracking-widest text-[#7d9b76] font-bold">
            Final Checklist
          </div>
        </div>

        {/* Tips List */}
        <div className="tips-list">
          {itinerary.tips?.map((tip, i) => (
            <div key={i} className="tip-item">
              <span className="tip-number">{i + 1}</span>
              <p>{tip}</p>
            </div>
          ))}
        </div>

        {/* Notes Area with ruled lines and handwritten feel */}
        <div className="notes-area torn-paper">
          <div className="flex justify-between items-center mb-3">
            <h3 className="m-0 font-serif-vintage text-xl font-bold text-[#2c2c2c] flex items-center gap-2">
              <span>📝</span> My Travel Notes & Memories
            </h3>
            <span className="font-handwriting text-base text-[#7d9b76] font-bold">
              Personal Journal Entry
            </span>
          </div>

          <div className="note-lines">
            <div className="note-line" />
            <div className="note-line" />
            <div className="note-line" />
            <div className="note-line" />
            <div className="note-line" />

            {itinerary.handwrittenNotes && (
              <div className="handwritten-content">
                {itinerary.handwrittenNotes}
              </div>
            )}
          </div>
        </div>

        {/* Final Stamp */}
        <div className="vintage-stamp" style={{ top: 'auto', bottom: '90px', right: '45px' }}>
          <span>🌿</span>
          <small>JOURNEY</small>
        </div>

        {/* Footer */}
        <div className="pdf-footer">
          <div className="flex items-center gap-2">
            <span>✈️ Generated with Scrapbook Itinerary PDF</span>
            <span className="text-[#c4917e]">✦</span>
            <span>{itinerary.destination}</span>
          </div>
          <div className="font-mono text-xs">
            {new Date().toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </div>

        {/* Corner Doodles */}
        <div className="corner-doodle tl">❋</div>
        <div className="corner-doodle tr">❋</div>
        <div className="corner-doodle bl">❋</div>
        <div className="corner-doodle br">❋</div>
      </div>

      {/* Floating Download Button (Screen Only) */}
      <button
        type="button"
        className="download-btn no-print"
        onClick={handlePrint}
        title="Download / Print as PDF (Cmd/Ctrl + P)"
      >
        <Download size={20} />
        <span>Download as PDF</span>
      </button>
    </div>
  );
}
