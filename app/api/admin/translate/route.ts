import { NextRequest, NextResponse } from "next/server";
import { batchTranslateFields, translateTextToIndianLanguages } from "@/lib/google-translate";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if batch translation format is provided
    if (body.title !== undefined || body.content !== undefined || body.category !== undefined) {
      const result = await batchTranslateFields({
        title: body.title,
        content: body.content,
        category: body.category,
      });

      return NextResponse.json({
        success: true,
        translations: result,
      });
    }

    // Single text translation
    if (typeof body.text === "string" && body.text.trim()) {
      const result = await translateTextToIndianLanguages(body.text.trim());
      return NextResponse.json({
        success: true,
        translations: result,
      });
    }

    return NextResponse.json(
      { success: false, message: "Missing required text or fields to translate." },
      { status: 400 }
    );
  } catch (error) {
    console.error("[API/Admin/Translate] Translation endpoint error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal server translation error",
      },
      { status: 500 }
    );
  }
}
