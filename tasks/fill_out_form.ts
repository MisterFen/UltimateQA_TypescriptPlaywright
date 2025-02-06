import { chromium } from "playwright";
import { FillingOutFormsPage } from "../pages/filling_out_forms_page";
import * as XLSX from "xlsx";
import * as path from "path";

// Define the expected structure of your contacts
interface MessageInfo {
    Name: string;
    Message: string;
}

(async () => {
    // Read Excel File
    const excelFilePath = path.resolve(__dirname, "../data/filling_out_forms_data.xlsx");
    const workbook = XLSX.readFile(excelFilePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const messagesInfo: MessageInfo[] = XLSX.utils.sheet_to_json<MessageInfo>(sheet); // 👈 Explicitly type the array

    // Launch Browser
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    const contactForm = new FillingOutFormsPage(page);

    // Process Each Contact
    for (const entry of messagesInfo) {
        console.log(`Processing: ${entry.Name} - ${entry.Message}`);

        await contactForm.navigate();
        await contactForm.fillForm(entry.Name, entry.Message);
        await contactForm.submitForm();
        await contactForm.getSuccessMessage().waitFor({ state: "visible", timeout: 5000 });
        const message = await contactForm.getSuccessMessage().textContent();
        console.log("Actual Success Message:", message);
    }

    // Close Browser
    await browser.close();
})();