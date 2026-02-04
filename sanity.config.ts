import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { product } from './sanity/schema/product';
import { apiVersion, dataset, projectId } from './sanity/env';
// ... importet e tjera
import { coupon } from './sanity/schema/coupon'; // <--- IMPORTOJE KËTU

export default defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    schema: {
        types: [product, coupon],
    },
    plugins: [
        structureTool(),
        // E hoqëm visionTool() që bënte sherr
    ],
})