
import FilterBar from "@/components/FilterBar";
import SectionHeader from "@/components/SectionHeader";
import SongCard from "@/components/SongCard";
import TrendingSongs from "@/components/TrendingSongs";

interface ChartsProps {
  hideHeader?: boolean;
  hideTabs?: boolean;
  isAdmin?: boolean;
}

// Enhanced mock data with real images
const chartSongs = [
  {
    id: 1,
    rank: 1,
    title: "Shake It To The Max",
    artist: "MOLIY, Silent Addy",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
    genre: "Afrobeats"
  },
  {
    id: 2,
    rank: 2,
    title: "Ordinary",
    artist: "Alex Warren",
    image: "https://images.unsplash.com/photo-1578021127722-1f1ff95b429e?w=400&h=400&fit=crop",
    genre: "Pop"
  },
  {
    id: 3,
    rank: 3,
    title: "City Boys",
    artist: "Burna Boy",
    image: "https://images.unsplash.com/photo-1619380061814-58f03707f082?w=400&h=400&fit=crop",
    genre: "Afrobeats"
  },
  {
    id: 4,
    rank: 4,
    title: "Water",
    artist: "Tyla",
    image: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=400&h=400&fit=crop",
    genre: "Amapiano"
  },
  {
    id: 5,
    rank: 5,
    title: "Unavailable",
    artist: "Davido ft. Musa Keys",
    image: "https://images.unsplash.com/photo-1620316060726-dcc8d959aba3?w=400&h=400&fit=crop",
    genre: "Afrobeats"
  },
  {
    id: 6,
    rank: 6,
    title: "Calm Down",
    artist: "Rema",
    image: "https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?w=400&h=400&fit=crop",
    genre: "Afrobeats"
  },
  {
    id: 7,
    rank: 7,
    title: "Rush",
    artist: "Ayra Starr",
    image: "https://images.unsplash.com/photo-1496440737103-cd88c50d5b3f?w=400&h=400&fit=crop",
    genre: "Afrobeats"
  },
  {
    id: 8,
    rank: 8,
    title: "People",
    artist: "Libianca",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
    genre: "Afrobeats"
  },
  {
    id: 9,
    rank: 9,
    title: "We No Dey Give Up",
    artist: "Olamide",
    image: "https://images.unsplash.com/photo-1647435374621-123a1b79f384?w=400&h=400&fit=crop",
    genre: "Afrobeats"
  },
  {
    id: 10,
    rank: 10,
    title: "Mnike",
    artist: "Tyler ICU, Tumelo",
    image: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=400&h=400&fit=crop",
    genre: "Amapiano"
  },
];

const Charts = ({ hideHeader = false, hideTabs = false, isAdmin = false }: ChartsProps) => {
  return (
    <>
      {!hideHeader && (
        <section className="bg-gradient-to-b from-clubstro-dark-gray to-clubstro-dark pt-8 pb-6 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Club Charts</h1>
            <p className="text-gray-400">
              The most played songs in clubs across different locations
            </p>
          </div>
        </section>
      )}
      
      <div className={!hideHeader ? "py-8 px-4" : ""}>
        <div className={!hideHeader ? "container mx-auto max-w-6xl" : ""}>
          {!hideHeader && !hideTabs && <FilterBar />}
          
          {/* Add the TrendingSongs carousel component here */}
          <TrendingSongs isAdmin={isAdmin} />
        
          <div className="grid md:grid-cols-2 gap-4">
            {chartSongs.map((song) => (
              <SongCard 
                key={song.id} 
                {...song} 
                variant="horizontal" 
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
