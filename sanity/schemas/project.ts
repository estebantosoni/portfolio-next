export default {
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        {
            name: "tech",
            type: "array",
            title: "Tech",
            of: [
                {
                    name: "src",
                    type: "image",
                    title: "Tech"
                },
            ]
        },
        {
            name: "image",
            type: "image",
            title: "Image"
        },
        {
            name: "link",
            type: "string",
            title: "Link"
        }
    ]
}