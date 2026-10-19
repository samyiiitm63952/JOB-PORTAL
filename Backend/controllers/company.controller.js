import { Company } from "../models/company.model.js"
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"
export const registerCompany = async (req, res) => {
    try {
        const { companyName, description } = req.body;
        if (!companyName) {
            return res.status(400).json({ message: "Company name is required" })
        }
        let company = await Company.findOne({ name: companyName })
        if (company) {
            return res.status(400).json({ message: "Company already exists" });
        }
        let newCompany = new Company({
            name: companyName,
            description,
            userId: req.id
        })
        newCompany.save();
        return res.status(201).json({
            message: "Company created successfully",
            company: newCompany,
            success: true
        })
    } catch (err) {
        console.error(err);
    }
};
export const getAllCompanies = async (req, res) => {
    try {
        const userId = req.id; //loggedin User id
        const companies = await Company.find({ userId: req.id });
        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found"
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    }
    catch (err) {
        console.error(err);
    }
}
export const getcompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "company not found"
            })
        }
        return res.status(200).json({ company, success: true })
    }
    catch (error) {
        console.error(error);
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        const updateData = { name, description, website, location };

        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            updateData.logo = cloudResponse.secure_url;
        }
        
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
            new: true
        });
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company updated",
            company,
            success: true
        })
    }
    catch (err) {
        console.error(err);
    }
}