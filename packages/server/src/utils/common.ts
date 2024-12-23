import axios from "axios"

export async function imageUrl2Base64(url: string) {
    try {
        // 获取图片数据
        const response = await axios.get(url, { responseType: "arraybuffer", timeout: 5000 })

        // 获取文件的 MIME 类型
        const mimeType = response.headers["content-type"]

        // 将图片数据转换为 base64 编码
        const base64Image = Buffer.from(response.data).toString("base64")

        // 生成一个完整的 base64 数据 URI，包含 MIME 类型
        const base64DataUri = `data:${mimeType};base64,${base64Image}`

        return base64DataUri
    } catch (error) {
        console.error(`获取图片 ${url} 失败`, error)
        return undefined
    }
}
