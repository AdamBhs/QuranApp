import { useEffect, useState } from "react";

type SurahType = {
    id: number;
    name: string;
    start_page: number;
    end_page: number;
};

const useSurahData = () => {
    const [suwar, setSurah] = useState<SurahType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchingSurah = async () => {
            try {
                const surahResponse = await fetch("https://mp3quran.net/api/v3/suwar?language=eng");
                if (!surahResponse.ok) {
                    throw new Error('Failed to fetch Surah data');
                }
                const data = await surahResponse.json();
                setSurah(data.suwar); 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setError(err.message || 'Unknown error occurred');
                
            } finally {
                setLoading(false);
            }
        };

        fetchingSurah();
    }, []); 

    return { suwar, loading, error };
};

export default useSurahData;
