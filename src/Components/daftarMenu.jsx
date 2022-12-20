import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../Utils/Constants';
import { GiHamburger  } from 'react-icons/gi';
import { MdEmojiFoodBeverage  } from 'react-icons/md';

const Icon = ({nama}) => {
    if(nama === "Makanan") return <GiHamburger className='inline-block mr-4 text-[28px]'/>
    if(nama === "Minuman") return <MdEmojiFoodBeverage className='inline-block mr-4 text-[28px]'/>
    if(nama === "Cemilan") return <GiHamburger className='inline-block mr-4 text-[28px]'/>
}

const Daftarmenu = ({onClick}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        daftarKategori()
    }, [categories])
    

    const daftarKategori = () => {
        axios.get( API_URL+"/categories")
        .then ((res)=>{
            setCategories(res.data)
            
        })
        .catch((err)=>{
            console.log("error ya", err);
        })
    }

    return (
        <>
            <div className="w-full bg-blue-700 p-2 text-[20px] capitalize text-white text-center font-bold ">
                Product Category List
            </div>
            <div className="text-white">
                <div className="grid grid-cols-1">
                    {categories && categories.map((category) => (
                        <button 
                            className="p-4 text-[20px] border-b-4 hover:border-l-[14px] border-sky-500" 
                            key={category.id}
                            onClick={onClick}
                        >
                            <Icon nama={category.nama}/> {category.nama}
                        </button>
                    ))}
                </div>
            </div>
        
        </>
    );
}

export default Daftarmenu;
