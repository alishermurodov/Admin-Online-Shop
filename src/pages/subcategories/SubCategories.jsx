import React, { useEffect, useState } from 'react';
import '../../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { addSubCotegory, deleteSubcotegiry, editSubCategory, getBrands, getCotegory, getSubCotegories } from '../../reducer/AdminPanel';
import { IconButton, TextField } from '@mui/material';

//mui
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from "@mui/icons-material/Close";

//mui modal
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

//mui select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { singleFile } from '../../utils/files';

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

const SubCategories = () => {

  // addModal 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [inpAdd, setInpAdd] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [photoBase, setPhotoBase] = useState(null);


  // editModal 
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [editInp, setEditInp] = useState("");
  const [editImg, setEditImg] = useState(null);
  const [selectedCategoryEdit, setSelectedCategoryEdit] = useState('');
  const [selectedBrandEdit, setSelectedBrandEdit] = useState('');
  const [idx, setIdx] = useState(null);

  const subCotegory = useSelector((store) => store.AdminPanel.subCotegory);
  const cotegorys = useSelector((store) => store.AdminPanel.cotegory);
  const brands = useSelector((store) => store.AdminPanel.brands);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCotegory());
    dispatch(getSubCotegories());
    dispatch(getBrands())
  }, [dispatch]);

  return (
    <div className='w-[85%] mx-auto '>
      <button onClick={handleOpen} className=' fixed ml-[-50px] w-[40px] h-[40px] bg-[#000] text-[#fff] text-[30px] rounded-[50%] flex items-center justify-center hover:shadow-slate-700'>+</button>
      <div className="flex gap-[30px] flex-wrap">
        {
          subCotegory?.map((e, i) => {
            return (
              <div key={e.id} className="w-[90%] sm:w-[42%] md:w-[31%] lg:w-[270px] rounded-[3px] mb-[50px] overflow-hidden flex flex-col justify-evenly border-[1px] border-[#d8d4d4]">
                <img src={"http://localhost:3000/" + subCotegory[i]?.img} className=' w-[50%] h-[40%] mx-auto mt-[30px] object-contain overflow-hidden' alt={e.name} />
                <div className="p-[20px]">
                  <h3 className='mb-[20px] text-[28px] font-[600]'>{e.name}</h3>

                  <hr className='my-[20px]' />

                  <div className="flex gap-[20px]">
                    <IconButton>
                      <BorderColorIcon onClick={() => {
                        setOpenEdit(true)
                        setIdx(e.id)
                        setEditInp(e.name)
                        setEditImg("http://localhost:3000/" + subCotegory[i]?.img)
                        setSelectedCategoryEdit(e.categoryId[0])
                        setSelectedBrandEdit(e.brands[0])
                      }} className='bg-[orange] w-[90px] py-[4px] rounded-[3px] text-[#fff] hover:shadow-lg hover:transition-all hover:duration-300'>Edit</BorderColorIcon>
                    </IconButton>
                    <IconButton>
                      <DeleteOutlineIcon onClick={() => dispatch(deleteSubcotegiry(e.id))} className='bg-[#000] w-[90px] py-[4px] rounded-[3px] text-[#fff] hover:shadow-lg hover:transition-all hover:duration-300'>Delete</DeleteOutlineIcon>
                    </IconButton>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>


      {
        openEdit ?
          <div className="">
            <Modal
              open={openEdit}
              onClose={handleCloseEdit}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleModal}>
                <div className="flex justify-between items-center mb-[17px]">
                  <h3 className='font-[500] text-[19px]'>Sub Categories</h3>
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleCloseEdit}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
                <hr className='my-[20px]' />
                <TextField
                  sx={{ width: '100%', marginBottom: '14px' }}
                  label="name"
                  value={editInp}
                  onChange={(event) => setEditInp(event.target.value)}
                  variant="outlined"
                />

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    sx={{ marginBottom: '14px' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCategoryEdit}
                    label="Category"
                    onChange={(e) => setSelectedCategoryEdit(e.target.value)}
                  >
                    {
                      cotegorys?.map((elem) => {
                        return (
                          <MenuItem value={elem.id} >
                            {elem.name}
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
                    value={selectedBrandEdit}
                    label="Brands"
                    onChange={(e) => setSelectedBrandEdit(e.target.value)}
                  >
                    {brands?.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
                        {e.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div className="">
                  <form className='ml-[10%] text-[#fff]'>
                    <label className='input-file'>
                      <input type="file" onChange={(event) => {
                        // console.log(event.target.files[0])
                        setPhotoBase(event.target.files[0])
                      }} />
                      <p>Choose Image</p>
                    </label>
                  </form>
                  <div className="my-[12px]">
                    <img src={editImg} className='object-contain mx-auto w-[50%]' alt="" />
                  </div>
                </div>

                <button onClick=
                  {async () => {
                    if (!photoBase) {
                      const obj = {
                        id: idx,
                        name: editInp,
                        brands: selectedBrandEdit,
                        categoryId: selectedCategoryEdit
                      }
                      // console.log(obj);
                      dispatch(editSubCategory({ ...obj }))
                    }
                    let formdata = new FormData()
                    formdata.append("file", photoBase)
                    const avatar = await singleFile(formdata)
                    dispatch(editSubCategory({
                      "id": idx,
                      "name": editInp,
                      "img": avatar.img,
                      "brands": selectedBrandEdit,
                      "categoryId": selectedCategoryEdit
                    }))
                    //   console.log(photoBase)
                    setInpAdd("")
                    // setAddModal(false)
                    setOpenEdit(false)
                  }}
                  className='mt-[14px] w-[60%] mx-[20%] h-[41px] rounded-[4px] bg-[#006eff] border-none text-[#fff] text-[18px]'>Save</button>
              </Box>
            </Modal></div> : null
      }

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
  );
};

export default SubCategories;
