import fs from "fs";

export const testData = {
    validContactFormData: JSON.parse(fs.readFileSync("data/validContactFormData.json", "utf-8")),
    // invalidEmails: JSON.parse(fs.readFileSync("data/invalidEmails.json", "utf-8")),
    // invalidCaptchas: JSON.parse(fs.readFileSync("data/invalidCaptchas.json", "utf-8"))
};