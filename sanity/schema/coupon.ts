import { defineField, defineType } from "sanity";

export const coupon = defineType({
  name: "coupon",
  title: "Kupona & Gift Cards",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Kodi i Zbritjes (psh. SUMMER20)",
      type: "string",
      validation: (Rule) => Rule.required().uppercase(), // I kthen automatikisht me të mëdha
    }),
    defineField({
      name: "discountType",
      title: "Lloji i Zbritjes",
      type: "string",
      options: {
        list: [
          { title: "Përqindje (%)", value: "percentage" },
          { title: "Vlerë Fikse (€)", value: "fixed" },
        ],
      },
      initialValue: "percentage",
    }),
    defineField({
      name: "value",
      title: "Vlera (Sa % ose sa €)",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "isActive",
      title: "Aktiv?",
      type: "boolean",
      initialValue: true,
    }),
  ],
});