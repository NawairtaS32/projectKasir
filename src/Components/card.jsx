import {numberWithCommas} from '../Utils/Uang';

export default function Card({
    menu,
    masukKeranjang
}) {
    return(
        <>
            <div className=" border-4 border-cyan-700 bg-blue-400" onClick={()=>masukKeranjang(menu)}>
                <div className="">
                    <img 
                        className='w-[400px] h-[300px] border-b-4 border-slate-700 '
                        variant="top"
                        src={"/src/images/"+
                            menu.category.nama.toLowerCase()+ 
                            "/"+ 
                            menu.gambar
                        } 
                        alt=""
                    />
                    <div className="p-2 mb-6">
                        <div className="text-[20px] mb-4">
                            {menu.nama} 
                        </div>

                        <div className="grid grid-cols-2 text-[20px]">
                            <div className="">
                                {menu.kode}
                            </div>
                            <div className=" text-end">
                                Rp. {numberWithCommas(menu.harga)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};