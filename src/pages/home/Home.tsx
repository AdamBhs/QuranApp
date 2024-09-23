import { BiRightArrow } from "react-icons/bi";
import Button from "../../components/button";
import Loading from "../../components/loader";
import useSurahData from "../../hooks/useSurahData";
import "./homeStyle.css";
import { useState } from "react";
import Footer from "../../layouts/footer";

type SurahType = {
  id: number;
  name: string;
  start_page: number;
  end_page: number;
};

export default function Home() {
  const [openfooterHome, setOpenFooterHome] = useState(false);
  const [surah, setSurah] = useState<SurahType | null>(null); // Initialize with null

  const handleOpenFooter = (surahSelected: SurahType) => { // Ensure the parameter matches SurahType
    setOpenFooterHome(true);
    setSurah(surahSelected);
  }

  const { suwar, loading, error } = useSurahData();

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="home">
        <div className="home-section-one">
          <h1>Listen to the Holy Quran</h1>
          <p>Listen and download the Holy Quran in the voice of the most famous reciters</p>
          <Button name="Start Listening" />
        </div>

        <div className="home-section-two container">
          {
            suwar.map((surah) => (
              <div className="surah-card" key={surah.id}>
                <h3>{surah.name}</h3>
                <BiRightArrow className="play-btn" onClick={() => handleOpenFooter(surah)} />
              </div>
            ))
          }
        </div>
      </div>
      {openfooterHome && surah && <Footer surah={surah} />}
    </>
  )
}
