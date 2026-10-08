import { ItineraryData } from '../types/itinerary';

export const sampleItineraries: Record<string, ItineraryData> = {
  tokyo: {
    id: 'tokyo',
    destination: 'Tokyo, Japan',
    tagline: 'Neon Shrines, Tsukiji Delicacies & Ancient Serenity',
    dateRange: 'Autumn Season · 3 Days',
    summary:
      'Tokyo unfolds as a captivating tapestry where centuries-old Edo traditions gracefully intertwine with electric cyber-aesthetic avenues. From the incense-swirled lanterns of Senso-ji to hidden alleyway kissatens and bustling izakayas beneath railway tracks, every corner invites mindful discovery.',
    travelers: 'Couple Adventure',
    totalEstimatedCost: '$680 / ¥102,000',
    interests: ['Temples & Culture', 'Artisan Coffee', 'Street Gastronomy', 'Tokyo Metro'],
    coverImageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=80',
    polaroidImageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=700&q=80',
    quote: {
      text: 'The world is a book and those who do not travel read only one page.',
      author: 'Saint Augustine',
    },
    budget: {
      accommodation: '$320 (Boutique Ryokan/Hotel)',
      food: '$180 (Sushi, Ramen & Matcha)',
      activities: '$110 (Museums & Shrine Passes)',
      transport: '$70 (Suica IC Card & Metro)',
    },
    days: [
      {
        day: 1,
        theme: 'Historic Asakusa & Culinary Alleys',
        morning: {
          activity: 'Senso-ji Temple & Nakamise-dori',
          description:
            'Walk through the thunderous Kaminarimon Gate at sunrise. Sample warm ningyo-yaki bean-paste cakes along Nakamise-dori before burning sacred incense at the main hall.',
          cost: '¥600 / $4',
        },
        afternoon: {
          activity: 'Tsukiji Outer Market Tasting Tour',
          description:
            'Navigate vibrant stalls serving tamagoyaki skewers, grilled wagyu bites, fatty tuna nigiri, and fresh sea urchin from artisan vendors.',
          cost: '¥2,800 / $18',
        },
        evening: {
          activity: 'Omoide Yokocho Izakaya Crawl',
          description:
            'Step into Shinjuku’s intimate "Memory Lane" lantern-lit alleyway for charcoal-grilled yakitori skewers, ice-cold highballs, and smoky banter.',
          cost: '¥3,500 / $23',
        },
      },
      {
        day: 2,
        theme: 'Quiet Shrines, Vintage Vinyl & Golden Sunset',
        morning: {
          activity: 'Meiji Jingu Forest Sanctuary & Harajuku',
          description:
            'Meander through 170 acres of evergreen sacred cedar forest. Write wishes on wooden ema plaques before exploring quiet backstreets of Ura-Harajuku.',
          cost: 'Free Entry',
        },
        afternoon: {
          activity: 'Shimokitazawa Thrifting & Pour-Over Coffee',
          description:
            'Explore bohemian thrift shops, indie record stores, and tucked-away siphon coffee roasters in Tokyo’s most relaxed neighborhood.',
          cost: '¥1,800 / $12',
        },
        evening: {
          activity: 'Shibuya Sky Deck & Iconic Crossing',
          description:
            'Ascend 229 meters to the rooftop observation deck for 360-degree twilight vistas of Mount Fuji and Tokyo Tower, followed by crossing the world’s busiest pedestrian junction.',
          cost: '¥2,200 / $15',
        },
      },
      {
        day: 3,
        theme: 'Modern Art, Waterfront Gardens & Ginza Glitz',
        morning: {
          activity: 'teamLab Borderless Digital Museum',
          description:
            'Immerse in kaleidoscopic interactive light installations that spill across rooms, waterfalls, and mirror halls at Azabudai Hills.',
          cost: '¥3,800 / $25',
        },
        afternoon: {
          activity: 'Hamarikyu Coastal Tea House',
          description:
            'Stroll through the tidal ponds of an Edo-era shogun retreat. Enjoy ceremonial whisked matcha and seasonal wagashi sweet in the floating wooden pavilion.',
          cost: '¥1,100 / $7',
        },
        evening: {
          activity: 'Ginza Basement Depachika & Cocktail Bar',
          description:
            'Explore Mitsukoshi’s world-famous gourmet food floor for bento delicacies, then wrap up with bespoke hand-carved ice sphere cocktails at an eight-seat bar.',
          cost: '¥4,500 / $30',
        },
      },
    ],
    tips: [
      'Add a digital Suica or Pasmo IC card to Apple/Google Wallet for tap-and-go travel on all Tokyo train lines.',
      'Always keep coins or cash on hand — traditional kissatens, temple talisman counters, and vending machines prefer yen.',
      'Download Google Translate with Japanese offline camera pack for translating complex restaurant menus.',
      'Book teamLab and Shibuya Sky sunset slots at least 3 weeks prior to departure for guaranteed entry.',
    ],
    handwrittenNotes:
      'Remember to bring the little journal for collecting red-ink "Goshuin" temple stamps! Also try the matcha parfait near Yanaka Ginza.',
  },

  paris: {
    id: 'paris',
    destination: 'Paris, France',
    tagline: 'Cobblestones, Croissants & Golden Hour by the Seine',
    dateRange: 'Springtime · 4 Days',
    summary:
      'Paris reveals its quietest magic in lingering morning café crèmes, the scent of fresh baguettes drifting from corner boulangeries, and amber afternoon light bathing zinc rooftops. A celebration of timeless art, hidden garden courtyards, and effortless Parisian elegance.',
    travelers: 'Solo Explorer / Couple',
    totalEstimatedCost: '€820 / $890',
    interests: ['Art & Museology', 'Boulangeries', 'Flea Markets', 'Architecture'],
    coverImageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80',
    polaroidImageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=700&q=80',
    quote: {
      text: 'Whoever does not visit Paris regularly will never really be elegant.',
      author: 'Honoré de Balzac',
    },
    budget: {
      accommodation: '€420 (Marais Studio Apartment)',
      food: '€220 (Bistros, Wine & Pastries)',
      activities: '€110 (Museums & River Cruise)',
      transport: '€70 (Navigo Easy Metro Pass)',
    },
    days: [
      {
        day: 1,
        theme: 'Bohemian Montmartre & Historic Windmills',
        morning: {
          activity: 'Sacré-Cœur Sunrise & Rue de l’Abreuvoir',
          description:
            'Climb the steps of Montmartre before crowds arrive. Admire sweeping panoramic city vistas, then sketch the pink facade of La Maison Rose.',
          cost: 'Free Entry',
        },
        afternoon: {
          activity: 'Musée de Montmartre & Renoir Gardens',
          description:
            'Wander the historic studio where Renoir painted, overlooking the secret Montmartre vineyard. Pause for tea under the wisteria arbor.',
          cost: '€15 / $16',
        },
        evening: {
          activity: 'Classic Bistro Dinner on Rue Lepic',
          description:
            'Dine at a vintage zinc-bar bistro: duck confit with pommes sarladaises, crisp baguette, and a carafe of red Chinon.',
          cost: '€32 / $35',
        },
      },
      {
        day: 2,
        theme: 'The Literary Left Bank & Royal Luxembourg',
        morning: {
          activity: 'Shakespeare and Company & Notre-Dame Forecourt',
          description:
            'Browse storied bookshelves in the Latin Quarter, read poems upstairs by the typewriter, and admire the restored spire of Notre-Dame Cathedral.',
          cost: '€10 (Book purchase)',
        },
        afternoon: {
          activity: 'Jardin du Luxembourg Green Chairs',
          description:
            'Pull up an iconic sage-green metal chair beside the Medici Fountain. Enjoy a raspberry tart from Pierre Hermé while watching wooden toy boats.',
          cost: '€9 / $10',
        },
        evening: {
          activity: 'Sunset Vedettes de Pont-Neuf Cruise',
          description:
            'Glide past the illuminated Musée d’Orsay, Grand Palais, and the sparkling Eiffel Tower as street accordions play along the stone quays.',
          cost: '€16 / $17',
        },
      },
      {
        day: 3,
        theme: 'Art Masterpieces & Secret Marais Courtyards',
        morning: {
          activity: 'Musée de l’Orangerie Water Lilies',
          description:
            'Sit silently in the oval sunlit rooms surrounded by Claude Monet’s colossal Nymphéas canvas murals.',
          cost: '€12.50 / $14',
        },
        afternoon: {
          activity: 'Place des Vosges & L’As du Fallafel',
          description:
            'Eat legendary roasted eggplant and falafel pitas in the Jewish Quarter, followed by a peaceful stroll under the arcades of Paris’s oldest planned square.',
          cost: '€11 / $12',
        },
        evening: {
          activity: 'Aperitivo & Natural Wine at Le Verre Volé',
          description:
            'Sip biodynamic French wines alongside sourdough bread, artisan cheese boards, and charcuterie beside the tranquil Canal Saint-Martin.',
          cost: '€28 / $30',
        },
      },
    ],
    tips: [
      'Always greet shopkeepers and waiters with a warm "Bonjour Madame/Monsieur" upon entering — it sets the tone for lovely hospitality.',
      'Museum tickets must be reserved with specific entry time slots online to skip 2-hour queue lines.',
      'Tap water in France is crisp and called "une carafe d’eau" — it is always completely free at all restaurants.',
      'Ride the Metro line 6 above ground crossing the Pont de Bir-Hakeim for a breathtaking view of the Eiffel Tower.',
    ],
    handwrittenNotes:
      'Buy that vintage copper canelé mold from E. Dehillerin kitchenware shop near Châtelet! Don’t forget comfortable walking flats.',
  },

  amalfi: {
    id: 'amalfi',
    destination: 'Amalfi Coast, Italy',
    tagline: 'Pastel Cliffside Villages, Azure Waves & Lemon Groves',
    dateRange: 'Summer Glow · 3 Days',
    summary:
      'Perched between jagged limestone cliffs and the shimmering sapphire Tyrrhenian Sea, the Amalfi Coast is pure poetry. Days are measured in sun-warmed lemons, salty breezes along ancient mule tracks, and plates of fresh handmade scialatielli pasta served on breezy cliffside terraces.',
    travelers: 'Couple Getaway',
    totalEstimatedCost: '€740 / $800',
    interests: ['Coastal Hiking', 'Seafood Gastronomy', 'Boat Excursions', 'Ceramics'],
    coverImageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80',
    polaroidImageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=700&q=80',
    quote: {
      text: 'Positano bites deep. It is a dream place that isn’t quite real when you are there and becomes beckoningly real after you have gone.',
      author: 'John Steinbeck',
    },
    budget: {
      accommodation: '€380 (Cliffside Guesthouse)',
      food: '€210 (Pasta, Fresh Catch & Gelato)',
      activities: '€90 (Ferry Rides & Garden Passes)',
      transport: '€60 (SITA Bus & Sea Ferries)',
    },
    days: [
      {
        day: 1,
        theme: 'Positano Stairways & Spiaggia Grande',
        morning: {
          activity: 'Descent through Bougainvillea Alleys',
          description:
            'Walk down the cascading staircases framed by terracotta roofs, draped fuchsia flowers, and hand-painted majolica ceramic studios.',
          cost: 'Free Entry',
        },
        afternoon: {
          activity: 'Beachside Granita & Sunbathing',
          description:
            'Rent orange striped umbrella sun loungers on Fornillo Beach and savor sweet icy granita di limone served straight out of hollowed Amalfi lemons.',
          cost: '€18 / $20',
        },
        evening: {
          activity: 'Cliffside Sunset Aperitivo at Franco’s Bar',
          description:
            'Sip crisp Aperol Spritz overlooking Positano’s illuminated hillside amphitheater as the Mediterranean twilight turns indigo.',
          cost: '€25 / $27',
        },
      },
      {
        day: 2,
        theme: 'Ravello Gardens & Classical Melodies',
        morning: {
          activity: 'Villa Cimbrone & Infinity Terrace',
          description:
            'Marvel at marble Roman busts lining the dizzying cliff-edge "Terrazza dell’Infinito", where the azure sea meets the sky in seamless splendor.',
          cost: '€10 / $11',
        },
        afternoon: {
          activity: 'Villa Rufolo Cloisters & Ravello Piazza',
          description:
            'Wander the Moorish courtyard gardens that inspired Wagner. Enjoy artisan pistachio gelato on the quiet stone piazza.',
          cost: '€12 / $13',
        },
        evening: {
          activity: 'Candlelit Trattoria in Atrani',
          description:
            'Escape to peaceful Atrani for homemade pasta with clams, garlic, and colatura di alici anchovy essence.',
          cost: '€34 / $37',
        },
      },
      {
        day: 3,
        theme: 'The Path of the Gods (Sentiero degli Dei)',
        morning: {
          activity: 'Clifftop Hike from Bomerano to Nocelle',
          description:
            'Traverse the legendary ancient pathway suspended 600m above the sea with panoramic views spanning from Praiano to Capri island.',
          cost: 'Free Entry',
        },
        afternoon: {
          activity: 'Lemon Farm Picnic & Limoncello Tasting',
          description:
            'Rest beneath centuries-old chestnut pergola canopies. Taste freshly pulled fior di latte mozzarella, cured meats, and homemade limoncello liqueur.',
          cost: '€22 / $24',
        },
        evening: {
          activity: 'Amalfi Cathedral Piazza Farewell',
          description:
            'Climb the 62 marble steps to the 9th-century Duomo di Sant’Andrea with its Arab-Norman striped facade, enjoying evening espresso.',
          cost: '€6 / $7',
        },
      },
    ],
    tips: [
      'Take scenic passenger ferries (Travelmar) between towns rather than crowded buses to avoid cliffside traffic sickness.',
      'Wear sturdy walking shoes with rubber grip — Amalfi towns consist almost entirely of steep vertical stone staircases.',
      'Pack lightweight linen shirts and reef-safe sunscreen for boat outings.',
      'Bring cash for small lemon stands and ferry ticket booths along docks.',
    ],
    handwrittenNotes:
      'Pack the hand-painted ceramic lemon platter safely with bubble wrap. Don’t forget to write postcards from the Ravello post office!',
  },

  kyoto: {
    id: 'kyoto',
    destination: 'Kyoto, Japan',
    tagline: 'Whispering Bamboo, Zen Raked Gardens & Lantern Alleys',
    dateRange: 'Maple Season · 3 Days',
    summary:
      'Kyoto is the spiritual heartbeat of traditional Japan, where moss-draped stone lanterns guide travelers toward thousand-year-old wooden temples. Here, time slows to the measured cadence of bamboo water pipes, ceremonial green tea, and quiet evening footsteps along the preserved lanes of Gion.',
    travelers: 'Cultural Explorers',
    totalEstimatedCost: '$620 / ¥93,000',
    interests: ['Zen Temples', 'Tea Ceremonies', 'Kimono Craft', 'Bamboo Forests'],
    coverImageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
    polaroidImageUrl: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=700&q=80',
    quote: {
      text: 'To travel is to discover that everyone is wrong about other countries.',
      author: 'Aldous Huxley',
    },
    budget: {
      accommodation: '$290 (Machiya Townhouse)',
      food: '$170 (Kaiseki, Udon & Matcha)',
      activities: '$100 (Shrine Gardens & Tea Ceremony)',
      transport: '$60 (Bus Pass & Keihan Railway)',
    },
    days: [
      {
        day: 1,
        theme: 'Vermilion Torii Gates & Higashiyama Lanes',
        morning: {
          activity: 'Fushimi Inari-Taisha Mountain Trek',
          description:
            'Pass beneath thousands of bright orange vermilion torii gates winding up sacred Mount Inari in early dawn mist.',
          cost: 'Free Entry',
        },
        afternoon: {
          activity: 'Ninenzaka & Sannenzaka Preserved Streets',
          description:
            'Walk the stone-paved slope lined with Edo-period wooden machiya shops selling Kyoto fans, incense, and warabi-mochi confections.',
          cost: '¥1,200 / $8',
        },
        evening: {
          activity: 'Kiyomizu-dera Wooden Stage & City View',
          description:
            'Look out from the historic wooden terrace built without a single nail, followed by dinner at a quiet soba noodle house.',
          cost: '¥2,400 / $16',
        },
      },
      {
        day: 2,
        theme: 'Arashiyama Bamboo Grove & River Punts',
        morning: {
          activity: 'Sagano Bamboo Forest & Tenryu-ji Temple',
          description:
            'Listen to the rustling wind through towering green bamboo stalks, then contemplate the 14th-century Zen stroll garden and pond.',
          cost: '¥600 / $4',
        },
        afternoon: {
          activity: 'Okochi Sanso Villa & Ceremonial Tea',
          description:
            'Explore the mountain retreat of a silent movie samurai actor, enjoying complimentary matcha in a tranquil hilltop teahouse.',
          cost: '¥1,000 / $7',
        },
        evening: {
          activity: 'Togetsukyo Moon Crossing Bridge',
          description:
            'Watch traditional wooden cormorant fishing boats on the Oi River against sunset-lit mountains.',
          cost: 'Free Entry',
        },
      },
      {
        day: 3,
        theme: 'Golden Pavilion & Geisha District Evenings',
        morning: {
          activity: 'Kinkaku-ji (The Golden Pavilion)',
          description:
            'Witness the top two floors covered in pure gold leaf reflecting brilliantly in the Mirror Pond.',
          cost: '¥500 / $3.50',
        },
        afternoon: {
          activity: 'Ryoan-ji Zen Rock Garden Contemplation',
          description:
            'Ponder the enigmatic arrangement of fifteen moss-ringed boulders set on raked white gravel.',
          cost: '¥600 / $4',
        },
        evening: {
          activity: 'Gion Shirakawa Lantern Walk & Kaiseki',
          description:
            'Stroll along the willow-lined canal lit by paper lanterns, crossing stone bridges in search of authentic multi-course Kyoto kaiseki dining.',
          cost: '¥5,500 / $36',
        },
      },
    ],
    tips: [
      'Visit Fushimi Inari and Arashiyama Bamboo Grove before 7:30 AM to experience their quiet spiritual magic without crowds.',
      'Purchase the Kyoto Bus & Subway 1-Day Pass for unlimited hops between major temple districts.',
      'Respect local Geiko and Maiko in Gion — never block their path or touch their kimonos.',
      'Remove your shoes when stepping onto tatami mats inside temples and historic tearooms.',
    ],
    handwrittenNotes:
      'Buy some Yuzu-flavored incense from Shoyeido shop near Kyoto station. Stamp temple book at Tenryu-ji!',
  },
};
