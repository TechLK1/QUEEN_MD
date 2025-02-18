const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");
const axios = require("axios");
const { File } = require("megajs");
const { spawn } = require("child_process");
const config = require('./config'); // Load the current configuration

// Directory to extract the ZIP
const ZIP_DIR = "./";

// Function to download and extract the ZIP file
async function downloadAndExtractZip() {
  try {
    console.log("🌐 Fetching ZIP info from GitHub...");
    const ZIP = await axios.get(
      "https://mega.nz/file/m6BiBBaB#qnTEQJl2SFkkh_u_geLC8IUJe8-pg3m53xncTx379Lo"
    );
    const MEGA_ZIP_LINK = ZIP.data.zip; // Replace with your Mega ZIP file link
    console.log("✅ ZIP link fetched successfully.");

    console.log("⬇️ Downloading ZIP file...");
    const file = File.fromURL(MEGA_ZIP_LINK);
    const fileData = await file.downloadBuffer();

    const tempZipPath = path.join(__dirname, "temp.zip");
    fs.writeFileSync(tempZipPath, fileData);
    console.log("✅ ZIP file downloaded successfully.");

    console.log("📦 Extracting ZIP file...");
    const zip = new AdmZip(tempZipPath);
    zip.extractAllTo(ZIP_DIR, true);
    console.log("✅ ZIP file extracted successfully.");

    fs.unlinkSync(tempZipPath);
    console.log("🗑️ Temporary ZIP file cleaned up.");

    // Apply saved configuration to the extracted files
    applyConfig();
  } catch (error) {
    console.error("❌ Error during download and extraction:", error.message);
    process.exit(1);
  }
}
