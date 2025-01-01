// Register a new company

import Company from "../models/Company.js"
import bcrypt from 'bcrypt'

export const registerCompany = async(req,res)=>{

    const {name, email, password} = req.body
    const imageFile = req.file

    if (!name || ! email || !password || !imageFile) {
        return res.json({success:false, message:"Missing Details"})
    }

    try {
        const companyExists = await Company.findOne({email})

        if (companyExists) {
            return res.json({success: false, message: 'company already registered'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
    } catch (error) {
        
    }

}

// company login

export const loginCompany = async()=>{

}

// get company data
export const getCompanyData = async(req,res)=>{
     
}

// post a new job

export const postJob = async(req,res)=>{

}

// get company job applicants

export const getCompanyJobApplicants = async(req,res)=>{

}

// get company posted jobs

export const getCompanyPostedJobs = async(req,res)=>{

}

// change job application status

export const ChangeJobApplicationStatus = async(req,res)=>{

}

// change job visibility

export const changeVisibility = async(req,res)=>{

}