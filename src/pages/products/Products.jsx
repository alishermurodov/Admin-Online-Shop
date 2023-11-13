import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getBrands, getCotegory, getProduct, getSubCotegories } from '../../reducer/AdminPanel';
import { store } from '../../store/store';
import { IconButton, TextField } from '@mui/material';
import { singleFile } from '../../utils/files';

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { EffectCube, Pagination } from 'swiper/modules';


//mui
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from "@mui/icons-material/Close";

//mui select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//mui modal
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  border: 'none',
};

const Products = () => {

  const [editModalProduct, setEditModalProduct] = useState(false)

  const [search, setSearch] = useState("")

  // addModal 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [inpAdd, setInpAdd] = useState("");
  const [inpAddPrice, setInpAddPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [photoBase, setPhotoBase] = useState(null);


  const products = useSelector((store) => store.AdminPanel.products)
  const subCotegory = useSelector((store) => store.AdminPanel.subCotegory);
  const cotegorys = useSelector((store) => store.AdminPanel.cotegory);
  const brands = useSelector((store) => store.AdminPanel.brands);
  // console.log(products);



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCotegory());
    dispatch(getSubCotegories());
    dispatch(getBrands())
  }, [dispatch]);
  return (
    <div className='w-[85%] mx-auto '>

      <div className='my-[20px] ml-[12px]'>
        <TextField
          label="Search Products"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button onClick={handleOpen} className=' fixed ml-[-50px] w-[40px] h-[40px] bg-[#000] text-[#fff] text-[30px] rounded-[50%] flex items-center justify-center hover:shadow-slate-700'>+</button>

      <div className="flex justify-between flex-wrap gap-[5px]">
        {
          products?.
            filter((e) => e.name.toLowerCase().includes(search.toLowerCase())).
            map((e, i) => {

              return (
                <div key={e.id} className="w-[90%] sm:w-[42%] md:w-[31%] lg:w-[270px] mx-auto rounded-[5px] mb-[50px] overflow-hidden flex flex-col justify-evenly border-[1px] border-[#d8d4d4]" >
                  <div className="h-[50%]  py-[3px]">
                    <Swiper
                      effect={'cube'}
                      grabCursor={true}
                      // navigation={true}

                      pagination={true}
                    // modules={[EffectCube, Pagination]}
                    // className="mySwiper"
                    >

                      {
                        e?.media.map((el) => {
                          return (
                            <SwiperSlide>
                              <img src={"http://localhost:3000/" + el.src} className='w-[60%] h-[160px] mx-auto mt-[30px] object-contain' alt={el.name} />
                            </SwiperSlide>

                          )
                        })
                      }

                    </Swiper>
                  </div>

                  <div className="p-[20px]">
                    <h3 className='mb-[20px] text-[23px] font-[600]'>{e.name}</h3>
                    <hr className='py-[20px]' />
                    <div className="flex gap-[20px] ">
                      <IconButton>
                        <BorderColorIcon onClick={() => setEditModalProduct(true)} className='bg-[orange] w-[90px] py-[4px] rounded-[3px] text-[#fff] hover:shadow-lg hover:transition-all hover:duration-300'>Edit</BorderColorIcon>
                      </IconButton>
                      <IconButton>
                        <DeleteOutlineIcon onClick={() => dispatch(deleteProduct(e.id))} className='bg-[#000] w-[90px] py-[4px] rounded-[3px] text-[#fff] hover:shadow-lg hover:transition-all hover:duration-300'>Delete</DeleteOutlineIcon>
                      </IconButton>
                    </div>
                  </div>
                </div>
              )
            })
        }
      </div>
      {
        editModalProduct ?
          <div className="absolute top-[100px] left-[30%] flex justify-between gap-[13px] p-[20px] bg-[#9c9595] rounded-[9px]">
            <input type="text" />
            <input type="file" multiple />
            <button className='bg-[#000] w-[90px] py-[4px] rounded-[3px] text-[#fff] hover:shadow-lg hover:transition-all hover:duration-300'>Save</button>
            <button onClick={() => setEditModalProduct(false)} className='bg-[#000] w-[90px] py-[4px] rounded-[3px] text-[#fff] hover:shadow-lg hover:transition-all hover:duration-300'>Close</button>
          </div> : null
      }
      {/* {
        addModal ?
          <div className="absolute top-[100px] left-[30%] flex justify-between gap-[13px] p-[20px] bg-[#9c9595] rounded-[9px]">
            <input value={inpAdd} onChange={(e) => { setInpAdd(e.target.value) }} type="text" />
            <input type="file" onChange={(event) => {
              console.log(event.target.files[0])
              setPhotoBase(event.target.files[0]) 
            }
            } />
            <button onClick={async () => {
              let formdata = new FormData()
              formdata.append("file", photoBase)  
              const avatar = await singleFile(formdata)
              dispatch(addProduct({
                "name": inpAdd,
                "img": avatar.img
              })),
                console.log(photoBase)
              setInpAdd("")
              setAddModal(false)
            }} className='bg-[#000] w-[90px] py-[4px] rounded-[3px] text-[#fff] hover:shadow-lg hover:transition-all hover:duration-300'>Save</button>
            <button onClick={() => setAddModal(false)} className='bg-[#000] w-[90px] py-[4px] rounded-[3px] text-[#fff] hover:shadow-lg hover:transition-all hover:duration-300'>Close</button>
          </div> : null
      } */}

      {
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <div className="flex justify-between items-center mb-[17px]">
              <h3 className='font-[500] text-[19px]'>Sub Categories</h3>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </div>
            <hr className='my-[20px]' />
            <div className="lg:flex justify-between gap-2">
              <div className="lg:w-[50%]">
                <TextField
                  sx={{ width: '100%', marginBottom: '14px' }}
                  label="name"
                  value={inpAdd}
                  onChange={(event) => setInpAdd(event.target.value)}
                  variant="outlined"
                />

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    sx={{ marginBottom: '14px' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCategory}
                    label="Category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {
                      cotegorys?.map((elem) => {
                        return (
                          <MenuItem value={elem.name} >
                            {elem?.name}
                          </MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Brands</InputLabel>
                  <Select
                    sx={{ marginBottom: '14px' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedBrand}
                    label="Brands"
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    {brands?.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
                        {e.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="lg:w-[50%]">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                  <Select
                    sx={{ marginBottom: '14px' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedBrand}
                    label="Sub Category"
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    {subCotegory?.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
                        {e.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  sx={{ width: '100%', marginBottom: '14px' }}
                  label="Price"
                  value={inpAddPrice}
                  onChange={(event) => setInpAdd(event.target.value)}
                  variant="outlined"
                />

               
              </div>
            </div>
            <form className='flex justify-center text-[#fff]'>
                  <label className='input-file'>
                    <input type="file" onChange={(event) => {
                      console.log(event.target.files[0])
                      setPhotoBase(event.target.files[0])
                    }} />
                    <p>Choose Image</p>
                  </label>
                </form>
            <button onClick=
              {async () => {
                let formdata = new FormData()
                formdata.append("file", photoBase)
                const avatar = await singleFile(formdata)
                dispatch(addSubCotegory({
                  "name": inpAdd,
                  "img": avatar.img,
                  "brands": selectedBrand,
                  "categoryId": selectedCategory
                })),
                  console.log(photoBase)
                setInpAdd("")
                setAddModal(false)
              }}
              className='mt-[14px] w-[60%] mx-[20%] h-[41px] rounded-[4px] bg-[#006eff] border-none text-[#fff] text-[18px]'>Save</button>
          </Box>
        </Modal>
      }
    </div>
  )
}

export default Products