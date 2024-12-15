const { z } = require("zod");
 
const Createtodo = z.object({
    title: z.string(),
    description: z.string(),
})
 
const Updatetodo = z.object({
    id: z.string(),
})

module.exports= {
    Createtodo,
    Updatetodo,
}
