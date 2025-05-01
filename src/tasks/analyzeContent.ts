import { askGemini } from "~/bot/gemini";

async function analyzeContent(content: string): Promise<{ text: string; keywords: string[] }[]> {
    const prompt = `
        Bạn sẽ nhận được một đoạn văn dài mô tả nội dung một video về vũ trụ. Đoạn văn gồm nhiều câu nối tiếp nhau, không có ngắt dòng.

        Hãy giúp tôi:
        1. Tự động chia đoạn hợp lý theo nội dung và ngữ nghĩa (khoảng 1–2 câu mỗi đoạn).
        2. Với mỗi đoạn, hãy trích ra 2 từ khóa mô tả chủ đề chính, dạng ngắn gọn (VD: "hố đen", "trái đất", "sao neutron", ...).

        Yêu cầu:
        - Duy trì đúng thứ tự các đoạn như trong văn bản gốc.
        - Trả kết quả dưới dạng JSON với định dạng như sau, đừng thêm bất kỳ văn bản nào khác ngoài JSON:

        [
        {
            "text": "Nội dung đoạn 1...",
            "keywords": ["từ khóa 1", "từ khóa 2", ...]
        },
        {
            "text": "Nội dung đoạn 2...",
            "keywords": ["..."]
        }
        ]

        Dưới đây là văn bản:
        """
        ${content}
        """
    `;

    try {
        const res = await askGemini(prompt);
        const parsed = JSON.parse(res.replace(/^```json|\n|```$/g, '').trim());
        return parsed;
    } catch (err: any) {
        console.error("Lỗi khi gọi Gemini:", err.response?.data || err.message);
        return [];
    }
}

export default analyzeContent;