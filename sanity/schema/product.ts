import { defineField, defineType } from "sanity";

export const product = defineType({
    name: "product",
    title: "Produktet",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Emri i Produktit",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug (Linku unik)",
            type: "slug",
            options: { source: "name" },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "brand",
            title: "Marka",
            type: "string",
        }),
        defineField({
            name: "category",
            title: "Kategoria",
            type: "string",
            options: {
                list: [
                    { title: "Femra", value: "femra" },
                    { title: "Meshkuj", value: "meshkuj" },
                    { title: "Aksesorë", value: "aksesore" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "details",
            title: "Përshkrimi i Detajuar",
            type: "text",
        }),
        defineField({
            name: "isNew",
            title: "A është koleksion i ri?",
            type: "boolean",
            initialValue: true,
        }),

        // KJO ËSHTË PJESA MAGJIKE (VARIANTET)
        defineField({
            name: "variants",
            title: "Variante (Ngjyrat & Çmimet)",
            type: "array",
            of: [
                {
                    type: "object",
                    title: "Variant",
                    fields: [
                        defineField({
                            name: "colorName",
                            title: "Emri i Ngjyrës (psh. E Zezë Mat)",
                            type: "string",
                        }),
                        defineField({
                            name: "price",
                            title: "Çmimi për këtë ngjyrë (€)",
                            type: "number",
                        }),
                        defineField({
                            name: "oldPrice",
                            title: "Çmimi i vjetër (Opsionale)",
                            type: "number",
                        }),
                        defineField({
                            name: "sizes",
                            title: "Masat e disponueshme",
                            type: "array",
                            of: [{ type: "string" }],
                            options: {
                                list: [
                                    { title: "XS", value: "XS" },
                                    { title: "S", value: "S" },
                                    { title: "M", value: "M" },
                                    { title: "L", value: "L" },
                                    { title: "XL", value: "XL" },
                                    { title: "XXL", value: "XXL" },
                                    { title: "36", value: "36" },
                                    { title: "37", value: "37" },
                                    { title: "38", value: "38" },
                                    { title: "39", value: "39" },
                                    { title: "40", value: "40" },
                                    { title: "41", value: "41" },
                                    { title: "42", value: "42" },
                                    { title: "43", value: "43" },
                                    { title: "One Size", value: "One Size" },
                                ],
                            },
                        }),
                        defineField({
                            name: "images",
                            title: "Fotot e këtij varianti",
                            type: "array",
                            of: [{ type: "image" }],
                        }),
                    ],
                },
            ],
        }),
    ],
});