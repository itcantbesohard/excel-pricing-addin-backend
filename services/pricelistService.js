import {loadLocalPricelist} from '../helpers/localPricelistHelper.js';
import {fetchPricelistFromSharePoint} from '../helpers/sharepointHelper.js'
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getPricelist(pricelistName) {

    try {
        const sharePointData = await fetchPricelistFromSharePoint(pricelistName);

        if (sharePointData) {

            const filePath = path.resolve(__dirname, '..', 'data', `${pricelistName}.xlsx`);
            fs.writeFileSync(filePath, Buffer.from(sharePointData));
        }

    } catch (err) {
        console.error('Error fetching from SharePoint, falling back to local file:', err.message);
         throw new Error(`Failed fetching from SharePoint: ${err.message}`);
    }

    try {
        const localData = loadLocalPricelist(pricelistName);
        return localData;

        } catch (localErr) {
    
        console.error('Error loading local pricelist:', localErr.message);
        throw new Error(`Failed to load pricelist: ${localErr.message}`);
    }
    
}
