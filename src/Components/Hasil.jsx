import axios from "axios";
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { API_URL } from "../Utils/Constants";
import { numberWithCommas } from "../Utils/Uang";
import ModalBayar from './modalBayar';

export default function Hasil ({keranjang, props}) {
    const [addModal, setAddModal] = useState(false);
    const [pesanan, setPesanan] = useState([]);


    const totalBayar = keranjang.reduce(function (result, item) {
        return result + item.total_harga;
    }, 0);

    const submitTotal = (totalBayar) => {
        const pesanan = {
            total_bayar : totalBayar,
            menus : keranjang
        }

        axios.post(API_URL + "/pesanans", pesanan)
        .then ((res)=>{
            swal({
                title: "Sukses Pembayaran",
                text: "Sukses Pembayaran ",
                icon: "success",
                button: false,
                timer:1500,
            });
        })
        .catch((err)=>{
            console.log("error ya", err);
        })

        axios.get( API_URL+"/keranjangs")
        .then ((res)=>{
            const Keranjang = res.data;
            keranjang.map((item)=>{
                return axios.delete(API_URL+ "/keranjangs/" +item.id)
                            .then((res)=>console.log(res))
                            .catch((err)=>console.log(err))
            })
        })
        .catch((err)=>{
            console.log("error ya", err);
        });
    }



    const handleOpen = () => setAddModal(true);
    const handleClose = () => setAddModal(false);


    return(
        <>
            <ModalBayar
                open={addModal} 
                onClose={() => setAddModal(false)}
            />
            <div className="grid grid-cols-1 text-white ">
                <div className="w-full bg-blue-700 text-[28px] p-4">
                    Hasil
                </div>
                <div className=" mt-2 w-full text-[15px] overflow-y-scroll ">
                    {keranjang.length !== 0 &&(
                        <div className="">
                            {keranjang.map( (menuKeranjang) => (
                                <div className="border-b-8 px-2 border-slate-200 grid grid-cols-1 gap-4 text-xl text-black" key={menuKeranjang.id}>
                                    <div className="grid grid-cols-12 bg-blue-500/50 rounded-3xl">
                                        <div className="col-span-5 text-start p-4">
                                            <p>
                                                {menuKeranjang.product.nama}
                                            </p>
                                            <p>
                                                Rp. {numberWithCommas(menuKeranjang.product.harga)}
                                            </p>
                                        </div>
                                        <div className=" col-span-3 h-full w-full p-4 border-x-4 border-slate-900/50">
                                            <div className="text-center py-2 text-2xl">
                                                {"x "+menuKeranjang.jumlah}
                                            </div>
                                        </div>
                                        <div className="col-span-4 text-end p-4 mt-3 ">
                                            Rp. {numberWithCommas(menuKeranjang.total_harga)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className=" bottom-0 left-[75%] right-0 fixed">
                    <div className="w-full  grid grid-cols-2 bg-blue-700 text-[20px] p-4">
                        <div className="text-start ">
                            Total Harga : 
                        </div>
                        <div className="text-end">
                            Rp. {numberWithCommas(totalBayar)}
                        </div>
                    </div>
                    <button
                        type="button"
                        className="bg-blue-900 w-screen text-[22px] text-start py-2 pl-[48%]" 
                        onClick={() => submitTotal(totalBayar)}
                    >
                        Bayar
                    </button>
                </div>
            </div> 
        </>

    )
};
