import quran from "../../assets/pictures/quran.png";
import { useEffect, useState } from "react";
import "./footerStyle.css";
import { LuArrowDownCircle } from "react-icons/lu";
import Loading from "../../components/loader";

type SurahType = {
  id: number;
  name: string;
  start_page: number;
  end_page: number;
};

type moshafType = {
  id: number;
  name: string;
  server: string;
};

type reciterType = {
  id: number;
  name: string;
  letter: string;
  moshaf: moshafType[];
};

type propsType = {
  surah: SurahType;
};

export default function Footer({ surah }: propsType) {
  const [isOpen, setIsOpen] = useState(true);
  const [reciters, setReciters] = useState<reciterType[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingAllReciters, setLoadingAllReciters] = useState(true);
  const [changeReciter, setChangeReciter] = useState(2);
  const [allreciters, setAllReciters] = useState<reciterType[]>([]);

  const toggleFooter = () => {
    setIsOpen(!isOpen);
  };

  const onSelectReciterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value ? parseInt(event.target.value) : 2;
    setChangeReciter(selectedValue);
  }

  useEffect(() => {
    const fetchingAllReciters = async () => {
      try {
        const allrecitersResponse = await fetch(`https://www.mp3quran.net/api/v3/reciters?language=eng`);
        if (!allrecitersResponse.ok) {
          throw new Error('Failed to fetch allReciters');
        }

        const allReciters = await allrecitersResponse.json();
        setAllReciters(allReciters.reciters);
      } catch (err) {
        console.log("all reciters error : ", err)
      } finally {
        setLoadingAllReciters(false)
      }
    };
    
    fetchingAllReciters();
  }, [])

  useEffect(() => {
    const fetchingReciter = async () => {
      try {
        const reciterResponse = await fetch(`https://www.mp3quran.net/api/v3/reciters?language=eng&reciter=${changeReciter}`);
        if (!reciterResponse.ok) {
          throw new Error('Failed to fetch reciter');
        }
        const data = await reciterResponse.json();
        setReciters(data.reciters);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    setReciters([]);
    setLoading(true);
    fetchingReciter();
  }, [changeReciter]);

  const formatSurahId = (id: number): string => {
    if (id < 10) {
      return `00${id}`; // Add two leading zeros
    } else if (id < 100) {
      return `0${id}`; // Add one leading zero
    } else {
      return `${id}`; // No leading zeros
    }
  };

  if (loading && loadingAllReciters) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <footer className={isOpen ? "big-footer" : "small-footer"}>
      {reciters.map((reciter) => (
        <div className="content">
          <LuArrowDownCircle className="arrow-opCl" onClick={toggleFooter} />
          <div className="reader">
            <img src={quran} alt="" />
            <h3>{reciter.name} - {surah.name}</h3>
          </div>
          <div className="audio-reciter">
            <audio controls autoPlay loop key={surah.id}>
              <source
                src={`${reciter.moshaf[0]?.server}${formatSurahId(surah.id)}.mp3`}
                type="audio/mp3"
              />
              Your browser does not support the audio element.
            </audio>
            <div className="select-reciter">
              <select className="reciters" onChange={onSelectReciterChange}>
                <option value="">{reciter.name}</option>
                {allreciters.map((reciter) => (
                    <option key={reciter.id} value={reciter.id}>
                      {reciter.name}
                    </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </footer>
  );
}
