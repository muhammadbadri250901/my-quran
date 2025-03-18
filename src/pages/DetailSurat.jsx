import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser"; 

const DetailSurat = () => {
    const { id } = useParams();
    const [surat, setSurat] = useState(null); 
    const [loading, setLoading] = useState(true);

    const getDataFromAPI = (idSurat) => {
        fetch(`https://equran.id/api/v2/surat/${idSurat}`) 
            .then((res) => res.json())
            .then((data) => {
                setSurat(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getDataFromAPI(id);
    }, [id]);

    if (loading) return <p>Loading......</p>;
    if (!surat) return <p>Surat Tidak Ditemukan</p>;

    return (
        <>
            <div className="vh-100 overflow-auto"> 
                <h2>{surat.namaLatin} ({surat.nama})</h2>
                <p>Jumlah ayat: {surat.jumlahAyat}</p> 
                <p>Arti: {surat.arti}</p>
                <p>Deskripsi: {parse(surat.deskripsi)}</p>

                <div>
                    <ul className="list-group">
                        {surat.ayat.map((ayat) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center arabic-text" key={ayat.nomorAyat}>
                                {ayat.teksArab}
                                <span className="badge text-bg-primary rounded-pill">{ayat.nomorAyat}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default DetailSurat;
