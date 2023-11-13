import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { axiosRequest } from '../utils/token'


const apiBrands = 'http://localhost:3000/api/brands'
const apiProduct = 'http://localhost:3000/api/products'
const apiCotegory = 'http://localhost:3000/api/categories'
const apiSubCotegory = 'http://localhost:3000/api/subCategories'
// console.log(apiBrands);
// console.log(apiProduct);


// getBrand
export const getBrands = createAsyncThunk(
    "brands/getBrands",
    async () => {
        try {
            const { data } = await axiosRequest.get(apiBrands)
            // console.log(data);
            return data
        } catch (error) {
            console.error(error);
        }
    }
)

//addBrand
export const addBrand = createAsyncThunk(
    "brands/addBrand",
    async (e, { dispatch }) => {
        // const form = new FormData()
        // form.append("name",e.name)
        // form.append("img",e.img)
        try {
            const { data } = await axiosRequest.post(apiBrands, {
                name: e.name,
                img: e.img
            })
            console.log(e);
            dispatch(getBrands())
        } catch (error) {
            console.error(error);
        }
    }
)

//editbrand
export const editBrand = createAsyncThunk(
    "brands/editBrand",
    async (e, { dispatch }) => {

        try {
            const { data } = await axiosRequest.put(`${apiBrands}/${e.id}`, e)
            console.log(e);
            dispatch(getBrands())
        } catch (error) {
            console.error(error);
        }
    }
)



//deleteBrand
export const deleteBrand = createAsyncThunk(
    "brands/deleteBrand",
    async (id, { dispatch }) => {
        try {
            const { data } = await axiosRequest.delete(`${apiBrands}/${id}`)
            dispatch(getBrands())
            return data
        } catch (error) {
            console.error(error);
        }
    }
)

// getProduct
export const getProduct = createAsyncThunk(
    "products/getProduct",
    async () => {
        try {
            const { data } = await axiosRequest.get(apiProduct)
            // console.log(data);
            return data
        } catch (error) {
            console.error(error);
        }
    }
)

// addProduct
export const addProduct = createAsyncThunk(
    "products/addSubCotegory",
    async (e, { dispatch }) => {
        try {
            const { data } = await axiosRequest.post(apiSubCotegory, {
                name: e.name,
                img: e.img,
                categoryId: e.categoryId, 
                brands: e.brands,
                subCategoryId: e.brands,

            })
            dispatch(getProduct())
        } catch (error) {
            console.error(error);
        }
    }
)

//deleteProduct
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, { dispatch }) => {
        try {
            const { data } = await axiosRequest.delete(`${apiProduct}/${id}`)
            dispatch(getProduct())
            return data
        } catch (error) {
            console.error(error);
        }
    }
)

// getCotegory
export const getCotegory = createAsyncThunk(
    "products/getCotegory",
    async () => {
        try {
            const { data } = await axiosRequest.get(apiCotegory)
            // console.log(data);
            return data
        } catch (error) {
            console.error(error);
        }
    }
)



//addCotegory
export const addCotegory = createAsyncThunk(
    "products/addCotegory",
    async (e, { dispatch }) => {
        try {
            const { data } = await axiosRequest.post(apiCotegory, {
                name: e.name,
                img: e.img
            })
            dispatch(getCotegory())
        } catch (error) {
            console.error(error);
        }
    }
)

//editCotegory
export const editCotegory = createAsyncThunk(
    "brands/editCotegory",
    async (e, { dispatch }) => {

        try {
            const { data } = await axiosRequest.put(`${apiCotegory}/${e.id}`, e)
            // console.log(e);
            dispatch(getCotegory())
        } catch (error) {
            console.error(error);
        }
    }
)


//deleteCotegory
export const deleteCotegory = createAsyncThunk(
    "products/deleteCotegory",
    async (id, { dispatch }) => {
        try {
            const { data } = await axiosRequest.delete(`${apiCotegory}/${id}`)
            dispatch(getCotegory())
            return data
        } catch (error) {
            console.error(error);
        }
    }
)

//getSubCotegories
export const getSubCotegories = createAsyncThunk(
    "products/getSubCotegories",
    async () => {
        try {
            const { data } = await axiosRequest.get(apiSubCotegory)
            // console.log(data);
            return data
        } catch (error) {
            console.error(error);
        }
    }
)


// addSubCotegory
export const addSubCotegory = createAsyncThunk(
    "products/addSubCotegory",
    async (e, { dispatch }) => {
        try {
            const { data } = await axiosRequest.post(apiSubCotegory, {
                name: e.name,
                img: e.img,
                categoryId: [e.categoryId], 
                brands: [e.brands],

            })
            dispatch(getSubCotegories())
        } catch (error) {
            console.error(error);
        }
    }
)

// editSubCategory
export const editSubCategory = createAsyncThunk(
    "products/editSubCategory",
    async (e, { dispatch }) => {

        try {
            const { data } = await axiosRequest.put(`${apiSubCotegory}/${e.id}`, e)
            console.log(data);
            dispatch(getSubCotegories())
        } catch (error) {   
            console.error(error);
        }
    }
)

//deleteSubcotegiry
export const deleteSubcotegiry = createAsyncThunk(
    "products/deleteSubcotegiry",
    async (id, { dispatch }) => {
        try {
            const { data } = await axiosRequest.delete(`${apiSubCotegory}/${id}`)
            dispatch(getSubCotegories())
            return data
        } catch (error) {
            console.error(error);
        }
    }
)

export const AdminPanel = createSlice({
    name: 'products',
    initialState: {
        brands: [],
        products: [],
        cotegory: [],
        subCotegory: [],
        isLoading: false,

    },
    reducers: {

        handleChange: (state, action) => {
            state[action.payload.value] = action.payload.answer
            // console.log(action.payload.answer);
        },

    },
    extraReducers: (builder) => {

        //Brands
        builder.addCase(getBrands.pending, (state, action) => { })
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.brands = action.payload
        })
        builder.addCase(getBrands.rejected, (state, action) => { 'errror' })

        //addBrand
        builder.addCase(addBrand.pending, (state, action) => { })
        builder.addCase(addBrand.fulfilled, (state, action) => {
            state.brands = action.payload
        })
        builder.addCase(addBrand.rejected, (state, action) => { 'errror' })


        // Products 
        builder.addCase(getProduct.pending, (state, action) => { })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.products = action.payload
        })
        builder.addCase(getProduct.rejected, (state, action) => { 'errror' })

        // //addProduct
        // builder.addCase(addProduct.pending, (state, action) => { })
        // builder.addCase(addProduct.fulfilled, (state, action) => {
        //     state.products = action.payload
        // })


        //cotegory
        builder.addCase(getCotegory.pending, (state, action) => { })
        builder.addCase(getCotegory.fulfilled, (state, action) => {
            state.cotegory = action.payload
        })
        builder.addCase(getCotegory.rejected, (state, action) => { 'errror' })

        // addCotegory
        builder.addCase(addCotegory.pending, (state, action) => { })
        builder.addCase(addCotegory.fulfilled, (state, action) => {
            state.cotegory = action.payload
        })
        builder.addCase(addCotegory.rejected, (state, action) => { 'errror' })

        //subCotegory
        builder.addCase(getSubCotegories.pending, (state, action) => { })
        builder.addCase(getSubCotegories.fulfilled, (state, action) => {
            state.subCotegory = action.payload
        })
        builder.addCase(getSubCotegories.rejected, (state, action) => { 'errror' })

        //addSubCotegory
        builder.addCase(addSubCotegory.pending, (state, action) => { })
        builder.addCase(addSubCotegory.fulfilled, (state, action) => {
            state.subCotegory = action.payload
        })
        builder.addCase(addSubCotegory.rejected, (state, action) => { 'errror' })
    }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, } = AdminPanel.actions

export default AdminPanel.reducer