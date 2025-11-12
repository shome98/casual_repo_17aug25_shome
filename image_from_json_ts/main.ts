import * as fs from "fs";
import * as path from "path";

// --- Type Definition ---
interface ImageItem {
  id: string;
  dataUrl: string;
  prompt: string;
  seed: number;
  resolution: string;
  style: string;
  timestamp: string;
}

// --- Configuration ---
const JSON_FILE_PATH = "ai-images-2025-11-11T05-17-39_shoes-35.json";
const OUTPUT_DIR = "./retrieved_images";

// --- Core Functionality ---

/**
 * Decodes a data URL and saves it as a file.
 * @param dataUrl The full data URL string from the JSON.
 * @param outputFileName The name of the file to save.
 */
function decodeAndSaveImage(dataUrl: string, outputFileName: string): void {
  // 1. Isolate the Base64 string (after 'data:image/jpeg;base64,')
  const parts = dataUrl.split(",");
  if (parts.length !== 2) {
    console.error(`Invalid data URL format for file ${outputFileName}`);
    return;
  }
  const base64String = parts[1]?.trim();
  if (base64String) {
    try {
      // 2. Decode the Base64 string into a binary Buffer
      const imageBuffer = Buffer.from(base64String, "base64");

      // 3. Save the Buffer to a file
      fs.writeFileSync(outputFileName, imageBuffer);

      console.log(`✅ Successfully saved: ${outputFileName}`);
    } catch (error) {
      console.error(`❌ Error saving ${outputFileName}:`, error);
    }
  } else {
    console.error("wrong url");
  }
}

/**
 * Main function to read the JSON file and process the images.
 */
function processImagesFromFile(nameofFile?: string): void {
  if (!fs.existsSync(JSON_FILE_PATH)) {
    console.error(`Error: The file '${JSON_FILE_PATH}' was not found.`);
    return;
  }

  try {
    // Read the file contents and parse the JSON
    const fileContent = fs.readFileSync(JSON_FILE_PATH, "utf8");
    const jsonData: ImageItem[] = JSON.parse(fileContent);

    // Create the output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
      console.log(`Created output directory: ${OUTPUT_DIR}`);
    }

    // Loop through all items and save the images
    jsonData.forEach((item, index) => {
      // Use the seed/index to create a unique file name
      //const fileName = `${nameofFile}_${item.seed || index + 1}.jpeg`;
      const fileName = `${nameofFile}_${index + 1}.jpeg`;
      const fullPath = path.join(OUTPUT_DIR, fileName);

      decodeAndSaveImage(item.dataUrl, fullPath);
    });
  } catch (error) {
    console.error(
      `An unexpected error occurred while processing the file:`,
      error
    );
  }
}

// Run the main process
processImagesFromFile("shoe");
