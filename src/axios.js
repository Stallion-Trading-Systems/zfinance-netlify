import axios from 'axios'

const API = axios.create({
    baseURL: 'https://zionn-stage.herokuapp.com/'
    //   baseURL:'https://zionn-prod.herokuapp.com/'
    // baseURL: 'http://localhost:8080/'
}) 

API.interceptors.request.use((req) => {
    if (localStorage.getItem('user')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }

    return req
})


export const userTableData = async () => {


    let userdata = await API.get('/transaction/getUserInv')

    return userdata;
}

export const inventoryTableData = async () => {


    let userdata = await API.get('/transaction/cmpShareDetail')

    return userdata;
}

export const userSignIn = async (userData) => {
    let res = await API.post("/auth/login", userData)
    return res;
}

export const userPageDetails = async (adminEmail, userUid) => {
    let res = await API.post(`/admin/users?c_id=${userUid}`, adminEmail)
    return res;
}

export const isAuth = async (email) => {
    let res = await API.post("/admin/check", email)
    return res;
}

export const updateUserData = async ({ user_name, email, u_id, phone, curr_employer, designation, tenure }) => {
    let res = await API.post("/admin/updateuser", { user_name, email, u_id, phone, curr_employer, designation, tenure })
    return res;
}

export const addNewUser = async ({user_name, email, phone, curr_employer, designation, tenure }) => {
    let res = await API.post("/admin/adduser", { user_name, email, phone, curr_employer, designation, tenure })
    return res;
}

export const addUserInv = async (sharedata) => {
    let res = await API.post("/admin/addadminInv", sharedata)
    return res;
}

export const updateDoc = async (sharedata) => {
    let res = await API.post("/admin/updatedoc", sharedata)
    return res;
}

export const updateDoe = async (sharedata) => {
    let res = await API.post("/admin/updatedoe", sharedata)
    return res;
}

export const getIssuerDetails = async (c_name)=>{
    let res=await API.post("/admin/getIssuerInv",c_name)
    return res
}

export const initiateTransaction = async (transactionDetails)=>{
    let res=await API.post("/admin/starttransaction",transactionDetails);
    return res;
}

export const updatePrice = async (sharedata) => {
    let res = await API.post("/admin/updatebidaskprice", sharedata)
    return res;
}

export const addGrant = async (grantdata) => {
    let res = await API.post("/finance/add", grantdata)
    return res;
}

export const getcData = async (cDetails) => {
    let res = await API.post("/finance/getshareinfo", cDetails)
    return res;
}

export const getChartData = async (cDetails) => {
    let res = await API.post("/finance/getvestinginfo", cDetails)
    return res;
}