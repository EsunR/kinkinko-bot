import { imageUrl2Base64 } from "@/utils/common"
import { logger } from "@/utils/log"
import OpenAI from "openai"

interface ImageRecognizerOpenaiConfig {
    baseURL: string
    apiKey: string
    model: string
}

const IMAGE_RECOGNIZER_PROMPT = "描述这张图片的内容"

export class ImageRecognizer {
    private _type: "openai"
    private _openai?: OpenAI
    private _config?: ImageRecognizerOpenaiConfig

    constructor(type: "openai", config?: ImageRecognizerOpenaiConfig) {
        this._type = type
        this._config = config
        if (
            type === "openai" &&
            config?.apiKey &&
            config?.baseURL &&
            config?.model
        ) {
            this._openai = new OpenAI(config)
        }
    }

    async recognize(imageUrl: string) {
        if (this._type === "openai" && this._openai) {
            const base64Content = await imageUrl2Base64(imageUrl)
            if (!base64Content) {
                return ""
            }
            try {
                logger.info("[ImageRecognizer] 正在识别图片内容", base64Content)
                const res = await this?._openai.chat.completions.create({
                    model: this._config?.model || "gpt-4o-mini",
                    messages: [
                        {
                            role: "user",
                            content: [
                                { type: "text", text: IMAGE_RECOGNIZER_PROMPT },
                                {
                                    type: "image_url",
                                    image_url: {
                                        url: base64Content,
                                    },
                                },
                            ],
                        },
                    ],
                })
                const content = res.choices?.[0]?.message?.content
                if (content) {
                    logger.info("[ImageRecognizer] openai 图像识别结果", content)
                    return content
                } else {
                    throw new Error(
                        `openai 图像识别失败，没有返回图片内容\n${res}`,
                    )
                }
            } catch (e) {
                logger.error("[ImageRecognizer] openai 图像识别失败", e)
            }
            return ""
        }
        return ""
    }
}
