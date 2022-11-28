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

//app apis

export const userSignUp = async (userData) => {

    console.log(userData);

    let user = await API.post('/auth/signup', userData)

    return user;
}

export const otpVerify = async (signupData) => {

    console.log(signupData);
    let res = await API.post('/auth/otpverify', signupData)

    return res;
}

export const onBoarding = async (onBoardData) => {

    let res = await API.post('/auth/onboarding', onBoardData)
    return res
}

export const userSignIn = async (userData) => {
    let res = await API.post("/auth/login", userData)
    return res;
}


export const getCompanyData = async (cname) => {
    let res = await API.post("/company/getreport", {
        cname
    })
    return res;
}

export const storeShares = async (sharedata) => {

    let res = await API.post("/transaction/sell", sharedata)
    return res;
}

export const scoopsData = async () => {
    let res = await API.get("/getnews/getscoop")
    return res;
}

export const newsData = async (company) => {
    let res = await API.post("/getnews/get", {
        company
    })
    return res;
}

export const getInvesData = async (company) => {
    let res = await API.post("/investments/getinv", {
        company
    })
    return res;
}

export const getSharePriceHis = async (company) => {
    let res = await API.post("/investments/getshareprice", {
        company
    })
    return res;
}

export const getLastSharePrice = async (company) => {
    let res = await API.post("/investments/lastshareprice", {
        company
    })
    return res;
}

export const agreement = async (onBoardData) => {

    let res = await API.post('/auth/agreement', onBoardData)
    return res
}

export const emailfp = async (email) => {

    let res = await API.post('/auth/forgetPassword', email)
    return res
}

export const otpfp = async (otp) => {

    let res = await API.post('/auth/fpotpverify', otp)
    return res
}

export const passfp = async (newpass) => {

    let res = await API.post('/auth/resetpassword', newpass)
    return res
}

export const holdings = async ()=>{
    let res = await API.get('/user/dashboard')
    return res;
}

export const sellbuyreq = async (sellbuydetails)=>{
    let res=await API.post("/transaction/sellcompany",sellbuydetails)
    console.log(sellbuydetails);
    return res;
}

export const  getOpenOffer =async (userDetails)=>{
    let res=await API.post("/user/openoffer",userDetails);
    return res;
}

export const  acceptOfferTrans =async (offerDetails)=>{
    let res=await API.post("/user/updatestatus",offerDetails);
    return res;
}

export const bidaskFetch =async (companyDetails)=>{
    let res=await API.post("/transaction/bidaskspread",companyDetails);
    // console.log(companyDetails);
    return res;
}

export const userTableData = async () => {


    let userdata = await API.get('/transaction/getUserInv')

    return userdata;
}

export const inventoryTableData = async () => {


    let userdata = await API.get('/transaction/cmpShareDetail')

    return userdata;
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

export const getSensexData=async ()=>{
    let res= await API.get("/sensex/get")
    return res
}

export const checkCname = async (cDetails) => {
    let res = await API.post("/finance/check", cDetails)
    return res;
}

export const checkbid = async (cDetails) => {
    let res = await API.post("/finance/getbidprice", cDetails)
    return res;
}