import { ImageRecognizer } from "@/constructors/ImageRecognizer"
import { serverConfig } from "@/utils/config"

export const openaiImageRecognizer = new ImageRecognizer(
    "openai",
    serverConfig.imageRecognition?.openai,
)
