import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Components/card';
import { API_URL } from './Utils/Constants';
import swal from 'sweetalert';
import Hasil from './Components/Hasil';
import Daftarmenu from './Components/daftarMenu';


function App () {

    const [isLoading, setIsLoading] = useState(false);
    const [menus, setMenus] = useState([]);
    const [selectCategory, setSelectCategory] = useState([]);
    const [keranjang, setKeranjang] = useState([]);

    useEffect(() => {
        produk();
    }, [menus])

    const produk = () => {
        axios.get( API_URL+"/products")
        .then ((res)=>{
            const menus = res.data;
            setMenus(menus)
        })
        .catch((err)=>{
            console.log("error ya", err);
        })

        axios.get( API_URL+"/keranjangs")
        .then ((res)=>{
            const keranjang = res.data;
            setKeranjang(keranjang)
            // console.log();
        })
        .catch((err)=>{
            console.log("error ya", err);
        });
    }

    const changeCategory = (value) => {
      setSelectCategory(value)
      setMenus([''])

      axios.get( API_URL+"/products?category.nama="+ value)
        .then ((res)=>{
          setMenus(res.data);
        })
        .catch((err)=>{
            console.log("error ya", err);
        })
    }

  const masukKeranjang = (value) => {
    axios.get( API_URL+"/keranjangs?product.id="+ value.id)
        .then ((res)=>{
            if(res.data.length === 0){
              const keranjang ={
                jumlah: 1,
                total_harga: value.harga,
                product: value
              }
              axios.post( API_URL + "/keranjangs", keranjang)
                  .then ((res)=>{
                      swal({
                        title: "Sukses Masuk Keranjang",
                        text: "Sukses Masuk Keranjang "+ keranjang.product.nama,
                        icon: "success",
                        button: false,
                        timer:1500,
                      });
                  })
                  .catch((err)=>{
                      console.log("error ya", err);
                  })
            } else {
              const keranjang ={
                jumlah: res.data[0].jumlah+1,
                total_harga: res.data[0].total_harga+value.harga,
                product: value
              }

              axios.put( API_URL+"/keranjangs/"+ res.data[0].id , keranjang)
              .then ((res)=>{
                  swal({
                    title: "Sukses Masuk Keranjang",
                    text: "Sukses Masuk Keranjang "+ keranjang.product.nama,
                    icon: "success",
                    button: false,
                    timer:1500,
                  });
              })
              .catch((err)=>{
                  console.log("error ya", err);
              })
              .finally(()=>{
                produk()
              })
            }
        })
        .catch((err)=>{
            console.log("error ya", err);
        })
  }

  return (
    <>
      <div className="w-screen h-screen m-0 p-0 hidden 2xl:block font-serif font-bold ">
        <div className="w-screen bg-gradient-to-l from-blue-700 to-slate-800 top-0 fixed">
            <div className=" mx-auto text-[42px] text-white ">
                <div className="p-4">
                    NawaKasir App
                </div>
            </div>
        </div>
        <div className="w-screen h-screen grid grid-cols-12 pt-[90px]">
          <div className=" col-span-9 p-10 overflow-y-scroll">
            <div className="grid grid-cols-4 gap-2">
                {menus && menus.map((menu)=>{
                    return (
                        <Card
                            key={menu.id}
                            menu={menu}
                            masukKeranjang={masukKeranjang}
                        />
                    )
                })}
            </div>
          </div>
          <div className="col-span-3 bg-slate-200">
            <Hasil 
              keranjang={keranjang}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 w-full h-screen 2xl:hidden flex bg-black">
        <div className="text-white text-2xl text-center leading-snug font-medium my-auto">
            Sorry, this page only supported on 1024px screen or above
        </div>
      </div>
    </>
  )
}

export default App
