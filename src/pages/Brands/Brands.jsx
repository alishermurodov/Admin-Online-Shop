import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../store/store'
import { addBrand, deleteBrand, editBrand, getBrands } from '../../reducer/AdminPanel'
import { FileToBase64 } from '../../utils/FileToBase64'
import { singleFile } from '../../utils/files'
import { IconButton } from '@mui/material'

//mui
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Brands = () => {

    const [editModalBrand, setEditModalBrand] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [inpAdd, setInpAdd] = useState("")
    const [photoBase, setPhotoBase] = useState(null)

    const [editInp, setEditInp] = useState("")
    const [editImg, setEditImg] = useState(null)
    const [idx, setIdx] = useState(null)

    const brands = useSelector((store) => store.AdminPanel.brands)


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands());
    }, [dispatch]);

    return (
        <div className='w-[85%] mx-auto '>
            <button onClick={() => setAddModal(true)} className=' fixed ml-[-50px] w-[40px] h-[40px] bg-[#000] text-[#fff] text-[30px] rounded-[50%] flex items-center justify-center hover:shadow-slate-700'>+</button>

            <div className="flex justify-between flex-wrap gap-[5px]">
                {
                    brands?.map((e, i) => {
                        return (
                            <div key={e.id} className="w-[90%] sm:w-[42%] md:w-[31%] lg:w-[270px] mx-auto rounded-[5px] mb-[50px] overflow-hidden border-[1px] border-[#d8d4d4]">
                                <img src={"http://localhost:3000/" + brands[i]?.img} className='w-[50%] h-[40%] rounded-[50%] mx-auto mt-[30px] object-contain overflow-hidden' alt={e.name} />
                                <div className="p-[20px]">
                                    <h3 className='mb-[20px] text-[23px] font-[600]'>{e.name}</h3>
                                    <hr />
                                    <div className="flex gap-[20px] my-[20px]">
                                        <IconButton>
                                            <BorderColorIcon onClick={() => {
                                                setEditModalBrand(true)
                                                setIdx(e.id)
                                                setEditInp(e.name)
                                                setEditImg("http://localhost:3000/" + e?.img)
                                            }} className='bg-[#ffb700] w-[100px] h-[100px] py-[4px] rounded-[3px] text-[#fff] hover:shadow-lg hover:transition-all hover:duration-300'>Edit</BorderColorIcon>
                                        </IconButton>
                                        <IconButton>
                                            <DeleteOutlineIcon onClick={() => dispatch(deleteBrand(e.id))} className='bg-[#000] w-[70px] py-[4px] rounded-[3px] text-[#fff] hover:shadow-lg hover:transition-all hover:duration-300'>Delete</DeleteOutlineIcon>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                editModalBrand ?
                    <div className="fixed top-[100px] left-[30%] flex justify-between gap-[13px] p-[20px] bg-[#9c9595] rounded-[9px]">
                        <input value={editInp} onChange={(event) => setEditInp(event.target.value)} type="text" />
                        <input type="file" onChange={(e) => setPhotoBase(e.target.files[0])} />
                        <img src={photoBase} alt="" />
                        <button onClick={async () => {
                            if (!photoBase) {
                                const obj = {
                                    id: idx,
                                    name: editInp,
                                    img: editImg
                                }
                                dispatch(editBrand({
                                    ...obj
                                }))
                            }
                            else {
                                const formdata = new FormData()
                                formdata.append("file", photoBase)
                                const image = await singleFile(formdata)
                                dispatch(editBrand({
                                    id: idx,
                                    name: editInp,
                                    img: image.img
                                }))
                            }
                            setEditModalBrand(false)

                        }} className='bg-[#000] w-[90px] py-[4px] rounded-[3px] text-[#fff] hover:shadow-lg hover:transition-all hover:duration-300'>Save</button>
                        <button onClick={() => setEditModalBrand(false)} className='bg-[#000] w-[90px] py-[4px] rounded-[3px] text-[#fff] hover:shadow-lg hover:transition-all hover:duration-300'>Close</button>
                    </div> : null
            }
            {
                addModal ?
                    <div className="fixed  top-[100px] left-[30%] flex justify-between gap-[13px] p-[20px] bg-[#9c9595] rounded-[9px]">
                        <input value={inpAdd} onChange={(e) => { setInpAdd(e.target.value) }} type="text" />
                        <input type="file" onChange={(event) => {
                            console.log(event.target.files[0])
                            setPhotoBase(event.target.files[0])
                        }
                        } />
                        <button onClick={async () => {
                            if (!photoBase) return alert("Please select")
                            let formdata = new FormData()
                            formdata.append("file", photoBase)
                            const avatar = await singleFile(formdata)

                            dispatch(addBrand({
                                "name": inpAdd,
                                "img": avatar.img
                            })),
                                console.log(photoBase)
                            setInpAdd("")
                            setAddModal(false)
                        }} className='bg-[#000] w-[90px] py-[4px] rounded-[3px] text-[#fff] hover:shadow-lg hover:transition-all hover:duration-300'>Save</button>
                        <button onClick={() => setAddModal(false)} className='bg-[#000] w-[90px] py-[4px] rounded-[3px] text-[#fff] hover:shadow-lg hover:transition-all hover:duration-300'>Close</button>
                    </div> : null
            }
        </div>
    )
}
export default Brands